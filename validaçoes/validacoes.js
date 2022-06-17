require('dotenv').config();

exports.validaUsuario = (req,res,next) => {

    const Email = process.env.EMAIL;
    const Senha = process.env.SENHA;
    
    const { email , senha } = req.body;

    if(!email){
        return res.status(433).send("email obrigatorio")
    }

    if(!senha){
        return res.status(433).send("senha obrigatorio")
    }
    
    if(senha===Senha && email===Email){
        next()
    }else{
        return res.status(400).render("../view/login.ejs");
    }
}