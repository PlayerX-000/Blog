const express = require("express")
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const getUpdateEstatistica = require("./socket_/estatistica_socket")
const getUpdateRankPost = require("./socket_/rankpost_socket")
const rotas = require("./routes/router");
const path = require('path');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';
const dados = require("./socket_/run");

(async()=>{
  try {
    const database = require("./bd/conexao");
    const user = require("./model/Usuarios")
    await database.sync();
   // await user.create({email:"marketingdigital@gmail.com",senha:"vendas2022",nome:"Luciana",nivel:"Administrador(a)"})
  } catch (error) {
    throw error
  }
})();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(rotas);
app.use('/imagensPosts',     express.static(path.join(__dirname,'/imagensPosts')))
app.use('/post/imagensPosts',express.static(path.join(__dirname,'/imagensPosts')))
app.use('/post/',            express.static(path.join(__dirname,'./public/')))
app.use(express.static(path.join(__dirname,'./public/')));

app.set('view engine','ejs');
app.set('views','views');


io.on('connection', async(socket) => {
await getUpdateEstatistica.atualizaEstatistica()
await getUpdateRankPost.atualizaRankPost()
dados.UsuariosOnlineControle(1);
io.emit("estatisticaBlog",getUpdateEstatistica.estatisticas)
io.emit("RankPostBlog",getUpdateRankPost.rankPost)
socket.on("index",dados.estatisticas)
socket.on('disconnect', ()=>dados.UsuariosOnlineControle(-1));
socket.on("rankPost",dados.rank_post)

setInterval(async()=>{
const online_ = dados.getUsersOnline()
io.emit("user_on",online_)
},4000)

setInterval(async()=>{
io.emit("estatisticaBlog",getUpdateEstatistica.estatisticas)
io.emit("RankPostBlog",getUpdateRankPost.rankPost)
},60000)

});
server.listen(port,host,()=>{
  }).on('error',(err)=>{ 
    console.error("ERRO ao Iniciar Servidor");
    throw err;
  });