const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Olá, a API está funcionando');
});

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
});