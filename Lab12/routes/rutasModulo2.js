const express = require('express');
const router = express.Router();

router.get('/pagina2', (req, res) => {
    res.render('body', { titulo: 'Página 2' });
});

router.get('/pagina3', (req, res) => {
    res.render('body', { titulo: 'Página 3' });
});

module.exports = router;
