 // Importa as dependências do Firebase
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
 import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  
  // Configuração do Firebase
   const firebaseConfig = {
   apiKey: "AIzaSyDhNp74ERf7wuWCopv__HV-UOszmggs5-Q", // Chave de API
   authDomain: "test-codmorango.firebaseapp.com", // Chave de API
   databaseURL: "https://test-codmorango-default-rtdb.firebaseio.com", // URL do banco de dados
   projectId: "test-codmorango", // ID do projeto Firebase
   storageBucket: "test-codmorango.appspot.com", // Bucket de armazenamento
   messagingSenderId: "903274825568", // ID do remetente de mensagens
   appId: "1:903274825568:web:b7c3db43593be1e013c005", // ID do aplicativo Firebase
   measurementId: "G-3LPGS37J0P" // ID do aplicativo Firebase
 };
 
 // Inicializa o Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);

// Obtém uma referência para o banco de dados do Firebase
const database = getDatabase(app);

// Cria uma referência ao nó raiz do banco de dados
const rootRef = ref(database);

// Referências aos elementos HTML
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const lightElement = document.getElementById('light');

// Referências aos botões
const motorButtonO = document.getElementById('motor-button-open');
const motorButtonC = document.getElementById('motor-button-close');
const solenoidButton = document.getElementById('bombaqua');
const manualButton = document.getElementById('manual');
const autodButton = document.getElementById('auto');

// Referência ao nó ModoManual no banco de dados
const modoManualRef = ref(database, 'ModoManual');

// Verifica o estado inicial do ModoManual no banco de dados
onValue(modoManualRef, (snapshot) => {
    const modoManualAtivo = snapshot.val();

    if (modoManualAtivo === true) {
        // Se o ModoManual estiver definido como true, inicia o modo manual
        ativarModoManual();
    } else {
        // Se o ModoManual estiver definido como false, inicia o modo automático
        ativarModoAutomatico();
    }
});

// Função para ativar o modo manual
function ativarModoManual() {
    set(modoManualRef, true); // Define o ModoManual como true no banco de dados
    manualButton.style.backgroundColor = '#28a745'; // Altera a cor do botão "Modo Manual"
    autodButton.style.backgroundColor = '#ccc'; // Restaura a cor do botão "Modo Automático"
    
    // Exibe os botões de controle
    motorButtonO.style.display = 'inline-block';
    motorButtonC.style.display = 'inline-block';
    solenoidButton.style.display = 'inline-block';
}

// Função para ativar o modo automático
function ativarModoAutomatico() {
    set(modoManualRef, false); // Define o ModoManual como false no banco de dados
    manualButton.style.backgroundColor = '#ccc'; // Restaura a cor do botão "Modo Manual"
    autodButton.style.backgroundColor = '#dc3545'; // Altera a cor do botão "Modo Automático"
    
    // Oculta os botões de controle
    motorButtonO.style.display = 'none';
    motorButtonC.style.display = 'none';
    solenoidButton.style.display = 'none';
}

// Event listener para o botão "Modo Manual"
manualButton.addEventListener('click', () => {
    ativarModoManual();
});

// Event listener para o botão "Modo Automático"
autodButton.addEventListener('click', () => {
    ativarModoAutomatico();
});

// Event listener para o botão "Abrir Estufa"
motorButtonO.addEventListener('click', () => {
    const motorRef = ref(database, 'MotorOpen');
    set(motorRef, true);
});

// Event listener para o botão "Fechar Estufa"
motorButtonC.addEventListener('click', () => {
    const motorRef = ref(database, 'MotorClose');
    set(motorRef, true);
});

// Event listener para o botão "Ligar Bomba"
solenoidButton.addEventListener('click', () => {
    const bombaRef = ref(database, 'Bombaqua');
    set(bombaRef, true);
});

 // Função para atualizar os dados na página
 function updateDataOnPage(data) {
 temperatureElement.textContent = `${data.Temperatura}°C`;
 humidityElement.textContent = `${data.Umidade}%`;
 lightElement.textContent = `${data.Luminosidade} lux`;
 }
 
 // Listener para atualizar os valores conforme o banco de dados é modificado
 onValue(rootRef, (snapshot) => {
 const data = snapshot.val();
 updateDataOnPage(data);
 });