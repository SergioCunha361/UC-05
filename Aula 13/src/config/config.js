const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NOME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORTA,
    dialect: "postgres",
    logging: true
  },
  test: {},
  production: {},
};


// DEV_DB_USER=postgres
// DEV_DB_PASSWORD=Porto321@
// DEV_DB_NOME=sistema_a
// DEV_DB_HOST=localhost
// DEV_DB_PORTA=5432
// DEV_DB_DIALECT=postgres
// PORTA=3000
// DEV_DB_DIALECT=postgres
// NODE_ENV=development
