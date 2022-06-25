const Sequelize = require("sequelize");
const database = require("../bd/conexao");

const InfClient = database.define("informacoes_clients",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = InfClient;