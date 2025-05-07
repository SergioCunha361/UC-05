const { isIn } = require('validator');
const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const TurmaModel = sequelize.define('TurmaModel',{
      cod_turma: {
        type: DataTypes.INTERGER,
        primaryKey: true,
        validate:{
            isNumeric:{
                args:/^\d{9}$/,
                msg: 'Por favor, insira apenas números com 9 dígitos.'
            }
            //ou 
            //len{
            // args:[9],
            //msg:'insira 9 numeros'
            }
        }
      },
      cod_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args:/^\d{4}$/,
            msg: 'Por favor, insira apenas números com 4 dígitos.'
          }
        },
      references:{
        model: 'curso',
        key: 'cod_curso'
      }
      },

      turno: {
        type: DataTypes.STRING(12),
        allowNull: false,
            isIn:{
            args: [['matutino','vespertino','noturno']],
            msg:'Turno Inválido!'
        }        
      },      
      {
        tableName: 'turma',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
  );

  module.exports = TurmaModel