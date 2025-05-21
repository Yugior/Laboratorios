const game = require('../models/gameState');

const validateState = (requiredState, res) => {
  if (game.getState().state !== requiredState) {
    res.status(400).json({ error: `Acción no permitida en estado ${game.getState().state}` });
    return false;
  }
  return true;
};

exports.createGame = (req, res) => {
  game.reset();
  game.setState("SETEANDO");
  res.status(200).json({ message: "Juego creado con éxito" });
};

exports.getStatus = (req, res) => {
  res.status(200).json(game.getState());
};

exports.rollDice = (req, res) => {
  if (!validateState("SETEANDO", res)) return;
  const starter = Math.random() < 0.5 ? 1 : 2;
  game.setTurn(starter);
  res.status(200).json({ starter });
};

exports.placeShips = (req, res) => {
  if (!validateState("SETEANDO", res)) return;

  const player = parseInt(req.params.player);
  const { ships } = req.body;

  if (!ships || ships.length !== 10) {
    return res.status(400).json({ error: "Debes colocar 10 barcos" });
  }

  game.placeShips(player, ships);
  game.setReady(player);

  const players = game.getState().players;
  if (players[1].ready && players[2].ready) {
    game.setState("JUGANDO");
  }

  res.status(200).json({ message: `Barcos del jugador ${player} colocados con éxito` });
};

exports.attack = (req, res) => {
  if (!validateState("JUGANDO", res)) return;

  const { player, attack } = req.body;
  const currentTurn = game.getState().currentTurn;

  if (player !== currentTurn) {
    return res.status(400).json({ error: "No es tu turno" });
  }

  const opponent = player === 1 ? 2 : 1;
  const opponentShips = game.getState().players[opponent].ships;

  let hit = false;

  for (const ship of opponentShips) {
    if (ship.positions.some(pos => pos[0] === attack.x && pos[1] === attack.y)) {
      game.registerHit(player, [attack.x, attack.y]);
      hit = true;
      break;
    }
  }

  if (!hit) {
    game.registerMiss(player, [attack.x, attack.y]);
    game.setTurn(opponent);
  }

  // Verifica si ya destruyó todos los barcos
  const hits = game.getState().players[player].hits;
  const totalEnemyCells = opponentShips.reduce((sum, s) => sum + s.positions.length, 0);

  if (hits.length >= totalEnemyCells) {
    game.setWinner(player);
  }

  res.status(200).json({
    result: hit ? "golpe" : "fallo",
    nextTurn: game.getState().currentTurn,
    winner: game.getState().winner || null
  });
};

exports.getPlayerInfo = (req, res) => {
  const player = parseInt(req.params.playerNumber);
  const data = game.getState().players[player];

  res.status(200).json({
    barcos: data.ships.length,
    disparos: {
      aciertos: data.hits.length,
      fallos: data.misses.length
    }
  });
};
