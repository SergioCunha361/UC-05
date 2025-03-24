const express = require('express')
const PedidoController = require('../controllers/index')

const router = express.Router()

router.get("/pedidos", PedidoController.listarTodos)
router.post("/pedidos", PedidoController.criar)
router.put("/pedido/:id", PedidoController.editar)
router.get("/pedido/:id", PedidoController.listarPorPedido)
router.delete("/pedido/:id", PedidoController.excluirPorPedido)
router.delete("/pedidos", PedidoController.excluirTodos)

module.exports = router