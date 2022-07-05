const mobileScreen = window.matchMedia("(max-width: 990px )");

$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });


//AÇOES MENU*******************


//SAIR DA CONTA
    $("#sairContaItem").click(()=>{
       
$.ajax({
    url: "/logoutItem",
    method: "POST",
success: function(res){
  socket.disconnect()
  socket.close()
  socket.destroy()
const pag = document.querySelector("html");
pag.innerHTML = res;
$("title")[0].innerText = "Login"
}
})
})


//IR PARA PERFIL DA CONTA
$("#perfilItem").click(()=>{
    $.ajax({
        url: "/perfilItem",
        method: "GET",
    success: function(res){
      socket.disconnect()
      socket.close()
      socket.destroy()
    const pag = document.getElementById("conteudo");
    pag.innerHTML = res
    }
    })
    })


//CONFIGURACOES DA CONTA
$("#configuracoesItem").click(()=>{
  $.ajax({
      url: "/configuracoesItem",
      method: "GET",
  success: function(res){
    socket.disconnect()
    socket.close()
    socket.destroy()
//adiciona conteudo na pagina
  const pag = document.getElementById("conteudo");
  pag.innerHTML = res;
//exclui categoria/DASHBOARD/CONFIGURAÇOES
$("#ExcluiCategoria").click(()=>{
  const ExcluiCategoria = $("#ExcluiCategoria")
  ExcluiCategoria.css('pointer-events','none');
  const idCategoria = Number($("#CategoriaPost option:selected")[0].id)
  $.ajax({
    url: "/ExcluiCategoria",
    method: "POST",
    data:{
      id:idCategoria
    },
    success:function(res){
      if(res){
const opcaoSelecionada = $("#CategoriaPost option:selected")[0]
opcaoSelecionada.remove(`#${opcaoSelecionada.id}`)
document.getElementById("Titulo_Mensagem").innerText = "Categoria";
document.getElementById("Texto_Mensagem").innerText = `Categoria ${opcaoSelecionada.value} deletada com SUCESSO`;
  const MensagemPerson = new bootstrap.Modal(document.getElementById('MensagemPerson'), {
    keyboard: false
  }); 
  MensagemPerson.show();
    }
    ExcluiCategoria.css('pointer-events','all');
  }
  })

})
//Adicionar categoria/DASHBOARD/CONFIGURAÇOES
$("#CriarCategoria").click(()=>{
  const CriarCategoria = $("#CriarCategoria")
  CriarCategoria.css('pointer-events','none');

  const PopUpCriacaoCategoria = new bootstrap.Modal(document.getElementById('CriaCategoria'), {
    keyboard: false
  });
  PopUpCriacaoCategoria.show();

  $("#criaCategoriaAjax").click(()=>{
    const nomeFormConteudo = document.getElementById("nomeDaCategoriaInvalidoLabel");
    const nomeCategoriaStatus = window.getComputedStyle(nomeFormConteudo, null).display;
if(nomeCategoriaStatus=='none'){
  const nomeCategoria = document.getElementById("inputNomeNovaCategoria").value 
  $.ajax({
    url: "/CriaCategoria",
    method: "POST",
    data:{
      nome:nomeCategoria
    },
success: function(res){
if(res.match(/:/)){
document.getElementById("CategoriaPost").innerHTML+=`<option id='${res.split(":")[1]}'>${nomeCategoria}</option>`
}
document.getElementById("Titulo_Mensagem").innerText = "Categoria";
document.getElementById("Texto_Mensagem").innerText = `Categoria ${nomeCategoria} criada com SUCESSO`;
  const MensagemPerson = new bootstrap.Modal(document.getElementById('MensagemPerson'), {
    keyboard: false
  }); 
  setTimeout(()=>{
    document.getElementById("inputNomeNovaCategoria").value = '';
    PopUpCriacaoCategoria.hide();
  setTimeout(()=>{
    MensagemPerson.show();
  },400)
  },100)
}
})
}
});
})


$("a[name='funcoesConfg'] > i").click((inf)=>{
const funcao = inf.currentTarget.attributes.name.nodeValue
if(funcao=="favaltpost"){
const idPost = (inf.currentTarget.attributes.id.nodeValue).split("-")[1]

$.ajax({
  url: "/alteraPost",
  method: "POST",
  data:{
    id:idPost
  },
success: function(){
const elemento = document.getElementById(`post${idPost}`)
const paiElement = elemento.parentNode
const seccNorm = document.getElementById("postsNormais")
const seccFav = document.getElementById("postsFavoritos")
 if(paiElement.id=="postsNormais"){
  seccFav.appendChild(elemento)
  elemento.childNodes[1].childNodes[1].className += " cardFavorito-true"
 }
 if(paiElement.id=="postsFavoritos"){
  seccNorm.appendChild(elemento)
  const naoFavoritoClass = (elemento.childNodes[1].childNodes[1].className).replace("cardFavorito-true","")
  elemento.childNodes[1].childNodes[1].className = naoFavoritoClass
 }
 CriarCategoria.css('pointer-events','all');
}
})
}else if(funcao=="delpos"){
  const idPost = (inf.currentTarget.attributes.id.nodeValue).split("-")[1]
  $.ajax({
    url: "/deletaPost",
    method: "POST",
    data:{
      id:idPost
    },
  success: function(){
    const post = document.getElementById(idPost)
    const pai = post.parentNode
    pai.removeChild(post)
  }
})}
})
}})
})

  
//PAINEL DE CONTROLE DA CONTA
$("#dashboardItem").click(()=>{
        $.ajax({
            url: "/dashboardItem",
            method: "GET",
        success: function(res){
          socket.disconnect()
          socket.close()
          socket.destroy()
//adiciona conteudo na pagina
        const pag = document.getElementById("conteudo");
        pag.innerHTML = res;

//ajusta height pagina(dashboard)
$(window).on('resize', function(){
 const form = $("#formularioDash")
 if(!form) return
  resize()
});
function resize(){
  let conteudo = document.getElementById("formularioDash");
  let conteudoHeight = ((conteudo.getBoundingClientRect().height)+300)
  document.getElementById("principal").style.height = conteudoHeight+"px"
}
resize()

function getData(){
const today = new Date();
const data = today.toString().split(" ");
return `${data[2]} de ${data[1]} de ${data[3]}`
}
document.getElementById("EXEMPLOdata").innerText = `Postado ${getData()}`

//visualização do card
        $("#TituloCard").keyup(()=>{
        const TituloCard = $("#TituloCard").val();
        document.getElementById("tituloVisu").innerHTML = TituloCard;
        });        

        $("#SubtituloCard").keyup(function() {
            const TituloCard = $("#SubtituloCard").val();
            document.getElementById("subtituloVisu").innerHTML = TituloCard;
          });
        
          $("#ConteudoCard").keyup(function() {
            const TituloCard = $("#ConteudoCard").val();
            document.getElementById("textoVisu").innerHTML = TituloCard;
          });

          const fileElem = document.getElementById("img")
          const fileSelect = document.getElementById("selectImg")
          const imgCard = document.getElementById("imagemCardVisu")
          
          fileSelect.addEventListener("click", function (e) {
            if (fileElem) {
              fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
          }, false);
          
          
          fileElem.addEventListener("change", handleFiles, false);
          
          function handleFiles() {
                const url = URL.createObjectURL(this.files[0]);
            const inf = this.files[0].name + ": " + this.files[0].size + " bytes";
          imgCard.src = url
          }

          $("#tituloPostOFC").keyup(function() {
            const TituloPos = $("#tituloPostOFC").val();
            document.getElementById("tituloPost").innerHTML = TituloPos;
          });
          $("#texto1PostOFC").keyup(function() {
            const Texto1Post = $("#texto1PostOFC").val();
            document.getElementById("texto1Post").innerHTML = Texto1Post;
          });



          const fileElem2 = document.getElementById("imgPost")
          const fileSelect2 = document.getElementById("selectImgPost")
          const imgCard2 = document.getElementById("imgPostEx")
          
          fileSelect2.addEventListener("click", function (e) {
            if (fileElem2) {
              fileElem2.click();
            }
            e.preventDefault(); // prevent navigation to "#"
          }, false);
          
          
          fileElem2.addEventListener("change", handleFiles2, false);
          
          function handleFiles2() {
                const url = URL.createObjectURL(this.files[0]);
          console.log(this.files[0].name + ": " + this.files[0].size + " bytes");
          imgCard2.src = url
          }

          
          $("#CriaPostViaAjax").click(()=>{

          const inputText = $("input[type=text]").filter(function() {
              return !this.value;
          }).get();

          const textArea = $("textarea[type=text]").filter(function() {
            return !this.value;
        }).get();


const formData = new FormData();

const idCriacao = document.getElementById("idProxPost").value
const CardTituloPost = document.getElementsByName("CardTituloPost")
const CardSubtituloPost = document.getElementsByName("CardSubtituloPost")
const CardTextoPost = document.getElementsByName("CardTextoPost")
const CardImgPost = document.getElementsByName("CardImgPost")
const PalavraChavePostSEO = document.getElementsByName("PalavraChavePostSEO")
const TituloPostSEO = document.getElementsByName("TituloPostSEO")
const DescricaoPostSEO = document.getElementsByName("DescricaoPostSEO")
const TagsPostConteudo = document.getElementsByName("TagsPostConteudo")
const AutorPostConteudo = document.getElementsByName("AutorPostConteudo")
const LinkAfiliadoPostConteudo = document.getElementsByName("LinkAfiliadoPostConteudo")
const TituloPostConteudo = document.getElementsByName("TituloPostConteudo")
const TextoPostConteudo = document.getElementsByName("TextoPostConteudo")
const ImgPostConteudo = document.getElementsByName("ImgPostConteudo")
const InputIMGS = $("input[name=ImgPostConteudo]")[0].files

let Message = "";
if (inputText.length || textArea.length) Message = "* Preencha todos os campos \n";
if(!CardImgPost[0].files[0]) Message += "* Insira uma Imagem para o Card da Postagem \n";
if(!ImgPostConteudo[0].files[0]) Message += "* Insira uma Imagem para a Postagem \n";
if(Message!=="")return alert(Message);

const CriaPostViaAjax = $("#CriaPostViaAjax")
CriaPostViaAjax.css('pointer-events','none');

if(CardImgPost[0].files[0])formData.append('card', CardImgPost[0].files[0],`CARD${idCriacao}.${CardImgPost[0].files[0].type.split("/")[1]}`); 

for(let a=0;a<InputIMGS.length;a++){
formData.append('card', 
InputIMGS[a],
`POST${idCriacao}${a}.${InputIMGS[a].type.split("/")[1]}`
);
}
console.log(formData)
const idCategoria = Number($("#CategoriaPost option:selected")[0].id)
formData.append('CardTituloPost', CardTituloPost[0].value); 
formData.append('IdPost', idCriacao); 
formData.append('Categoria',idCategoria)
formData.append('CardSubtituloPost', CardSubtituloPost[0].value); 
formData.append('CardTextoPost', CardTextoPost[0].value); 
formData.append('PalavraChavePostSEO', PalavraChavePostSEO[0].value); 
formData.append('TituloPostSEO', TituloPostSEO[0].value); 
formData.append('DescricaoPostSEO', DescricaoPostSEO[0].value); 
formData.append('TagsPostConteudo', TagsPostConteudo[0].value); 
formData.append('AutorPostConteudo', AutorPostConteudo[0].value); 
formData.append('LinkAfiliadoPostConteudo', LinkAfiliadoPostConteudo[0].value); 
formData.append('TituloPostConteudo', TituloPostConteudo[0].value); 
formData.append('TextoPostConteudo', TextoPostConteudo[0].value); 
formData.append('CriacaoPostData', getData()); 


$.ajax({
            url: "/CriaPostagem",
            method: "POST",
            data:formData,
    contentType: false,
    processData: false,
    success: function(){
     (()=>{
       $("#imgPost").val("");
       $("#img").val("");
       $("#imgPostEx")[0].src = "img/ExemploBannerCriacao.jpeg"
       $("#imagemCardVisu")[0].src = "img/ExemploCardCriacao.png"
       $("#ExemploPostRelacionado")[0].src = "img/ExemploBannerRelacionadosCriacao.jpeg"
       $("#CategoriaPost").val("")
       CardTituloPost[0].value = ""
       CardSubtituloPost[0].value = ""
       CardTextoPost[0].value = ""
       CardImgPost[0].value = ""
       PalavraChavePostSEO[0].value = ""
       TituloPostSEO[0].value = ""
       DescricaoPostSEO[0].value = ""
       TagsPostConteudo[0].value = ""
       AutorPostConteudo[0].value = ""
       LinkAfiliadoPostConteudo[0].value = ""
       TituloPostConteudo[0].value = ""
       TextoPostConteudo[0].value = ""
       ImgPostConteudo[0].value = ""
CriaPostViaAjax.css('pointer-events','all');
     })()
    }
  })
          })


          $("#tagsPost").keyup(()=>{
            let str = $("#tagsPost").val()
            let arrStr = str.split(",")
            let header = document.getElementById("EXEMPLOtags")
            header.innerHTML = "";
            for(let a = 0;a<arrStr.length && a <= 4;a++){
             header.innerHTML += `<a style='margin: 1%;' class='badge bg-secondary text-decoration-none link-light' href='#'>${arrStr[a]}</a>`
         }
        })


        $("#autorPost").keyup(()=>{
          document.getElementById("EXEMPLOautor").innerText = ` por ${$("#autorPost").val()}`
      })

        }
        })
        })
});


 const HTML_userON = $("#userOn")[0];
    socket.on("user_on",(users)=>{
    HTML_userON.innerText = `${(users-1)}`
    })