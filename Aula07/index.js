
// Importando banco de dados;
const express = require('express');
const dotenv = require('dotenv');
const alunoRoutes = require("./src/modules/aluno/routes/index")
dotenv.config();

const port = process.env.PORTA;
const app = express();


//aplicação use express como json(javascript)
app.use(express.json());
// /aluno/matricula 
// / aluno

app.use(alunoRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
