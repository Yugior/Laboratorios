const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
app.use(session({
    secret: "Un string largo no como este porque me dan colicos",
    resave: false,
    saveUninitialized: false,
}));

// Controlador
const mainController = require('./controllers/mainController');

// Rutas
app.get('/', mainController.getIndex);
app.get('/login', mainController.getLogin);
app.post('/login', mainController.postLogin);
app.get('/profile', mainController.getProfile);
app.get('/logout', mainController.logout);

// Ejemplos de prueba
app.get('/test_cookie', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.cookies.mi_cookie);
    res.end();
});

app.get('/test_session', (req, res) => {
    req.session.mi_variable = "valor";
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.session.mi_variable);
    res.end();
});

app.get('/test_session_variable', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(req.session.mi_variable);
    res.end();
});

// Servidor
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});

