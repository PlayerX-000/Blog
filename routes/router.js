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

router.get("/perfilItem",pages.perfilItem)

router.get("/dashboardItem",pages.dashboardItem)

router.get("/configuracoesItem",pages.configuracoesItem)

router.get("/estatisticas",pages.estatisticasItem)

router.get("/post/:id",pages.post)

router.get("/categorias",pages.categorias)

router.get("/pesquisa", pages.pesquisa)

router.get("/todosPosts",async(req,res)=>{
return res.status(200).send(await sql.getAllPostagem())
})





router.post("/cadastraCliente",async(req,res)=>{
const {nome ,email} = req.body;
const regra = {
nome,
email
};
await sql.createInfoClientes(regra)
res.status(200).end()
})

router.post("/deletaPost",async(req,res)=>{
const {id} = req.body
await sql.deletarPost(id).then(()=>{
res.status(200).end()
})})

router.post("/alteraPost",async(req,res)=>{
const {id} = req.body
await sql.alteraPostFavorito(id).then(()=>{
res.status(200).end()
})})

router.post("/logoutItem",jwt.limpaCookieItem)

router.post("/pesquisa", pages.pesquisaBuscar)

router.post("/painel",validacao.validaUsuario, jwt.criaToken, pages.painel)

router.post("/CriaPostagem",jwt.verificaToken,multer.upload.array("card",10),pageDados.criaPostagem,(req,res)=>{res.status(200).end()})

router.post("/CriaCategoria",jwt.verificaToken,async(req,res)=>{
const resultadoCriacaoCategoria = await sql.createCategoria(req.body.nome)
res.status(200).end(resultadoCriacaoCategoria)
})

router.post("/ExcluiCategoria",jwt.verificaToken,async(req,res)=>{
const resultadoExclusaoCategoria = await sql.deletaCategoria(JSON.parse(req.body.id))
res.status(200).send(resultadoExclusaoCategoria)
})

router.post("/PostPorCategoria",async(req, res)=>{
const {idJson} = req.body
const id = JSON.parse(idJson)
const postsFiltrados = await sql.getAllPostagemPorCategoriaID(id)
res.status(200).send(postsFiltrados);
})

module.exports = router