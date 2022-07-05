const Sequelize = require("sequelize");
const database = require("../bd/conexao");

const Postagens = database.define("postagens",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   card_titulo: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
   },
   card_subtitulo: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
    
   },
   card_texto: {
    allowNull: false,
    type: Sequelize.TEXT("medium")
    
   },
   card_img_url: {
    allowNull: false,
    type: Sequelize.TEXT("long")
    
   },
   palavra_chave_post_seo: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
    
   },
   titulo_post_seo: {
    allowNull: false,
    type: Sequelize.TEXT("medium")
    
   },
   descricao_post_seo: {
    allowNull: false,
    type: Sequelize.TEXT("long")
    
   },
   tag_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
    
   },
   autor_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
    
   },
   data_criacao_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("tiny")
    
   },
   link_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("long")
    
   },
   titulo_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("medium")
    
   },
   texto_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT("long")
    
   },
   img_url_pagina_post: {
    allowNull: false,
    type: Sequelize.TEXT
   
   },
   favorito:{
    allowNull: false,
    type: Sequelize.BOOLEAN,

   }
})

module.exports = Postagens;