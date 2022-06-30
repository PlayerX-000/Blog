const data = new Date();
const ano = data.getUTCFullYear()
let Acessos = [0,0,0,0,0,0,0,0,0,0,0,0];
let myChart

socket.on("estatisticaBlog",(data)=>{
    AtualizaGraficoEstatisticasBlog(data)
})

function AtualizaGraficoEstatisticasBlog(data) {
data.forEach((obj)=>{
Acessos[(obj.mes-1)] = obj.acessos
})

if(myChart)myChart.destroy()
myChart = new Chart(
  document.getElementById('myChart'),
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

