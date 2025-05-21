const initialState = {
  state: "SETEANDO",
  players: {
    1: { ships: [], hits: [], misses: [], ready: false },
    2: { ships: [], hits: [], misses: [], ready: false }
  },
  currentTurn: null,
  winner: null
};

let gameState = JSON.parse(JSON.stringify(initialState));

module.exports = {
  getState: () => gameState,
  reset: () => { gameState = JSON.parse(JSON.stringify(initialState)); },
  setTurn: (player) => { gameState.currentTurn = player; },
  setState: (state) => { gameState.state = state; },
  setReady: (player) => { gameState.players[player].ready = true; },
  placeShips: (player, ships) => { gameState.players[player].ships = ships; },
  registerHit: (player, coord) => { gameState.players[player].hits.push(coord); },
  registerMiss: (player, coord) => { gameState.players[player].misses.push(coord); },
  setWinner: (player) => { gameState.winner = player; gameState.state = "FINALIZADO"; }
};
