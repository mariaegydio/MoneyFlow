const sql = require('mssql');

const config = {
    user: 'TESOURO\maria', 
    server: 'TESOURO', 
    database: 'MoneyFlow',
    options: {
        encrypt: false, 
        enableArithAbort: true,
    },
};

async function connectToDb() {
    try {
        const pool = await sql.connect(config);
        console.log('Conexão com o banco de dados estabelecida!');
        return pool;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    }
}

module.exports = { sql, connectToDb };
