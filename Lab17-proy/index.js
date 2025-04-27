const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2'); // Importamos mysql2

const app = express();

// Conexión a la base de datos MariaDB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Cambia esto si tu usuario de MariaDB es diferente
  password: 'Luminity@2015',          // Cambia esto si tu contraseña de MariaDB es diferente
  database: 'cuentafacil'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos cuenta_facil');
});

// Exportamos la conexión para usarla en otros archivos
module.exports = db;

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
  secret: 'esplendor_secreto', // Cambiar en producción
  resave: false,
  saveUninitialized: false
}));

// Middleware global para pasar el usuario a todas las vistas
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Rutas principales
app.get('/', (req, res) => {
  res.render('home', { rol: 'invitado' });
});

app.get('/admin', (req, res) => {
  res.render('home', { rol: 'administrador' });
});

app.get('/empresa', (req, res) => {
  res.render('empresa', { rol: 'empresa' });
});

app.get('/administrador', (req, res) => {
  res.render('administrador', { rol: 'administrador' });
});

app.get('/vendedores', (req, res) => {
  res.render('vendedores', { rol: 'vendedor' });
});

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Rutas para acceder a las tablas
const tablasRoutes = require('./routes/tablas');
app.use('/tablas', tablasRoutes);

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
