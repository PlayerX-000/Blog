const variaveis = require("./variaveis")
const vars = variaveis.vars();
const Sequelize = require("sequelize")
const sequelize = new Sequelize(vars.BD.nomeBD,vars.BD.userBD,vars.BD.senhaBD,{
    dialect: vars.BD.dialetoBD,
    host: vars.BD.hostBD,
    port: vars.BD.portaBD
})
module.exports = sequelize