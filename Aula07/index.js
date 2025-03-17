
// Importando banco de dados;
const { pool  }= require ('./src/config/database');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORTA;
const app = express();


//aplicação use express como json(javascript)
app.use(express.json());



app.get('/alunos', async (requisicao, resposta) => {
  try {
  const consulta = `select * from aluno`
    const alunos = await pool.query(consulta)
    if (alunos.rows.length === 0) {
        return resposta.status(200).json({mensagem:"Banco de dados Vazio"})
    }
    return resposta.status(200).json(alunos.rows);
  } catch (error) {
  resposta.status(500).json({ mensagem:"Erro ao buscar aluno", erro:error.mensagem})
  }
});

app.post('/alunos', async (requisicao, resposta) => {
  try {
  const { matricula, nome, email, senha } = requisicao.body;
  if (!matricula || !nome || !email || !senha) {
    return resposta.status(200).json({mensagem:"Todos os dados devem ser preenchidos"});
  }
  const dados = [ matricula, nome, email, senha ];//a funcao query necesita que os dados sejam passados em array
  const consulta = `insert into aluno (matricula, nome, email, senha) values ($1, $2, $3, $4) returning *`;
  // o returnig * é para retornar o aluno criado
  await pool.query(consulta, dados); //necessita que os dados sejam passados em array
  //O banco de dados está sendo criado aqui no query
  // poderia ser assim:
  //await pool.query(insert into produto (matricula, nome, email, senha ) values ($1, $2, $3, $4) returning *,[ matricula, nome, email, senha  ] );
  //  por issi cria-se a variavel dados
  resposta.status(201).json({ mensagem: "Aluno cadastrado com sucesso"});// não tem return porque não tem IF
    } catch (error){
        resposta.status(500).json({mensagem:"Erro ao cadastrar aluno",erro: error.message})
    }
});


app.put('/alunos/:id', async (requisicao, resposta) => {
  try {
    // loacalhost:3000/produtos/1 - O 1 é o parametro
const id  = requisicao.params.id;
const { novoMatricula, novoNome, novoEmail, novoSenha  } = requisicao.body //levando dados para requisição

if (!id){
  return resposta.status(404).json({mensagem:"Informe o parametro"})
}
const dados1 = [id];// id em formato de array para a consulta
const consulta1 = `select * from aluno where id = $1`
const resultado1 = await pool.query(consulta1, dados1)
//resutlado1 grava todos os elemtos que foram encontrados na consulta1
if (!resultado1.rows.length === 0){
  return resposta.status(404).json({mensagem: "Aluno não enconatrado"})
  }
const dados2 =  [id, novoMatricula, novoNome, novoEmail, novoSenha]
const consulta2 = `update aluno set matricula = $2, nome = $3, email = $4, senha = $5 where id= $1 returning *`
await pool.query(consulta2, dados2)
resposta.status(200).json({mensagem: "Aluno atualizado com sucesso"})

} catch (error){
      resposta.status(500).json({mensagem:"Erro ao editar Aluno",erro: error.message})
}
})


app.delete('/alunos/:id', async (requisicao, resposta) => {
try {
    // loacalhost:3000/produtos/1 - O 1 é o parametro
    const  id  = requisicao.params.id;
    const dados1 = [id];
    const consulta1 = `select * from aluno where id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
 //resultado1 armazena linha pesquisada
   if (!id){
     return resposta.status(404).json({mensagem:"Informe o parametro"}) 
}
  if (!resultado1.rows.length === 0){
     return resposta.status(404).json({mensagem: "Aluno não enconatrado"})
}
const dados2 = [id];
const consulta2 = `delete from aluno where id = $1`
await pool.query(consulta2, dados2)
resposta.status(200).json({mensagem:"Aluno deletado com sucesso"})

} catch (error){
    resposta.status(500).json({mensagem:"Erro ao excluir aluno",erro: error.message})
}
});


//Buscar produto por id
app.get("/alunoss/:id", async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;  // esse id é string naturalmente
    const dados1 = [id];
    const consulta1 = `select * from aluno where id = $1`;
    const resultado1 = await pool.query(consulta1, dados1);

    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Aluno não encontrado" });      
    }
    resposta.status(200).json(resultado1.rows[0]);
   
  } catch (error) {resposta.status(500).json({mensagem: "Erro ao buscar aluno", erro: error.message})    
  }
})


//Deletar todos os produtos
app.delete("/alunos", async (requisicao, resposta) => {
  try {
    
    const consulta = `delete from aluno`;
    await pool.query(consulta);  
    resposta.status(200).json({mensagem: "Todos os alunos foram dletados"})

  } catch (error) {
    resposta.status(500).json({mensagem:"Erro ao deletar alunos", erro: error.message})  
  }
})


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
