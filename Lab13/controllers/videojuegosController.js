const Videojuego = require('../models/Videojuego');

exports.getAdd = (req, res, next) => {
  res.render('add');
};

exports.postAdd = (req, res, next) => {
  const nombre = req.body.nombre;
  const plataforma = req.body.plataforma;
  const genero = req.body.genero;

  const nuevoVideojuego = new Videojuego(nombre, plataforma, genero);
  nuevoVideojuego.save();

  res.redirect('/');
};

exports.getList = (req, res, next) => {
  const lista = Videojuego.fetchAll();
  res.render('list', { videojuegos: lista });
};
