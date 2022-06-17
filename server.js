require('dotenv').config();
const express = require("express")
const app = express();
const rotas = require("./routes/router");
const path = require('path');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(rotas);
app.use(express.static(path.join(__dirname,'./public/')));

app.set('view engine','ejs');
app.set('views','views');

app.listen(port,host,()=>{
    console.log(`-------Servidor Iniciado-------`);
    console.log(`\n* http://${host}:${port} \n`);
    console.log(`* port: ${port}`);
    console.log(`* host: ${host}`);
  }).on('error',(err)=>{ 
    console.error("ERRO ao Iniciar Servidor",err)
  });