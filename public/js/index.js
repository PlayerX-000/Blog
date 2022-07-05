/*
VARIAVEIS
*/
let myModalFormulario 
let Termo
if(window.location.pathname == "/")myModalFormulario = new bootstrap.Modal(document.getElementById('formReceberConteudo'), {
  keyboard: false
})

if(window.location.pathname == "/")Termo = new bootstrap.Modal(document.getElementById('TermoDeResponsabilidade'), {
  keyboard: false
})
/*
SCRIPT
*/

$('.carousel').carousel({
    interval: 4500
  })


$('#exampleModal').on('show.bs.modal', function (event) {
  var modal = $(this)
  modal.find('.modal-title').text("Receber Conteudo")
  modal.find('.modal-body input')
})


$("#receberContudo").click(()=>{
  const nomeFormConteudo = document.getElementById("nomeFormvalid");
  const emailFormConteudo = document.getElementById("emailFormvalid");
  const email = window.getComputedStyle(emailFormConteudo, null).display;
  const nome = window.getComputedStyle(nomeFormConteudo, null).display;
  const nomeForm = document.getElementById("nomeForm");
  const emailForm = document.getElementById("emailForm");
  const myModalAgradecimento = new bootstrap.Modal(document.getElementById('agradecimentoModal'), {
    keyboard: false
  })
  

  if(nome!='none' && email!='none'){
 const recebeOferta = localStorage.getItem("CRP87FDGD2D984505423112003GGGFGFD242")
 if(recebeOferta!==null){
  setTimeout(()=>{
    myModalFormulario.toggle()
    nomeForm.value = '';
    emailForm.value = '';
alert("ALERTA\nVocê ja se cadastrou para receber nossos produtos")
  },200)
 }else{
 localStorage.setItem("CRP87FDGD2D984505423112003GGGFGFD242",true)
    $.ajax({
      url: "/cadastraCliente",
      method: "POST",
      data:{
      nome:nomeForm.value,
      email:emailForm.value
      },
    success: function(){
    setTimeout(()=>{
    myModalFormulario.toggle()
    nomeForm.value = '';
    emailForm.value = '';
  setTimeout(()=>{
    myModalAgradecimento.toggle()
  },500)
  },200)
  },
  error: function () {
    setTimeout(()=>{
      myModalFormulario.toggle()
      nomeForm.value = '';
      emailForm.value = '';
alert("ERRO\nTente Novamente")
    },200)
  }
})
 }
  }
  })

$('#conteudoFormAbrir').click(()=>{
    myModalFormulario.toggle()
  })


$(document).ready(()=>{
const termoOK = localStorage.getItem("TERMODERESPONSABILIDADE394712-3471320")
if(termoOK==null){
setTimeout(()=>{
const main = document.getElementsByTagName("main")[0];
main.style.pointerEvents = "none";
Termo.show()
$("#TermoCheck").click(()=>{
  localStorage.setItem("TERMODERESPONSABILIDADE394712-3471320",true)
})
},1000)
}
})