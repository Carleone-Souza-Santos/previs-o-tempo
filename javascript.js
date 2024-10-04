const API_KEY = 'db1df110404f5cf259eb5cedd87c284e';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('buscar-btn').addEventListener('click', () => {
  const cidade = document.getElementById('cidade-input').value;
  if (cidade) {
    buscarCidade(cidade);
  } else {
    alert('Por favor, digite o nome de uma cidade.');
  }
});

async function buscarCidade(cidade) {
  try {
    const response = await fetch(
      `${API_BASE_URL}?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Cidade não encontrada');
      }
      throw new Error('Erro ao buscar dados da API');
    }

    const dados = await response.json();
    apresentarDados(dados);
  } catch (error) {
    console.error('Erro na busca da cidade:', error);
    alert(`Erro: ${error.message}`);
  }
}
const apresentarDados = (dados) => {
  document.getElementById('infor').textContent = `Previsão para: ${dados.name}`;
  document.getElementById('temp-celsius').textContent = `${Math.floor(
    dados.main.temp,
  )} ºC`;
  document.getElementById('Temp').textContent = dados.weather[0].description;
  document.getElementById(
    'umidade',
  ).textContent = `Umidade: ${dados.main.humidity}%`;
  document.getElementById('fireh').textContent = `${(
    (dados.main.temp * 9) / 5 +
    32
  ).toFixed(1)} ºF`;
  document.getElementById('img-weather').src = `./assets/termometro.png`;
};
window.onload = () => {
  document.getElementById('img-weather').src = './assets/eletrico.png';
};
