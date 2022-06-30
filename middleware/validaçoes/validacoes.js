const sql = require("../../bd/sql/Query")
const variaveis = require("../../bd/variaveis")
const vars = variaveis.vars();

exports.validaUsuario = async(req,res,next) => {
    let erro = ""
    const { email , senha } = req.body;
    if(!email){
        erro = "E-mail obrigatorio";
        RedirecionaPaginaLogin(res,erro)
    }

    if(!senha){
        erro = "Senha obrigatorio";
        RedirecionaPaginaLogin(res,erro)
    }
    const regra = {
        where:{
            email
        }
    }
    const conta = await sql.getUsuarioDados(regra);
    const dados = conta[0]
    if(dados==undefined){
        erro = "E-mail não cadastrado";
       return RedirecionaPaginaLogin(res,erro)
    }

    if(senha===dados.senha){
        next()
    }else{
        erro = "Senha Incorreta";
        return RedirecionaPaginaLogin(res,erro)
    }
}

function RedirecionaPaginaLogin(res,erro){
    res.status(200).render("../view/login.ejs",{
    marca:vars.marca,
    titulo:vars.titulo.login,
    erro:erro
});
}