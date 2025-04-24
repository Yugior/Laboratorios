const express = require('express');
const path = require('path');
const app = express();

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos (como el CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importar rutas
const videojuegosRoutes = require('./routes/videojuegos');

// Usar rutas
app.use(videojuegosRoutes);

// Página 404
app.use((req, res) => {
  res.status(404).send('<h1>Página no encontrada</h1>');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
