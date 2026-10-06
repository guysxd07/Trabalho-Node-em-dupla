const database = require('../config/db');
const Sequelize = require('sequelize');
const Produto = database.define('produto', {
 id: {
 type: Sequelize.INTEGER,
 autoIncrement: true,
 allowNull: false,
 primaryKey: true
 },
 nome: {type: Sequelize.STRING, allowNull: false
 },
 imagem: {type: Sequelize.STRING},
 descricao: Sequelize.STRING,
 },
 {timestamps: false} // se quiser definir para não usar o timestamps somente nessa tabela
)
module.exports = Produto;