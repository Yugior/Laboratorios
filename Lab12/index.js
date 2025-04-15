const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Configuración del body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas y carpeta de vistas
app.set('view engine', 'ejs');
app.set("views", "views");

// Ruta GET para mostrar formulario
app.get('/form_method', (req, res) => {
    res.render('form'); // form.ejs debe existir en views/
});

// Ruta POST para recibir datos del formulario
app.post('/form_method', (req, res) => {
    const { indice, imprimir } = req.body;

    // Guardar en archivo
    const linea = `Índice: ${indice}, Valor: ${imprimir}\n`;
    fs.appendFileSync('datos.txt', linea);

    // Redirige a la vista principal con datos actualizados
    res.redirect('/test_ejs');
});

// Ruta dinámica usando EJS
app.get('/test_ejs', (req, res) => {
    let frases = [];

    // Leer frases del archivo si existe
    if (fs.existsSync('datos.txt')) {
        const contenido = fs.readFileSync('datos.txt', 'utf8');
        frases = contenido.trim().split('\n');
    }

    res.render("index", {
        frases_a_escribir: frases
    });
});

// Ruta HTML escrita directamente en código (opcional)
app.get('/test_html', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Formularios HTML</title>
        </head>
        <body>
            <form method="POST" action="/form_method">
                <input type="number" name="indice" placeholder="Índice" />
                </br>
                <input type="text" name="imprimir" placeholder="Valor a imprimir" />
                </br>
                <input type="submit" />
            </form>
        </body>
        </html>
    `);
    res.end();
});

//Dar frases
app.get('/test_ejs',(req,res)=>{

    console.log("Hola");
    let frases = [];
    frases.push("frase1");
    frases.push("frase2");
    frases.push("frase3");
    frases.push("frase4");
    frases.push("frase5");


    res.render("index",{
        frases_a_escribir : frases
    });

    

});


//Ruta para app, validacion de contrasenas
app.get('/validar_password', (req, res) => {
    res.render('password');
});

// Ruta 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).render('404'); // Debes crear 404.ejs
});

// Servidor escuchando en puerto 3000
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});
