const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const http    = require('http');
const log = console.log;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

const controller = require("./index.controller.js")

app.get('/products', controller.products);
app.post('/add_product', controller.add_product);
app.get('/prepare_million_products', controller.prepare_million_products);

// Iniciar el servidor
const server = http.createServer( (request, response) => {    
    console.log(request.url);
});

app.listen(3000);