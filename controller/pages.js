const sql = require("../bd/sql/Query")
const variaveis = require("../bd/variaveis")
const vars = variaveis.vars();

exports.initial = async(req, res) => { 
      const regraFav = {where:{favorito:true}}
      const regraAll = {where:{favorito:false}}
      const PostsFav = await sql.getAllPostagem(regraFav)
      const PostsAll = await sql.getAllPostagem(regraAll)
      res.render("../view/index.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.index,
            postsFav: PostsFav,
            postsAll: PostsAll
      })
   }

exports.login = (req, res) => { 
     return res.render("../view/login.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.login,     
 })
}

exports.painel = async(req, res) => { 
      const { email , senha } = req.body
      const regra = {
            where:{
                  email,
                  senha
            }
      };
      
      const usuarioArr = await sql.getUsuarioDados(regra);
      const usuario = usuarioArr[0]
      res.render("../view/dashboard.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.login,
            dono:usuario.nome,  
            nivelUsuario:usuario.nivel 
 })
}

exports.post = async(req, res) => { 
      const id = req.params.id;
      const relacionados = await sql.getPostagemPorCategoria(id);    
      const response = await sql.getPostagem(id);
      const Post = response[0]
      const tags = Post.tag_pagina_post.split(",")
      const ImgPost = Post.img_url_pagina_post.split(",")

      res.render("../view/post.ejs",{
            keywords: Post.palavra_chave_post_seo,
            marca:vars.marca,
            linkProduto: Post.link_pagina_post,
            titulo:Post.titulo_post_seo,
            description: Post.descricao_post_seo,
            dono:Post.autor_pagina_post,
            tituloPost: Post.titulo_pagina_post,
            dataPost: Post.data_criacao_pagina_post,
            donoPost: Post.autor_pagina_post,
            tagPost: tags,
            paragrafo1Post: Post.texto_pagina_post,
            relacionados,
            ImgPost
      })
}


exports.estatisticasItem = async(req, res) => {
      res.render("../view/itensPainel/estatisticas_.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.painel,
            dono:vars.dono
      })
}

exports.perfilItem = (req, res) => { 
      res.render("../view/itensPainel/perfil_.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.painel,
            dono:vars.dono
      })
}

exports.configuracoesItem = async(req, res) => { 
      const fav = {where:{favorito:false}};
      const nrm = {where:{favorito:true}};
      const posts = await sql.getAllPostagem(fav)
      const favorito = await sql.getAllPostagem(nrm);
      const categorias = await sql.getAllCategoria();
      res.status(200).render("../view/itensPainel/configuracoes_.ejs",{
            categorias,
            favorito,
            posts
      })
}


exports.dashboardItem = async(req, res) => { 
      const categorias = await sql.getAllCategoria()
      const quantidadePosts = await sql.getAllPostagem()
      res.render("../view/itensPainel/dashboard_.ejs",{
            IDdeCRIACAO:quantidadePosts.length,
            urlImgPost: vars.CriacaoExemplo.Card,
            urlImgBanner:vars.CriacaoExemplo.Banner,
            urlImgPostRelacionado:vars.CriacaoExemplo.PostRelacionado,
            categorias
      })
}

exports.categorias = async(req, res) => { 
      const categorias = await sql.getAllCategoria();
      const posts = await sql.getAllPostagem();

      res.render("../view/categorias.ejs",{
            marca:vars.marca,
            categorias:categorias,
            posts:posts
})}

exports.pesquisaBuscar= async(req, res)=>{
      const {valorPesquisa} = req.body
const resuldado = await sql.getPostsBySearch(valorPesquisa)
      res.render("../view/busca.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.index,
            posts:resuldado
      })
}

exports.pesquisa = async(req, res)=>{
      res.render("../view/busca.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.index,
            posts:[]
      })
}