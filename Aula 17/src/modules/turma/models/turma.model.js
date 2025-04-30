const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const TurmaModel = sequelize.define('TurmaModel',{
      cod_turma: {
        type: DataTypes.INTERGER,
        primaryKey: true,
        validate:{
            is:{
                args:/^\d{1,9}$/,
                msg: 'Por favor, insira apenas números com até 9 dígitos.'
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


  







curso cod_curso 4, nome, descrição

turma cod_turma 9, cod_curso, turno 