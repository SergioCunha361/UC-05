// Importando banco de dados;
const express = require('express');
const dotenv = require('dotenv');
const pedidoRouters = require("./src/modules/pedido/routes/index")
dotenv.config();

const port = process.env.PORTA;
const app = express();

//aplicação use express como json(javascript)

app.use(express.json());
app.use(pedidoRouters);


//Carregar o sistema na porta definida na variável PORTA no arquivo .env

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
