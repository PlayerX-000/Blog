const Sequelize = require("sequelize");
const database = require("../bd/conexao");

const RankPost = database.define("rank_posts",{
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
    },
    post_ID:{
        type: Sequelize.TEXT("tiny"),
        allowNull: false,
    },
    visitaram_vendedor:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = RankPost;