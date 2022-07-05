const data = new Date();
const ano = data.getUTCFullYear()
let Acessos = [0,0,0,0,0,0,0,0,0,0,0,0];
let RankPostVal = [0,0,0,0,0,0,0,0,0,0,0,0];
let EstatisticaChart
let PostChart
let obj = []

function getNumber(min,max){
 return Math.floor(Math.random() * (max - min)) + min;
}

socket.on("estatisticaBlog",(data)=>{
  if(!data[0]){
    const AcessoPaginaBlog = document.getElementById('graficoEstatisticaAcesso')
    if(AcessoPaginaBlog)AcessoPaginaBlog.innerText = "* Não Temos Acesso na Pagina Ainda"
    return
   }
    AtualizaGraficoEstatisticasBlog(data)
})

function AtualizaGraficoEstatisticasBlog(data) {
data.forEach((obj)=>{
Acessos[(obj.mes-1)] = obj.acessos
})

if(EstatisticaChart)EstatisticaChart.destroy()
const elementoEstatisticaGrafico = document.getElementById('EstatisticaChart')
if(!elementoEstatisticaGrafico)return;
EstatisticaChart = new Chart(
  elementoEstatisticaGrafico,
  config
);
}

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const informacoes = {
  labels: labels,
  datasets: [{
    label: `Acessos no blog em ${ano}`,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: Acessos,
  }]
};

const config = {
  type: 'line',
  data: informacoes,
  options: {}
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


socket.on("RankPostBlog",(data)=>{
  if(!data[0]){
   const RankPostBlog = document.getElementById('graficoRankPost')
   if(RankPostBlog)RankPostBlog.innerText = "* Não Temos Posts Ainda"
   return
  }
  AtualizaGraficoRankPostBlog(data)
})


function AtualizaGraficoRankPostBlog(data) {
 let produtos = []
data.forEach((dataVal)=>{
  obj[Number(dataVal.post_ID)]=[acessos=[0,0,0,0,0,0,0,0,0,0,0,0],id=dataVal.post_ID]
})

data.forEach((POST)=>{
  let dataAdaptada = Number(POST.mes)-1
  if(dataAdaptada<0)dataAdaptada=0
  obj[POST.post_ID][0][dataAdaptada]=POST.acessos
})

obj.forEach((post,ind)=>{
  const cor = `rgb(${getNumber(0,255)} ${getNumber(0,100)} ${getNumber(0,80)})`
  const id = post[1]
  const visualizacao = post[0]
  produtos.push({
    label: `ID do POST(${id})`,
    backgroundColor: cor,
    borderColor: cor,
    data: visualizacao,
  })
})

  if(PostChart)PostChart.destroy()

  const labelsRankPost = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  
  const informacoesRankPost = {
    labels: labelsRankPost,
    datasets: produtos
  };
  
  const configRankPost = {
    type: 'line',
    data: informacoesRankPost,
    options: {}
  };
  const elementoPostGrafico = document.getElementById('PostChart')
  if(!elementoPostGrafico)return;
  PostChart = new Chart(
    elementoPostGrafico,
    configRankPost
  );
  }
  window.onload=()=>{
    window.history.pushState(undefined,undefined,"painel")    
} 