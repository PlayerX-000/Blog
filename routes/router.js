const { Router } = require("express");
const pages = require("../controller/pages");
const router = Router();
const validacao = require("../middleware/validaçoes/validacoes")
const jwt = require("../middleware/jwt/jwt_funcoes")
const multer = require("../middleware/multer/upload")
const pageDados = require("../controller/pagesDados")
const sql = require("../bd/sql/Query")

router.get("/",pages.initial)

router.get("/login",pages.login)

router.get("/painel",jwt.verificaToken,pages.painel)

router.get("/logoutItem",jwt.limpaCookieItem)

router.get("/perfilItem",pages.perfilItem)

router.get("/dashboardItem",pages.dashboardItem)

router.get("/configuracoesItem",pages.configuracoesItem)

router.get("/post/:id",pages.post)

router.get("/categorias",pages.categorias)

router.get("/pesquisa", pages.pesquisa)


router.post("/pesquisa", pages.pesquisaBuscar)

router.post("/painel",validacao.validaUsuario, jwt.criaToken, pages.painel)

router.post("/CriaPostagem",jwt.verificaToken,multer.upload.array("card",2),pageDados.criaPostagem)

router.post("/CriaCategoria",jwt.verificaToken,async(req,res)=>{
   const resultadoCriacaoCategoria = await sql.createCategoria(req.body.nome)
    res.status(200).end(resultadoCriacaoCategoria)
})

router.post("/ExcluiCategoria",jwt.verificaToken,async(req,res)=>{
    const resultadoExclusaoCategoria = await sql.deletaCategoria(JSON.parse(req.body.id))
    console.log(resultadoExclusaoCategoria)
     res.status(200).send(resultadoExclusaoCategoria)
})

router.post("/PostPorCategoria",async(req, res)=>{
    const {idJson} = req.body
    const id = JSON.parse(idJson)
    const postsFiltrados = await sql.getAllPostagemPorCategoriaID(id)
    res.status(200).send(postsFiltrados)
})

module.exports = router