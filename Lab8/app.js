

const http = require('http');
const fs = require('fs');
const path = require('path');

// --------------------
// 1. Lógica de datos
// --------------------

// Promedio
const numeros = [10, 20, 30, 40, 50];
const promedio = numeros.reduce((a, b) => a + b, 0) / numeros.length;

// FizzBuzz
let fizzBuzzResultado = "";
for (let i = 1; i <= 20; i++) {
    let output = '';
    if (i % 3 === 0) output += 'Fizz';
    if (i % 5 === 0) output += 'Buzz';
    fizzBuzzResultado += (output || i) + "<br>";
}

// Escribir archivo
let archivoEscrito = false;
fs.writeFileSync("saludo.txt", "Hola desde Node.js ");
archivoEscrito = true;

// --------------------
// 2. Servidor Web
// --------------------

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        // Generar HTML dinámicamente
        const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Laboratorio Node.js</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    padding: 2rem;
                }
                .card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    max-width: 600px;
                    margin: auto;
                }
                h2 { color: #007bff; }
                code { background: #eee; padding: 2px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Resultados del Laboratorio</h1>
                <h2>1. Promedio</h2>
                <p>El promedio de <code>[${numeros.join(", ")}]</code> es <strong>${promedio}</strong></p>

                <h2>2. FizzBuzz</h2>
                <p>${fizzBuzzResultado}</p>

                <h2>3. Escritura de archivo</h2>
                <p>${archivoEscrito ? " Archivo 'saludo.txt' escrito correctamente." : " Hubo un error al escribir el archivo."}</p>
            </div>
        </body>
        </html>
        `;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Página no encontrada");
    }
});

server.listen(3000, () => {
    console.log(" Servidor ejecutándose en: http://localhost:3000");

    // Auto abrir navegador
    const { exec } = require('child_process');
    const url = "http://localhost:3000";

    if (process.platform === "win32") {
        exec(`start ${url}`);
    } else if (process.platform === "darwin") {
        exec(`open ${url}`);
    } else if (process.platform === "linux") {
        exec(`xdg-open ${url}`);
    }
});

