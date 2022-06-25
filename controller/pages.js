const sql = require("../bd/sql/Query")
const variaveis = require("../bd/variaveis")
const vars = variaveis.vars();

exports.initial = async(req, res) => { 
      const Posts = await sql.getAllPostagem()
      res.render("../view/index.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.index,
            posts: Posts
      })
   }

exports.login = (req, res) => { 
     return res.render("../view/login.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.login,     
 })
}

exports.painel = (req, res) => { 
      res.render("../view/dashboard.ejs",{
            marca:vars.marca,
            titulo:vars.titulo.painel,
            dono:vars.dono,     
 })
}

exports.post = async(req, res) => { 
      const id = req.params.id;
      const relacionado = await sql.getPostagemPorCategoria(id);    
      const response = await sql.getPostagem(id);
      const Post = response[0]
      const tags = Post.tag_pagina_post.split(",")
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
            urlImgPost: Post.img_url_pagina_post,
            relacionado: relacionado

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
      const categorias = await sql.getAllCategoria()
      res.status(200).render("../view/itensPainel/configuracoes_.ejs",{
            categorias
      })
}


exports.dashboardItem = async(req, res) => { 
      const categorias = await sql.getAllCategoria()
      const quantidadePosts = await sql.getAllPostagem()
      res.render("../view/itensPainel/dashboard_.ejs",{
            IDdeCRIACAO:quantidadePosts.length,
            urlImgPost: vars.imgCard.teste,
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