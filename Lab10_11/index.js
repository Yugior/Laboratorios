const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware de autenticación
app.use((req, res, next) => {
    console.log("Autenticación...");
    next();
});

// Ruta 1: Página de bienvenida
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido al servidor Node.js</h1><a href="/lab">Ir al Laboratorio</a>');
});

// Ruta 2: Página unicornio
app.get('/unicorn', (req, res) => {
    res.send('🦄 Los unicornios son reales 🦄');
});

// Ruta 3: Formulario con método POST
app.get('/form_method', (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, 'form.html'), 'utf8');
    res.send(html);
});

app.post('/form_method', (req, res) => {
    const indice = Number(req.body.indice);
    const imprimir = req.body.imprimir;

    let resultado = '';
    for (let i = 0; i < indice; i++) {
        resultado += imprimir + '\n';
    }

    // Guardar en archivo
    const log = `Texto: ${imprimir}, Veces: ${indice}\n`;
    fs.appendFileSync('datos.txt', log);

    res.status(200).json({ code: 200, msg: "Datos guardados correctamente" });
});

// Ruta 4: Laboratorio visual
app.use('/lab', express.static(path.join(__dirname, 'Lab1_4')));

app.get('/lab', (req, res) => {
    res.sendFile(path.join(__dirname, 'Lab1_4', 'index.html'));
});

// Ruta 5: Respuesta de pregunta : Define
app.get('/Res_Lab_preguntas', (req, res) => {
    res.send('El archivo package.json es un archivo importante de Node.js que contiene metadatos escenciales como el nombre, la versión y la descripción del proyecto, además de definir scripts personalizados y las dependencias necesarias para que la aplicación funcione correctamente.También permite instalar y gestionar paquetes con facilidad usando herramientas como npm, y a su vez simplifica la colaboración entre desarrolladores al mantener un entorno coherente. Este podria llamarse a si mismo como el corazon del proyecto, ya que automatiza tareas como iniciar el servidor (npm start) o ejecutarlo en modo desarrollo (npm run dev), lo que mejora el flujo de trabajo y la organización del proyecto.');
});

// Ruta 404 personalizada
app.use((req, res) => {
    res.status(404).send('<h1>Error 404: Ruta no encontrada</h1><a href="/">Volver al inicio</a>');
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
