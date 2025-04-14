const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDb");
const Aluno = sequelize.define(
  "Aluno",
  {
    matricula: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Forneça um e-mail valido!'
        },
        len: {
          args: [10, 60],
          msg: 'O e-mail deve ter no minimo 10 caracteres e no máximo 60!'
        }
      }
    },
    senha: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        len: {
          args: [10],
          msg: 'A senha deve ter 10 caracteres!'
        },
        is: {
          args: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10}$/,
          msg: 'A senha deve ter pelo menos uma letra maiúscula, um número, um caractere especial e totalizar 10 caracteres!'
        }
      }
    },
    turma_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: turma
      }
    }

  },
  {
    tableName:'aluno',
    createdAt:'criado_em',
    updatedAt:'atualizado_em'
  }
);

module.exports = Aluno

