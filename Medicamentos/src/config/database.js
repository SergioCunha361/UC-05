const { Pool } = require ('pg'); 
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORTA
});

module.exports = { pool };
// CREATE TABLE IF NOT EXISTS pedido (
//     id SERIAL PRIMARY KEY,
//     cliente VARCHAR(60) NOT NULL,
//     medicamentos TEXT NOT NULL,
//     quantidade INT NOT NULL,
//     valor_total DECIMAL(10, 2) NOT NULL,
//     status VARCHAR(5) NOT NULL,
//     forma_pagamento VARCHAR(30) NOT NULL
// );