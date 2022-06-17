require('dotenv').config();
const titulo = process.env.TITULO;
const marca = process.env.MARCA;
const dono = process.env.NOME;
const url = process.env.URL;

exports.initial = (req, res) => { 
      res.render("../view/index.ejs",{
            marca:marca,
            titulo:titulo,
            url:url
      })
   }

exports.login = (req, res) => { 
     return res.render("../view/login.ejs",{
            marca:marca,
            titulo:titulo,
            url:url
      })
}

exports.painel = (req, res) => { 
      res.render("../view/dashboard.ejs",{
            marca:marca,
            titulo:titulo,
            dono:dono,
            url:url
      })
}

exports.post = (req, res) => { 
      res.render("../view/post.ejs",{
            marca:marca,
            titulo:titulo,
            dono:dono,
            url:url,
            tituloPost: "Produto de beleza para Voce",
            dataPost: "16 de junho de 2022",
            donoPost: "Luciana",
            tagPost: "Saude",
            paragrafo1Post: "textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotext",
            urlImgPost: "img/cadastrar_email.jpeg"

      })
}

exports.perfilItem = (req, res) => { 
      res.render("../view/itensPainel/perfil.ejs",{
            marca:marca,
            titulo:titulo,
            dono:dono
      })
}

exports.dashboardItem = (req, res) => { 
      res.render("../view/itensPainel/dashboard_.ejs",{
            marca:marca,
            titulo:titulo,
            dono:dono,
            url:url,
            tituloPost: "Produto de beleza para Voce",
            dataPost: "16 de junho de 2022",
            donoPost: "Luciana",
            tagPost: "Saude",
            paragrafo1Post: "textotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotextotext",
            urlImgPost: "img/cadastrar_email.jpeg"
      })
}