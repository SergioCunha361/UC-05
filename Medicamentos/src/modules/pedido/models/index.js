const { pool } = require('../../../config/database')

class PedidoModel {
    static async criar(cliente, medicamentos, quantidade, valor_total, status, forma_pagamento) {
        const dados = [cliente, medicamentos, quantidade, valor_total, status, forma_pagamento]
        const consulta = `insert into pedido(cliente, medicamentos, quantidade, valor_total, status, forma_pagamento) values ($1, $2, $3, $4, $5, $6) returning *`
        const novoPedido = await pool.query(consulta, dados)
        return novoPedido.rows
    }

    static async editar(id, cliente, medicamentos, quantidade, valor_total, status, forma_pagamento) {
        const dados = [id, cliente, medicamentos, quantidade, valor_total, status, forma_pagamento]
        const consulta = `update pedido set cliente = $2, medicamentos = $3, quantidade = $4,  valor_total = $5, status = $6, forma_pagamento = $7 where id = $1 returning *`
        const pedidoAtualizado = await pool.query(consulta, dados)
        return pedidoAtualizado.rows
    }
    static async listar() {
        const consulta = `select * from pedido`
        const pedidos = await pool.query(consulta)
        return pedidos.rows
    }
    static async listarPorPedido(id) {
        const dados = [id]
        const consulta = `select * from pedido where id = $1`
        const pedidos = await pool.query(consulta, dados)
        return pedidos.rows

    }
    static async excluirPorPedido(id) {
        const dados = [id]
        const consulta = `delete from pedido where id = $1`
        const pedido = await pool.query(consulta, dados)
        return pedido.rows

    }
    static async excluirTodos() {
        const consulta = `delete from pedido`
        await pool.query(consulta)


    }
}

module.exports = PedidoModel