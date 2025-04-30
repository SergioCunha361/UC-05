const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const CursoModel = sequelize.define('CursoModel',{
      cod_curso: {
        type: DataTypes.INTERGER,
        primaryKey: true,
        validate:{
            is:{
                args:/^\d{1,4}$/,
                msg: 'Por favor, insira apenas números com até 4 dígitos.'
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
                msg:'É permitido apenas letras!'
            }
        }
      },
      descricao:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false, // Caso erro, é aqui
        validate:{
            isAlpha:{
                msg:'É permitido apenas letras!'
            }
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