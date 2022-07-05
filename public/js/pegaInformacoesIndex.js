const socket = io();
const date = new Date();
const dia = date.getUTCDate();
const mes = (date.getUTCMonth())+1;
const ano = date.getUTCFullYear();
const data = `${dia}:${mes}:${ano}`;

$.getJSON("https://api.ipify.org?format=jsonp&callback=?",(res)=>{
const IP = res.ip;

$.getJSON(`http://ip-api.com/json/${IP}`,function(dados){
    window.dataArr = {
        mes,
        ano,
        cidade:dados.city,
        estado:dados.regionName,
        pais:dados.country
    };
        const acessoAnterior = localStorage.getItem(`Acesso:${data}`);
        const aceitacaoTermo = localStorage.getItem("TERMODERESPONSABILIDADE394712-3471320")
        if(acessoAnterior!==null) return;
if(aceitacaoTermo){
    localStorage.clear()
    localStorage.setItem("TERMODERESPONSABILIDADE394712-3471320",true)
}
    localStorage.setItem(`Acesso:${data}`,true);
    socket.emit("index",dataArr);
});
});

function censo(idPost){
socket.emit("rankPost",dataArr,Number(idPost))
}