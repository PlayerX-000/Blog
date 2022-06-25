$(window).load(()=>{
$("#dataFiltro").click(function(){
  console.log("clicado")
let NovoArray = []
const dataOrdem = document.getElementById("OrdemData")
window.postsFiltrados.forEach(element => {
NovoArray.unshift(element)
})
window.postsFiltrados=NovoArray
if(dataOrdem.textContent == "Mais antigo"){
  dataOrdem.innerText = "Mais Recente"
}else{ 
  dataOrdem.innerText = "Mais antigo"
}
 
insereCards(NovoArray)
  })



  $("#categoriaFiltro > a").click(function(dados){
  const IDcategoria = dados.currentTarget.attributes.id.nodeValue
  $.ajax({
    url: "/PostPorCategoria",
    method: "POST",
    data:{
      idJson:IDcategoria
    },
success: function(res){
window.postsFiltrados = res;
const resultadoBusca = document.getElementById("ResultadosFiltro");
const dataOrdem = document.getElementById("OrdemData");
resultadoBusca.innerText = `${res.length}`;
dataOrdem.innerText = "Mais antigo";
insereCards(res);
}
});
});
});

function insereCards(res){
const pag = document.getElementById("conteudoFiltro");
let card = ``
if(res.length==0) return pag.innerHTML = "<h4 class='text-dark'>...</h4>"
for(let a = 0; a<res.length;a++){
card+=`
<div class="cards centraliza" style="height: auto;">
            <div class="centraliza">
              <img class="d-block" style="width: 90%;" src="${res[a].card_img_url}" alt="">
            </div>
            <div class="centraliza">
            <h3 style="margin: 0;">${res[a].card_titulo}</h3>
            <small class="text-secondary">${res[a].card_subtitulo}</small>
            <p style="text-align: center;">${res[a].card_texto}</p>
               <a href="${res[a].id}" class="btn btn-secondary btn-sm">Ler Mais</a>
           </div> 
          </div>
`
}

pag.innerHTML = card
}