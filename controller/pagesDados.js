const sql = require("../bd/sql/Query")

exports.criaPostagem = async(req,res,next) =>{
    let urlCard  = ``
    let NomeFile = ``
    for(let file of req.files){
       let nome = file.filename
       if(nome.substring(0,4) === "POST")NomeFile+=`${file.path.split("/")[0]}/${nome},`
       if(nome.substring(0,4) === "CARD")urlCard=`${req.files[0].path}`
    }
    NomeFile = NomeFile.substring(0, NomeFile.length - 1);
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
    await sql.createPostagem(CriacaoPostData,NomeFile,TextoPostConteudo,TituloPostConteudo,LinkAfiliadoPostConteudo,AutorPostConteudo,TagsPostConteudo,DescricaoPostSEO,TituloPostSEO,PalavraChavePostSEO,urlCard,CardTextoPost,CardSubtituloPost,CardTituloPost,idCategoria)
next()
} catch (error) {
    throw error
}
}