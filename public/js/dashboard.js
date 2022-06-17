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
    method: "GET",
success: function(res){
const pag = document.querySelector("html");
pag.innerHTML = res
}
})
})


//IR PARA PERFIL DA CONTA
$("#perfilItem").click(()=>{
    $.ajax({
        url: "/perfilItem",
        method: "GET",
    success: function(res){
    const pag = document.getElementById("conteudo");
    pag.innerHTML = res
    }
    })
    })


//PAINEL DE CONTROLE DA CONTA
$("#dashboardItem").click(()=>{
        $.ajax({
            url: "/dashboardItem",
            method: "GET",
        success: function(res){

//adiciona conteudo na pagina
        const pag = document.getElementById("conteudo");
        pag.innerHTML = res;

//ajusta height pagina(dashboard)
$(window).on('resize', function(){
  resize()
});
function resize(){
  let conteudo = document.getElementById("formularioDash");
  let conteudoHeight = ((conteudo.getBoundingClientRect().height)+300)
  document.getElementById("principal").style.height = conteudoHeight+"px"
}
resize()
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

          $("#selectImg").click(()=>{
            
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
                console.log(inf)
            }
            
  
//visualização do post 
          })
          $("#tituloPostOFC").keyup(function() {
            const TituloPos = $("#tituloPostOFC").val();
            document.getElementById("tituloPost").innerHTML = TituloPos;
          });
          $("#texto1PostOFC").keyup(function() {
            const Texto1Post = $("#texto1PostOFC").val();
            document.getElementById("texto1Post").innerHTML = Texto1Post;
          });

        }
        })
        })

});