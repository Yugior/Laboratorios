const express = require('express');
const router = express.Router();
const videojuegosController = require('../controllers/videojuegosController');

router.get('/add', videojuegosController.getAdd);
router.post('/add', videojuegosController.postAdd);
router.get('/', videojuegosController.getList);

module.exports = router;
