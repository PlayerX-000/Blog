const sql = require("../bd/sql/Query")
exports.rankPost = {};

exports.atualizaRankPost=async()=>{
    this.rankPost = await sql.GetRankPosts()
}