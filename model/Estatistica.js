const Sequelize = require("sequelize");
const database = require("../bd/conexao");

const Estatisticas = database.define("estatisticas",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mes:{
        type: Sequelize.TEXT("tiny"),
        allowNull: false,
    },
    ano:{
        type: Sequelize.TEXT("tiny"),
        allowNull: false,
    },
    acessos:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Estatisticas;