require('dotenv').config();
const jwt = require("jsonwebtoken");
const id = process.env.ID;
const segredo = process.env.SECRET;
const tempo_cookie = process.env.TEMPO_COOKIE;
const titulo = process.env.TITULO;
const marca = process.env.MARCA;
const url = process.env.URL;

exports.criaToken = (req,res,next) => {
    limpaCookieFuncao(res)
    try {
    const token = jwt.sign({id:id},segredo,{expiresIn: `${tempo_cookie}`});
    
    res.cookie("authorization",token,{
    httpOnly: true,
    maxAge: tempo_cookie,
    signed: false,
    path: "/",
    secure: true
});
    next();
    } catch (error) {
        throw error;
    };
};

exports.verificaToken = (req, res, next) => {
const authHeader = req.headers['cookie'];
const token = authHeader && authHeader.replace("authorization=","");
if(!token){
    return RedirecionaPaginaLogin(res)
};
try {
jwt.verify(token,segredo);
next()
} catch (error) {
    limpaCookieFuncao(res)
    RedirecionaPaginaLogin(res)
};
};

exports.limpaCookieItem = (req, res, next) => {
    limpaCookieFuncao(res);
    return RedirecionaPaginaLogin(res);
}

function limpaCookieFuncao(res) {
        res.clearCookie("authorization");
}

function RedirecionaPaginaLogin(res){
        res.status(200).render("../view/login.ejs",{
        marca:marca,
        titulo:titulo,
        url:url
    });
}