const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Olá, a API está funcionando');
});

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
});

app.get('/categorias', (req, res) => {
    res.send('Listar todas as categorias');
});

app.post('/categorias', (req,res)=>{
    res.send('Adicionar uma nova categoria');
});

app.get('/transacoes', (req, res) => {
    res.send('Listar todas as transações');
});

app.post('/transacoes', (req, res) => {
    res.send('Adicionar uma nova transação');
});

app.get('/saldo', (req, res) => {
    res.send('Obter saldo atual');
}); 