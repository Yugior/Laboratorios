const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = 4000;

const server = http.createServer((req, res) => {
    // Si la URL es '/', cargar index.html
    let filePath = req.url === "/" ? "/index.html" : req.url;

    // Ruta absoluta del archivo
    filePath = path.join(__dirname, filePath);

    // Obtener extensión
    const ext = path.extname(filePath);

    // Determinar tipo de contenido
    let contentType = "text/html";
    switch (ext) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
    }

    // Leer archivo y responder
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Archivo no encontrado");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(` Servidor en funcionamiento: ${url}`);

    // Abrir navegador automáticamente
    if (process.platform === "win32") {
        exec(`start ${url}`);
    } else if (process.platform === "darwin") {
        exec(`open ${url}`);
    } else if (process.platform === "linux") {
        exec(`xdg-open ${url}`);
    }
});
