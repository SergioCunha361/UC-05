const PedidoModel = require('../models/index')

class PedidoController {
    static async criar(requisicao, resposta) {
        try {
            const { cliente, medicamentos, quantidade, valor_total, status, forma_pagamento } = requisicao.body
            if ( !cliente || !medicamentos || !quantidade || !valor_total || !status || !forma_pagamento ) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const novoPedido = await PedidoModel.criar(cliente, medicamentos, quantidade, valor_total, status, forma_pagamento)
            resposta.status(201).json({ mensagem: "Pedido realizado com sucesso!", pedido: novoPedido })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao fazer um pedido!", erro: error.message })
        }
    }
    static async editar(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const { cliente, medicamentos, quantidade, valor_total, status, forma_pagamento  } = requisicao.body
            if ( !cliente || !medicamentos || !quantidade || !valor_total || !status || !forma_pagamento ) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const pedidoEditado = await PedidoModel.editar(id, cliente, medicamentos, quantidade, valor_total, status, forma_pagamento)
            if (pedidoEditado.length === 0) {
                return resposta.status(400).json({ mensagem: "Pedido não encontrado!" })
            }
            resposta.status(200).json({ mensagem: "Pedido editado com sucesso", pedido: pedidoEditado })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar pedido", erro: error.message })
        }

    }
    static async listarTodos(requisicao, resposta) {
        try {
            const pedidos = await PedidoModel.listar()
            if (pedidos.length === 0) {
                resposta.status(400).json({ mensagem: "Banco de dados vazio"})   
            }
            resposta.status(200).json(pedidos)
            
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar todos os pedidos", erro: error.message })

        }

    }
    static async listarPorPedido(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const pedidoSolicitado = await PedidoModel.listarPorPedido(id)
            if (pedidoSolicitado.length === 0) {
                return resposta.status(400).json({ mensagem: "Pedido não encontrado" })
            }
            resposta.status(200).json(pedidoSolicitado)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar pedido", erro: error.message })
        }


    }
    static async excluirPorPedido(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const pedidoSolicitado = await PedidoModel.listarPorPedido(id)
            if (pedidoSolicitado.length === 0) {
                return resposta.status(400).json({ mesnagem: "Pedido não encontrado" })
            }
            await PedidoModel.excluirPorPedido(id)
            resposta.status(200).json({ mensagem: "Pedido excluído com sucesso" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao exluir pedido", erro: error.message })

        }

    }
    static async excluirTodos(requisicao, resposta) {
        try {
            await PedidoModel.excluirTodos()
            resposta.status(200).json({ mensagem: "Todos os pedidos foram excluídos" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao exluir todos os pedidos.", erro: error.message })
        }

    }
}

module.exports = PedidoController