const express = require('express');
const router = express.Router();
const db = require('../index');

// Usuarios
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, resultados) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).send('Error al obtener usuarios.');
    }
    res.json(resultados);
  });
});

// Clientes
router.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, resultados) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return res.status(500).send('Error al obtener clientes.');
    }
    res.json(resultados);
  });
});

// Empresas
router.get('/empresas', (req, res) => {
  db.query('SELECT * FROM empresas', (err, resultados) => {
    if (err) {
      console.error('Error al obtener empresas:', err);
      return res.status(500).send('Error al obtener empresas.');
    }
    res.json(resultados);
  });
});

// Vendedores
router.get('/vendedores', (req, res) => {
  db.query('SELECT * FROM vendedores', (err, resultados) => {
    if (err) {
      console.error('Error al obtener vendedores:', err);
      return res.status(500).send('Error al obtener vendedores.');
    }
    res.json(resultados);
  });
});

// Productos
router.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, resultados) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).send('Error al obtener productos.');
    }
    res.json(resultados);
  });
});

// Pedidos
router.get('/pedidos', (req, res) => {
  db.query('SELECT * FROM pedidos', (err, resultados) => {
    if (err) {
      console.error('Error al obtener pedidos:', err);
      return res.status(500).send('Error al obtener pedidos.');
    }
    res.json(resultados);
  });
});

// Incluye
router.get('/incluye', (req, res) => {
  db.query('SELECT * FROM incluye', (err, resultados) => {
    if (err) {
      console.error('Error al obtener incluye:', err);
      return res.status(500).send('Error al obtener incluye.');
    }
    res.json(resultados);
  });
});

// Contraseña
router.get('/contrasena', (req, res) => {
  db.query('SELECT * FROM contrasena', (err, resultados) => {
    if (err) {
      console.error('Error al obtener contraseñas:', err);
      return res.status(500).send('Error al obtener contraseñas.');
    }
    res.json(resultados);
  });
});

// Historial de actividades
router.get('/historial_actividades', (req, res) => {
  db.query('SELECT * FROM historial_actividades', (err, resultados) => {
    if (err) {
      console.error('Error al obtener historial de actividades:', err);
      return res.status(500).send('Error al obtener historial de actividades.');
    }
    res.json(resultados);
  });
});

// Historial de descargas
router.get('/historial_descargas', (req, res) => {
  db.query('SELECT * FROM historial_descargas', (err, resultados) => {
    if (err) {
      console.error('Error al obtener historial de descargas:', err);
      return res.status(500).send('Error al obtener historial de descargas.');
    }
    res.json(resultados);
  });
});

module.exports = router;
