const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller');

//listar Alunos http:localhost:3000/secretario/listar-alunos
router.get('/secretario/listar-alunos', AlunoController.listarAlunos)

//Listar Alunos por matricula http:localhost:3000/secretario/listar-aluno/:matricula
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula)

//Criar Aluno http:localhost:3000/secretario/criar-aluno
router.post('/secretario/criar-aluno', AlunoController.criarAluno)

//Editar Aluno http:localhost:3000/secretario/editar-aluno
router.put('/secretario/editar-aluno', AlunoController.editarAluno)

//Deletar aluno por matricula http:localhost:3000/secretario/deletar-aluno/:matricula
router.delete('/secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula)

//Deletar todos os alunos http:localhost:3000/secretario/deletar-alunos
router.delete('/secretario/deletar-alunos', AlunoController.deletarTodosAlunos)

module.exports = router