const express = require('express');
const router = express.Router();

router.get('/pagina1', (req, res) => {
    res.render('body', { titulo: 'Página 1' });
});

router.get('/formulario', (req, res) => {
    res.render('form', { titulo: 'Formulario' });
});

router.post('/procesar-formulario', (req, res) => {
    const datos = req.body;
    // Guardar en archivo si se requiere
    // fs.appendFileSync('datos.txt', JSON.stringify(datos) + '\n');
    res.render('respuesta', { datos });
});

module.exports = router;
