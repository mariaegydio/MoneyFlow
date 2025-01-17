const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar ao banco SQLite
const db = new sqlite3.Database('./moneyflow.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Rota para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.send('Olá, a API está funcionando!');
});

// Rota para listar categorias
app.get('/categorias', (req, res) => {
    const query = 'SELECT * FROM Categoria';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao obter categorias:', err.message);
            return res.status(500).send('Erro no servidor');
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova categoria
app.post('/categorias', (req, res) => {
    const { id_usuario, nome_categoria } = req.body;
    if (!id_usuario || !nome_categoria) {
        return res.status(400).send('ID do usuário e nome da categoria são obrigatórios');
    }

    const query = 'INSERT INTO Categoria (id_usuario, nome_categoria) VALUES (?, ?)';
    db.run(query, [id_usuario, nome_categoria], function (err) {
        if (err) {
            console.error('Erro ao adicionar categoria:', err.message);
            return res.status(500).send('Erro no servidor');
        }
        res.status(201).send('Categoria adicionada com sucesso!');
    });
});

// Rota para listar transações
app.get('/transacoes', (req, res) => {
    const query = 'SELECT * FROM Transacoes';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao obter transações:', err.message);
            return res.status(500).send('Erro no servidor');
        }
        res.json(rows);
    });
});

// Rota para adicionar uma nova transação
app.post('/transacoes', (req, res) => {
    const { id_categoria, id_usuario, tipo_transacao, valor, periodo, descricao } = req.body;
    if (!id_categoria || !id_usuario || !tipo_transacao || !valor || !periodo) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = 'INSERT INTO Transacoes (id_categoria, id_usuario, tipo_transacao, valor, periodo, descricao) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(query, [id_categoria, id_usuario, tipo_transacao, valor, periodo, descricao], function (err) {
        if (err) {
            console.error('Erro ao adicionar transação:', err.message);
            return res.status(500).send('Erro no servidor');
        }
        res.status(201).send('Transação adicionada com sucesso!');
    });
});

// Rota para calcular o saldo atual
app.get('/saldo', (req, res) => {
    const query = `
        SELECT 
            SUM(CASE WHEN tipo_transacao = 'Entrada' THEN valor ELSE -valor END) AS saldo
        FROM Transacoes
    `;
    db.get(query, [], (err, row) => {
        if (err) {
            console.error('Erro ao calcular saldo:', err.message);
            return res.status(500).send('Erro no servidor');
        }
        res.json({ saldo: row.saldo });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
