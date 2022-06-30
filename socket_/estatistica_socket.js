const sql = require("../bd/sql/Query")
exports.estatisticas = {};

exports.atualizaEstatistica=async()=>{
    this.estatisticas = await sql.GetEstatistica()
}