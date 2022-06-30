const {Op} = require("sequelize");
const Usuario = require("../../model/Usuarios")
const Postagem = require("../../model/Postagens")
const infoCliente = require("../../model/InformacoesClientes")
const Categoria = require("../../model/Categorias")
const Estatistica = require("../../model/Estatistica")
const RankPosts = require("../../model/RankPosts")
const sequelize = require("sequelize");
const Localidade = require("../../model/Locais");
const RankPost = require("../../model/RankPosts");
const data = new Date();
const anoAtual = data.getUTCFullYear()

//Query Usuario
exports.getUsuarioDados = async(regra)=>{
    try {
      const usuario = await Usuario.findAll(regra);
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
exports.createInfoClientes = async(regra)=>{
try {
  await infoCliente.create(regra);
} catch (error) {
  throw error;
};
};

exports.getInfoClientes = async() => {
  try {
   return await infoCliente.findAll();
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
  

exports.getAllPostagem = async(regra) => {
      try {
       const postagem = await Postagem.findAll(regra);
       return postagem;
      } catch (error) {
        throw error;
      };
      };




  exports.alteraPostFavorito = async(id) => {
    try {
     const postAlterar = await Postagem.findAll({where:{id}})
     const favorito = !postAlterar[0].favorito
      await Postagem.update({favorito},{
        where:{
          id
        }
      })
      return
    } catch (error) {
      throw error
    }
    }

exports.deletarPost = async(id) => {
  try {
    await Postagem.destroy({
      where:{
        id
      }
    })
  } catch (error) {
    throw error
  }
  }

//Query Categoria
exports.deletaCategoria = async(id)=>{
  try {
await Categoria.destroy({
      where: {
        id
  }
});

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


//Query Estatistica
exports.CriaEstatistica=async(regra)=>{
  try {
  return await Estatistica.create(regra)
  } catch (error) {
    throw error
  }
};
exports.AlteraEstatistica=async(alteracao,regra)=>{
  try {
  return await Estatistica.update(alteracao,regra)
  } catch (error) {
    throw error
  }
};
exports.GetEstatistica=async(regra={where:{ano:`${anoAtual}`}})=>{
  try {
  return await Estatistica.findAll(regra)  
  } catch (error) {
    throw error
  }
};
//Query Rank Posts
exports.CriaRankPosts=async(regra)=>{
  try {
    return await RankPost.create(regra)
  } catch (error) {
    throw error
  }
};
exports.AlteraRankPosts=async(update,where)=>{
  try {
    return await RankPost.update(update,where)
  } catch (error) {
    throw error
  }
};
exports.GetRankPosts=async(regra={where:{ano:`${anoAtual}`}})=>{
  try {
    return await RankPost.findOne(regra)
  } catch (error) {
    throw error
  }
};
//Query Localidades
exports.CriaLocalidade=async(regra)=>{
  try {
  await Localidade.create(regra);
  return true;
  } catch (error) {
    throw error
  }
};
exports.GetLocalidade=async(regra)=>{
  try {
  return await Localidade.findOne(regra)
  } catch (error) {
    throw error
  }
};