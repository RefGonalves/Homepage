document.addEventListener("DOMContentLoaded", function() {

    switchTab('design'); // Exibe a primeira aba ao carregar a página


    // Atualiza a hora e o dia imediatamente ao carregar a página
    updateDateTime();

    // Define o gif aleatório
    setRandomGif();

    // Atualiza o horário e o dia a cada minuto
    setInterval(updateDateTime, 1000);
});

function updateDateTime() {
    const now = new Date();

    // Atualiza o horário
    const timeElement = document.getElementById("time");
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.innerHTML = `${hours}:${minutes}<span id="seconds">:${seconds}</span>`;


    // Atualiza o dia
    const dayElement = document.getElementById("day");
    const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const monthsOfYear = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const day = daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = monthsOfYear[now.getMonth()];
    const year = now.getFullYear();

    dayElement.textContent = `${day}, ${date} de ${month} de ${year}`;

    // Chama a função para atualizar as cores dependendo do dia da semana
    updateColorsBasedOnDay(now.getDay());
}

function updateColorsBasedOnDay(dayIndex) {
    const root = document.documentElement;

    switch(dayIndex) {
        case 0: // domingo - rosa
            root.style.setProperty('--secondary-color', '#cc2e97');
            root.style.setProperty('--tertiary-color', 'rgba(204, 46, 151, .2)');
            root.style.setProperty('--highlight-color', '#e4b0db');
            break;
        case 1: // segunda-feira - roxo
            root.style.setProperty('--secondary-color', '#9d00bd');
            root.style.setProperty('--tertiary-color', 'rgba(157, 0, 189, .2)');
            root.style.setProperty('--highlight-color', '#f3b7ff');
            break;
        case 2: // terça-feira - azul
            root.style.setProperty('--secondary-color', '#0062bd');
            root.style.setProperty('--tertiary-color', 'rgba(0, 89, 189, .2)');
            root.style.setProperty('--highlight-color', '#b7dcff');
            break;
        case 3: // quarta-feira - verde
            root.style.setProperty('--secondary-color', '#00bd3f');
            root.style.setProperty('--tertiary-color', 'rgba(0, 189, 63, .2)');
            root.style.setProperty('--highlight-color', '#b7ffbd');
            break;
        case 4: // quinta-feira - amarelo
            root.style.setProperty('--secondary-color', '#ddbf39');
            root.style.setProperty('--tertiary-color', 'rgba(221, 191, 57, .2)');
            root.style.setProperty('--highlight-color', '#fff4b7');
            break;
        case 5: // sexta-feira - laranja
            root.style.setProperty('--secondary-color', '#dd6839');
            root.style.setProperty('--tertiary-color', 'rgba(221, 104, 57, .2)');
            root.style.setProperty('--highlight-color', '#ffcbb7');
            break;
        case 6: // sábado - vermelho
            root.style.setProperty('--secondary-color', '#ff2626');
            root.style.setProperty('--tertiary-color', 'rgba(255, 38, 38, .2)');
            root.style.setProperty('--highlight-color', '#ffb7b7');
            break;
    }
}

function setRandomGif() {
    const gifs = [
        "capy-funny1.gif",
        "capy-funny2.gif",
        "capy-funny3.gif",
        "cat-funny1.gif",
        "cat-funny2.gif",
        "cat-funny3.gif",
        "dog-funny1.gif",
        "dog-funny2.gif",
        "fish-funny1.gif",
        "fish-funny2.gif",
        "horse-funny1.gif",
        "raccoon-funny1.gif",
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const coolPicsElement = document.getElementById("cool-pics");
    coolPicsElement.innerHTML = `<img src="src/${randomGif}" alt="cool-pic">`;
}

function switchTab(tabId) {
    var tabName = tabId + '-links';
    var tabButton = tabId + '-button';

    // Muda o estado das tabs
    var tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(function(tab) {
        tab.classList.remove('tab-button-active');
    });

    var selectedTab = document.getElementById(tabButton);
    if (selectedTab) {
        selectedTab.classList.add('tab-button-active');
    }

    // Esconde todas as link-row
    var rows = document.getElementsByClassName('link-row');
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = 'none';
    }

    // Mostra a link-row correspondente ao botão clicado
    var selectedRow = document.getElementById(tabName);
    if (selectedRow) {
        selectedRow.style.display = 'flex';
    }
}