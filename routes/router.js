const { Router } = require("express");
const pages = require("../controller/pages");
const router = Router();
const validacao = require("../validaçoes/validacoes")
const jwt = require("../jwt/jwt_funcoes")

router.get("/",pages.initial)

router.get("/login",pages.login)

router.get("/painel",jwt.verificaToken,pages.painel)

router.get("/logoutItem",jwt.limpaCookieItem)

router.get("/perfilItem",pages.perfilItem)

router.get("/dashboardItem",pages.dashboardItem)

router.get("/post",pages.post)

router.post("/painel",validacao.validaUsuario, jwt.criaToken, pages.painel)

module.exports = router