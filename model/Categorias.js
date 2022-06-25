const {Sequelize,hasMany} = require("sequelize");
const database = require("../bd/conexao");
const Postagens = require("./Postagens");

const Categorias = database.define("categorias",{
    id:{
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true  
    },
    nome:{
        allowNull:false,
        type: Sequelize.STRING,
    }
})

Categorias.hasMany(Postagens,{
    as: 'postagens', 
    foreignKey:{
        name: 'categoria',
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })
  
module.exports = Categorias;