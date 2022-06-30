const {Sequelize,hasMany} = require("sequelize");
const database = require("../bd/conexao");
const RankPosts = require("./RankPosts");
const Estatistica = require("./Estatistica");

const Localidade = database.define("localidades",{
    id:{
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true  
    },
    pais:{
        allowNull:false,
        type: Sequelize.STRING,
    },
    estado:{
        allowNull:false,
        type: Sequelize.STRING,
    },
    cidade:{
        allowNull:false,
        type: Sequelize.STRING,
    }
})

Localidade.hasMany(RankPosts,{
    as: 'rank_posts', 
    foreignKey:{
        name: 'local_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })

Localidade.hasMany(Estatistica,{
    as: 'estatisticas', 
    foreignKey:{
        name: 'local_id',
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })
  
module.exports = Localidade;