const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const SecretarioModel = sequelize.define('SecretarioModel',{

     
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey:true,
        validate:{
            is:{
                args:/^[A-Za-z][0-9]{4}$/,
                msg: 'Matrícula deve ter 1 letra inicial e 4 números.'
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
            msg:'É permitido apenas letras'
            }
        }
      },
      email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate:{
            isEmail:{
                args:/^[A-Za-z0-9._%+-]+@rn\.senac\.br$/,
                msg:'E-mail inválido, deve pretencer ao dominio @rn\.senac\.br'
            }
        }
      },
      senha:{
        type: DataTypes.STRING(12),
        allowNull: false,
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
  );

  module.exports = SecretarioModel