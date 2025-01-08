const express = require('express');
const bodyParser = require('bodyParser');
const sql = require('mssql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dbConfig = {
    user: 'seu-uruario',
    password: 'sua_senha',
    server: 'seu_servidor',
    database: 'MoneyFlow',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Verifica se a API está funcionando.
app.get('/', (req, res) => {
    res.send('Olá, a API está funcionando');
});

// Rota para listar categorias.
app.get('/categorias', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Categorias');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Erro ao listar categorias:', err);
        res.status(500).send('Erro no servidor.');
    }
});

// Rota para adicionar novas categorias
app.post('/categorias', async (req,res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).send('O nome da categoria é obrigatorio.');
    }

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
        .input('nome', sql.VarChar(50), nome)
        .query('INSERT INTO Categorias (Nome) VALUES (@nome)');
        res.status(201).send('Categoria adicionada com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir categoria:', err);
        res.status(500).send('Erro no servidor.');
    }
});

// Rota para listar todas as transações.
app.get('/transacoes', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Transacoes');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Erro ao listar transações:', err);
        res.status(500).send('Erro no servidor.');
    }
});

// Rota para adicionar nova transação.
app.post('/transacoes', async (req, res) => {
    const { descricao, valor, tipo } = req.body;

    if (!descricao || !valor || !tipo) {
        return res.status(400).send('Todos os campos (descricao, valor, tipo) são obrigatórios.');
    }

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('descricao', sql.VarChar(50), descricao)
            .input('valor', sql.Decimal(10, 2), valor)
            .input('tipo', sql.VarChar(50), tipo)
            .query('INSERT INTO Transacoes (Descricao, Valor, Tipo) VALUES (@descricao, @valor, @tipo)');

            res.status(201).send('Transação adicionada com sucesso!');
        }   catch (err) {
            console.error('Erro ao inserir transação:', err);
            res.status(500).send('Erro no servidor');
        }
});

app.get('/saldo', (req, res) => {
    res.send('Obter saldo atual');
}); 

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
});