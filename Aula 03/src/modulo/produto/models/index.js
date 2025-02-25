const pool = require('../../../config/database');
function listarProdutos() {
    try {
        const query = 'select * from produtos'
        const resultado = pool.query(query)
        if (!resultado) {
            return { mensagem: "Banco de dados vazio" }
        }
    } catch (error) {
        
    }}