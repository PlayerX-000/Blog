const express = require("express")
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const getUpdateEstatistica = require("./socket_/estatistica_socket")
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
   // await user.create({email:"kauan@gmail.com",senha:"123",nome:"kauan",nivel:"administrador"})
    await database.sync();
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
dados.UsuariosOnlineControle(1);
io.emit("estatisticaBlog",getUpdateEstatistica.estatisticas)
socket.on("index",dados.estatisticas)
socket.on('disconnect', ()=>dados.UsuariosOnlineControle(-1));
socket.on("rankPost",dados.rank_post)

setInterval(async()=>{
const online_ = dados.getUsersOnline()
io.emit("user_on",online_)
},4000)
setInterval(async()=>{
io.emit("estatisticaBlog",getUpdateEstatistica.estatisticas)
},60000)
});

server.listen(port,host,()=>{
  }).on('error',(err)=>{ 
    console.error("ERRO ao Iniciar Servidor");
    throw err;
  });