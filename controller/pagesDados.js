const sql = require("../bd/sql/Query")

exports.criaPostagem = async(req,res) =>{
    const urlPost = req.files[1].path
    const urlCard = req.files[0].path
    const {
        Categoria,
        CardTituloPost,
        CardSubtituloPost,
        CardTextoPost,
        PalavraChavePostSEO,
        TituloPostSEO,
        DescricaoPostSEO,
        TagsPostConteudo,
        AutorPostConteudo,
        LinkAfiliadoPostConteudo,
        TituloPostConteudo,
        TextoPostConteudo,
        CriacaoPostData
    } = req.body
    const idCategoria = JSON.parse(Categoria)
try {
    console.log(idCategoria)
    await sql.createPostagem(CriacaoPostData,urlPost,TextoPostConteudo,TituloPostConteudo,LinkAfiliadoPostConteudo,AutorPostConteudo,TagsPostConteudo,DescricaoPostSEO,TituloPostSEO,PalavraChavePostSEO,urlCard,CardTextoPost,CardSubtituloPost,CardTituloPost,idCategoria)
} catch (error) {
    throw error
}
}