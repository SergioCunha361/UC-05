# Aula 06 - Trabalhando com JSON no Express.js

Nesta aula, vamos aprender como manipular dados JSON com o Express.js. Você verá como enviar e receber JSON e como configurar o parser para interpretar o corpo das requisições.

## 1. Manipulação de Dados JSON

Express facilita a manipulação de dados JSON, permitindo que:

- Você envie respostas em formato JSON utilizando res.json().
- Converta o corpo das requisições em objetos JavaScript por meio de um middleware.

## 2. Envio e Recebimento de JSON

Utilize rotas para receber dados via requisições POST e enviar respostas em formato JSON. Veja o exemplo a seguir:

```javascript
const express = require("express");
const app = express();

// Configuração do middleware para interpretar JSON
app.use(express.json());

app.post("/dados", (req, res) => {
    // Acessando os dados enviados no corpo da requisição
    const dados = req.body;
    console.log("Dados recebidos:", dados);

    // Respondendo com um objeto JSON
    res.json({
        mensagem: "Dados processados com sucesso!",
        dadosRecebidos: dados
    });
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
```
