// db.js
const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
    host: 'localhost',       // Endereço do servidor MySQL
    user: 'root',            // SEU USUÁRIO (geralmente é 'root')
    password: '@4nn4v01g04032005',   // <--- COLOQUE AQUI SUA SENHA DO MYSQL
    database: 'puc_integra', // Nome do banco de dados que criamos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;