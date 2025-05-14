const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const CursoModel = sequelize.define('CursoModel',{
      cod_curso: {
        type: DataTypes.INTERGER,
        primaryKey: true,
        validate:{
            isNumeric:{
                args:/^\d{4}$/,
                msg: 'Por favor, insira apenas números com 4 dígitos.'
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]{1,100}$/,
          msg: 'Por favor, insira o nome de até 100 caracteres.'
        }
      },
      descricao:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate:{
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]{1,100}$/,
            msg: 'Por favor, insira o nome de até 100 caracteres'
        }
      },     
      },
    {
        tableName: 'curso',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
  );

  module.exports = CursoModel