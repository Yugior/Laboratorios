const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameController');

router.get('/create', controller.createGame);
router.get('/status', controller.getStatus);
router.get('/dice', controller.rollDice);
router.post('/create/:player', controller.placeShips);
router.post('/turn', controller.attack);
router.get('/player/:playerNumber', controller.getPlayerInfo);

module.exports = router;
