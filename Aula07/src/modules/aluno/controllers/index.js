const AlunoModel = require ('../models/index')

    class AlunoController{
        static async criar(requisicao, resposta){
                try {
                        const {matricula, nome, email,senha} = requisicao.body
                        if (!matricula || !nome || email !! senha){
                            return resposta.status(400).json({mensagem:"Todos os campos devem ser preenchido"})
                        }
                        const novoAluno = await AlunoModel.criar(matricula, nome, email, senha) 
                        resposta.status(201).json({mensagem: "Aluno criado com sucesso!", aluno:novoAluno})
                } catch (error) {
                        resposta.status(500).json({mensagem: "Erro ao criar o aluno", erro: error.mensage})   
                }
        }
        static editar(requisicao, resposta){

        }
        static async listarTodos(requisicao, resposta){
                

        }
        static async listarPorMatricula(requisicao, resposta){
            try {
                const id = requisicao.params.id
                const aluno = await AlunoModel.listarPorId(matriucula)
                if (!aluno){
                    return resposta.status(400).json({mensagem:"Aluno não encontrado"})
                }
                resposta.status(200).json(aluno)
            catch (error) {
                    resposta.status(500).json({mensagem: "Erro ao criar o aluno", erro: error.mensage})   
            }    
                
            }

        }
        static excluirPorMatriula(requisicao, resposta){

        }
        static excluirTodos(requisicao, resposta){

        }
    }