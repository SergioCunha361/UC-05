const AlunoModel = require('../models/index')

class AlunoController {
    static async criar(requisicao, resposta) {
        try {
            const { matricula, nome, email, senha } = requisicao.body
            if (!matricula || !nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchido" })
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha)
            resposta.status(201).json({ mensagem: "Aluno criado com sucesso!", aluno: novoAluno })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar o aluno", erro: error.mensage })
        }
    }
    static async editar(requisicao, resposta) {
        try {
            const matricula = requisicao.parmas.matricula
            const { nome, email, senha } = requisicao.body
            if (!nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchido" })
            }
            const aluno = await AlunoModel.editar(matricula, nome, email, senha)
            if (aluno.length === 0) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchido" })
            }
            resposta.status(200).json({ mensagem: "Aluno editado com sucesso" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar o aluno", erro: error.mensage })
        }

    }
    static async listarTodos(requisicao, resposta) {
        try {
            const alunos = await AlunoModel.listar()
            if (alunos.length === 0) {
                resposta.status(400).json({ mensagem: "Banco de dados vazio"})   
            }
            resposta.status(200).json(alunos)
            
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar todos os alunos", erro: error.mensage })

        }

    }
    static async listarPorMatricula(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const aluno = await AlunoModel.listarPorId(matricula)
            if (!aluno) {
                return resposta.status(400).json({ mensagem: "Aluno não encontrado" })
            }
            resposta.status(200).json(aluno)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar o aluno", erro: error.mensage })
        }


    }
    static async excluirPorMatriula(requisicao, resposta) {
        try {
            const matricula = requisicao.parmas.matricula
            const aluno = await AlunoModel.listarPorMatricula(matricula)
            if (!aluno) {
                return resposta.status(400).json({ mesnagem: "Aluno não encontrado" })
            }
            await AlunoModel.excluirPorMatricula(matricula)
            resposta.status(200).json({ mensagem: "Aluno excluído com sucesso" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao exluir o aluno", erro: error.mensage })

        }

    }
    static async excluirTodos(requisicao, resposta) {
        try {
            await AlunoModel.excluirTodos()
            resposta.status(200).json({ mensagem: "Todos alunos foram excluídos" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao exluit todos", erro: error.mensage })
        }

    }
}

module.exports = AlunoController