const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const SecretarioModel = sequelize.define('SecretarioModel',{
<<<<<<< HEAD

     
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey:true,
        validate:{
            is:{
                args:/^[A-Za-z][0-9]{4}$/,
                msg: 'Matrícula deve ter 1 letra inicial e 4 números.'
=======
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate:{
            is:{
                args:/^[a-zA-Z]\d{4}$/,
                msg: 'A matrícula deve começar com uma letra e ter quatro números em seguida.'
>>>>>>> 962faa41ae1f92dabba54b4b141c342511225d78
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
<<<<<<< HEAD
            msg:'É permitido apenas letras'
=======
                msg:'É permitido apenas letras!'
>>>>>>> 962faa41ae1f92dabba54b4b141c342511225d78
            }
        }
      },
      email:{
        type: DataTypes.STRING(100),
        unique: true,
<<<<<<< HEAD
        allowNull: false,
        validate:{
            isEmail:{
                args:/^[A-Za-z0-9._%+-]+@rn\.senac\.br$/,
                msg:'E-mail inválido, deve pretencer ao dominio @rn\.senac\.br'
=======
        allowNull: false, // Caso erro, é aqui
        validate:{
            isEmail:{
                args:/^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
                msg:'E-mail invalido! O e-mail deve pertencer ao dominio @rn.senac.br'
>>>>>>> 962faa41ae1f92dabba54b4b141c342511225d78
            }
        }
      },
      senha:{
        type: DataTypes.STRING(12),
        allowNull: false,
<<<<<<< HEAD
        validade:{
            len:{
                args:[8, 12],
                msg: 'A senha deve ter no mínimo 8 caracteres e no máximo 12'
            },
            is:{
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                msg:'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
            }
        }
      }

    },
    {
      tableName: 'secretario',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
=======
        validate:{
            len:{
                args: [8, 12],
                msg: 'A senha deve ter no mínimo 8 e no máximo 12 caracteres.'
            },
            is:{
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/,
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um símbolo especial (@, #, $, %, &, , !).'
            }
        }
      }
    },
    {
        tableName:'secretario',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
>>>>>>> 962faa41ae1f92dabba54b4b141c342511225d78
  );

  module.exports = SecretarioModel