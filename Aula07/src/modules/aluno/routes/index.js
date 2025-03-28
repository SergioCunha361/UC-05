const express = require('express')
const AlunoController = require('../controllers/index')

const router = express.Router()

router.get("/alunos", AlunoController.listarTodos)
router.post("/alunos", AlunoController.criar)
router.put("/aluno/:matricula", AlunoController.editar)
router.get("/aluno/:matricula", AlunoController.listarPorMatricula)
router.delete("/aluno/:matricula", AlunoController.excluirPorMatriula)
router.delete("/alunos", AlunoController.excluirTodos)

module.exports = router