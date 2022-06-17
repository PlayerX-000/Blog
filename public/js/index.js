/*
VARIAVEIS
*/
const myModalFormulario = new bootstrap.Modal(document.getElementById('formReceberConteudo'), {
  keyboard: false
})

/*
SCRIPT
*/

$('.carousel').carousel({
    interval: 5500
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
  setTimeout(()=>{
    myModalFormulario.toggle()
    nomeForm.value = '';
    emailForm.value = '';
  setTimeout(()=>{
    myModalAgradecimento.toggle()
  },500)
  },200)
  }
  })

$('#conteudoFormAbrir').click(()=>{
    myModalFormulario.toggle()
  })
