// Importando banco de dados;
const { pool  }= require ('./src/config/database');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORTA;
const app = express();


//aplicação use express como json(javascript)
app.use(express.json());



app.get('/produtos', async (requisicao, resposta) => {
  try {
  const consulta = `select * from produto`
    const produtos = await pool.query(consulta)
    if (produtos.rows.length === 0) {
        return resposta.status(200).json({mensagem:"Banco de dados Vazio"})
    }
    return resposta.status(200).json(produtos.rows);
  } catch (error) {
  resposta.status(500).json({ mensagem:"Erro ao buscar produto", erro:error.mensagem})
  }
});

app.post('/produtos', async (requisicao, resposta) => {
  try {
  const { nome, preco, quantidade } = requisicao.body;
  if (!nome || !preco || !quantidade) {
    return resposta.status(200).json({mensagem:"Todos os dados devem ser preenchidos"});
  }
  const dados = [ nome, preco, quantidade ];//a funcao query necesita que os dados sejam passados em array
  const consulta = `insert into produto (nome, preco, quantidade) values ($1, $2, $3) returning *`;
  // o returnig * é para retornar o produto criado
  await pool.query(consulta, dados); //necessita que os dados sejam passados em array
  //O banco de dados está sendo criado aqui no query
  // poderia ser assim:
  //await pool.query(insert into produto (nome, preco, quantidade) values ($1, $2, $3) returning *,[ nome, preco, quantidade ] );
  resposta.status(201).json({ mensagem: "Produto criado com sucesso"});// não tem return porque não tem IF
    } catch (error){
        resposta.status(500).json({mensagem:"Erro ao criar produto",erro: error.message})
    }
});


app.put('/produtos/:id', async (requisicao, resposta) => {
  try {
    // loacalhost:3000/produtos/1 - O 1 é o parametro
const id  = requisicao.params.id;
const { novoNome, novoPreco, novaQuantidade } = requisicao.body //levando dados para requisição

if (!id){
  return resposta.status(404).json({mensagem:"Informe o parametro"})
}
const dados1 = [id];// id em formato de array para a consulta
const consulta1 = `select * from produto where id = $1`
const resultado1 = await pool.query(consulta1, dados1)
//resutlado1 grava todos os elemtos que foram encontrados na consulta1
if (!resultado1.rows.length === 0){
  return resposta.status(404).json({mensagem: "Produto não enconatrado"})
  }
const dados2 =  [id, novoNome, novoPreco, novaQuantidade]
const consulta2 = `update produto set nome = $2, preco = $3, quantidade = $4 where id= $1 returning *`
await pool.query(consulta2, dados2)
resposta.status(200).json({mensagem: "Produto atualizado com sucesso"})

} catch (error){
      resposta.status(500).json({mensagem:"Erro ao editar produto",erro: error.message})
}
})


app.delete('/produtos/:id', async (requisicao, resposta) => {
  try {
    // loacalhost:3000/produtos/1 - O 1 é o parametro
    const  id  = requisicao.params.id;

const dados1 = [id];
const consulta1 = `select * from produto where id = $1`
const resultado1 = await pool.query(consulta1, dados1)
 //resultado1 armazena linha pesquisada
if (!id){
  return resposta.status(404).json({mensagem:"Informe o parametro"}) 
}
if (!resultado1.rows.length === 0){
  return resposta.status(404).json({mensagem: "Produto não enconatrado"})
}
const dados2 = [id];
const consulta2 = `delete from produto where id = $1`
await pool.query(consulta2, dados2)
resposta.status(200).json({mensagem:"Produto deletado com sucesso"})

} catch (error){
    resposta.status(500).json({mensagem:"Erro ao excluir produto",erro: error.message})
}
});


//Buscar produto por id
app.get("/produtos/:id", async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;  // esse id é string naturalmente
    const dados1 = [id];
    const consulta1 = `select * from produto where id = $1`;
    const resultado1 = await pool.query(consulta1, dados1);

    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({ mensagem: "Produto não encontrado" });      
    }
    resposta.status(200).json(resultado1.rows[0]);
   
  } catch (error) {resposta.status(500).json({mensagem: "Erro ao buscar produto", erro: error.message})    
  }
})


//Deletar todos os produtos
app.delete("/produtos", async (requisicao, resposta) => {
  try {
    
    const consulta = `delete from produto`;
    await pool.query(consulta);  
    resposta.status(200).json({mensagem: "Todos os produtos foram dletados"})

  } catch (error) {
    resposta.status(500).json({mensagem:"Erro ao deletar produtos", erro: error.message})  
  }
})


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
