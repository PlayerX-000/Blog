const {Op} = require("sequelize");
const Usuario = require("../../model/Usuarios")
const Postagem = require("../../model/Postagens")
const infoCliente = require("../../model/InformacoesClientes")
const Categoria = require("../../model/Categorias")
const sequelize = require("sequelize");

//Query Usuario
exports.getUsuarioDados = async(email)=>{
    try {
      const usuario = await Usuario.findAll({
        where: {
          email
      }});
    return usuario;
    } catch (error) {
      throw error;
    };
};

exports.updateUsuarioDados = async(nome,senha,nivel,email,emailAntigo,senhaAntiga)=>{
  try {
    await Usuario.update({
      nome,senha,nivel,email
    },{
      where: {
        [Op.and]:[{
          email:emailAntigo
        },{
          senha:senhaAntiga
        }]

    }});
    return "Sucesso";
  } catch (error) {
    throw error;
  };
};

//Query Cliente
exports.createInfoClientes = async(nome,email)=>{
try {
  await infoCliente.create({ nome, email });
} catch (error) {
  throw error;
};
};

exports.getInfoClientes = async() => {
  try {
   const informacoes = await infoCliente.findAll();
   return informacoes;
  } catch (error) {
    throw error;
  };
  };

//Query Postagem
exports.getPostsBySearch = async(STRINGPESQUISA) =>{
  const resultado = await Postagem.findAll({
    where: {
      [Op.or]:[{
      card_titulo: sequelize.where(sequelize.fn("LOWER", sequelize.col("card_titulo")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      card_subtitulo: sequelize.where(sequelize.fn("LOWER", sequelize.col("card_subtitulo")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      palavra_chave_post_seo: sequelize.where(sequelize.fn("LOWER", sequelize.col("palavra_chave_post_seo")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      tag_pagina_post: sequelize.where(sequelize.fn("LOWER", sequelize.col("tag_pagina_post")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      titulo_pagina_post: sequelize.where(sequelize.fn("LOWER", sequelize.col("titulo_pagina_post")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      texto_pagina_post: sequelize.where(sequelize.fn("LOWER", sequelize.col("texto_pagina_post")),"LIKE","%" + STRINGPESQUISA + "%"),
      },{
      card_titulo: sequelize.where(sequelize.fn("LOWER", sequelize.col("card_titulo")),"LIKE","%" + STRINGPESQUISA + "%"),
      }]           
    }
  })
  return resultado;
}

exports.createPostagem = async(data_criacao_pagina_post,img_url_pagina_post,texto_pagina_post,titulo_pagina_post,link_pagina_post,autor_pagina_post,tag_pagina_post,descricao_post_seo,titulo_post_seo,palavra_chave_post_seo,card_img_url,card_texto,card_subtitulo,card_titulo,categoria)=>{
  try {
    await Postagem.create({data_criacao_pagina_post,img_url_pagina_post,texto_pagina_post,titulo_pagina_post,link_pagina_post,autor_pagina_post,tag_pagina_post,descricao_post_seo,titulo_post_seo,palavra_chave_post_seo,card_img_url,card_texto,card_subtitulo,card_titulo,categoria,favorito:false});
  } catch (error) {
    throw error;
  };
  };
  
exports.getPostagem = async(id) => {
    try {
     const postagem = await Postagem.findAll({
      where:{
        id
      }
     });
     return postagem;
    } catch (error) {
      throw error;
    };
    };

    exports.getPostagemPorCategoria = async(id) => {
      try {
        const postagemArr = await Postagem.findAll({
          where:{
            id
          }
         });
        
const postagem = postagemArr[0]

       const relacionado = await Postagem.findAll({
        where:{
          categoria: postagem.categoria
        }
       })
       const tamanhoRelacionandos = relacionado.length
       const relacionadoEscolhido = Math.floor(Math.random()*tamanhoRelacionandos);
       return relacionado[relacionadoEscolhido]
    } catch (error) {
        throw error;
      };
      };

    exports.getAllPostagemPorCategoriaID = async(id) => {
      try {
        const postagemArr = await Postagem.findAll({
          where:{
            categoria:id
          }
         });
       return postagemArr
    } catch (error) {
        throw error;
      };
      };
  

exports.getAllPostagem = async() => {
      try {
       const postagem = await Postagem.findAll();
       return postagem;
      } catch (error) {
        throw error;
      };
      };


exports.getPostagemFavorita = async() => {
  try {
   const postagem = await Postagem.findAll({
    where:{
      favorito:false
    }
   });
 
  } catch (error) {
    throw error;
  };
  };
    
//Query Categoria
exports.deletaCategoria = async(id)=>{
  try {
await Categoria.destroy({
      where: {
        id
  }
});
console.log("\n\n\n\n\n\n\n\n\n\n\n kkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
return true
  } catch (error) {
    throw error
  }
}


exports.createCategoria = async(nome)=>{
  try {
    const copia = await Categoria.findAll({
      where:{
        nome
      }
     });
   if(copia[0]){ 
   return `Já existe uma categoria ${nome}` 
   }else{
   await Categoria.create({nome});

   const novaCategoria = await Categoria.findAll({
    where:{
      nome
    }
   });
 return `ID:${novaCategoria[0].dataValues.id}`
  }
  } catch (error) {
    throw error;
  };
};

exports.getAllCategoria = async()=>{
  try {
  const categorias = await Categoria.findAll();
  return categorias;
  } catch (error) {
    throw error;
  };
};