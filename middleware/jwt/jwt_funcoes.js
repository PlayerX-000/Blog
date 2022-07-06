const jwt = require("jsonwebtoken");
const variaveis = require("../../bd/variaveis")
const vars = variaveis.vars();


exports.criaToken = (req,res,next) => {
    limpaCookieFuncao(res)
    try {
    const { email } = req.body;
    const token = jwt.sign({email:email},vars.jwt.segredo,{expiresIn: `${vars.jwt.expira_em}`});
    
    res.cookie("authorization",token,{
    httpOnly: true,
    maxAge: vars.jwt.expira_em,
    signed: false,
    path: "/",
    secure: true
});
req.email = email
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
jwt.verify(token,vars.jwt.segredo,function(err, decoded){
    if (err) return res.status(500).end();
    req.email = decoded.email
});
next()
} catch (error) {
    limpaCookieFuncao(res)
   return RedirecionaPaginaLogin(res)
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
        marca:vars.marca,
        titulo:vars.titulo
    });
}