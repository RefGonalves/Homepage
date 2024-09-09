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


// TASKS FUNCTIONS

// Utility functions for localStorage
const getTasksFromStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render tasks in the appropriate columns
const renderTasks = () => {
    const uncompletedTaskList = document.getElementById('uncompleted-task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    
    uncompletedTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    const tasks = getTasksFromStorage();
    
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        if (task.completed) {
            completedTaskList.appendChild(taskElement);
        } else {
            uncompletedTaskList.appendChild(taskElement);
        }
    });
};

// Create a task element
const createTaskElement = (task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    
    const taskStatusDiv = document.createElement('div');
    taskStatusDiv.classList.add('task-status');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', () => toggleTaskCompletion(index));

    taskStatusDiv.appendChild(taskCheckbox);

    const taskTextDiv = document.createElement('div');
    taskTextDiv.classList.add('task-text');

    const taskNameDiv = document.createElement('div');
    taskNameDiv.classList.add('task-name');
    taskNameDiv.textContent = task.name;

    const viewDetailsButton = document.createElement('button');
    const iconDetailsButton = document.createElement('i');
    iconDetailsButton.classList.add('nf');
    iconDetailsButton.classList.add('nf-fa-plus');
    viewDetailsButton.appendChild(iconDetailsButton);
    viewDetailsButton.addEventListener('click', () => openTaskDetailOverlay(task));

    taskTextDiv.appendChild(taskNameDiv);
    taskTextDiv.appendChild(viewDetailsButton);

    taskDiv.appendChild(taskStatusDiv);
    taskDiv.appendChild(taskTextDiv);

    return taskDiv;
};

// Toggle task completion status
const toggleTaskCompletion = (taskIndex) => {
    const tasks = getTasksFromStorage();
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToStorage(tasks);
    renderTasks();
};

// Initial task data (if no tasks exist in localStorage)
const initializeTasks = () => {
    const tasks = getTasksFromStorage();
    if (tasks.length === 0) {
        const sampleTasks = [
            { name: "Lorem ipsum dolor", description: "Sit amet consectetur adipisicing elit", completed: false },
            { name: "Task 2", description: "Nemo, quaerat.", completed: false },
            { name: "Task 3", description: "Completed task example", completed: true }
        ];
        saveTasksToStorage(sampleTasks);
    }
};

// FLOATING BUTTONS

document.getElementById('toggle-tabs-btn').addEventListener('click', () => {
    const tasksTab = document.getElementById('tasks-tab');
    const linksTab = document.getElementById('links-tab');

    if (tasksTab.style.display === 'none') {
        tasksTab.style.display = 'flex';
        linksTab.style.display = 'none';
    } else {
        tasksTab.style.display = 'none';
        linksTab.style.display = 'block';
    }
});

// ADDING TASKS

// Show overlay for creating a new task
document.getElementById('new-task-btn').addEventListener('click', () => {
    const tasksTab = document.getElementById('tasks-tab');
    if (tasksTab.style.display === 'none') {
        // Show tasks-tab if not visible
        tasksTab.style.display = 'flex';
        document.getElementById('links-tab').style.display = 'none';
    }
    
    // Show overlay
    document.getElementById('new-task-overlay').style.display = 'flex';
});

// Close the overlay
document.getElementById('close-overlay-btn').addEventListener('click', () => {
    document.getElementById('new-task-name').value = '';
    document.getElementById('new-task-desc').value = '';
    document.getElementById('new-task-overlay').style.display = 'none';
});

// Add new task
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskName = document.getElementById('new-task-name').value;
    const taskDesc = document.getElementById('new-task-desc').value;

    if (taskName && taskDesc) {
        const tasks = getTasksFromStorage();
        tasks.push({ name: taskName, description: taskDesc, completed: false });
        saveTasksToStorage(tasks);
        renderTasks();

        // Close overlay and clear input fields
        document.getElementById('new-task-name').value = '';
        document.getElementById('new-task-desc').value = '';
        document.getElementById('new-task-overlay').style.display = 'none';
    } else {
        alert('Please fill in both fields!');
    }
});

// Open the overlay with task details
const openTaskDetailOverlay = (task) => {
    document.getElementById('overlay-task-name').textContent = task.name;
    document.getElementById('overlay-task-desc').textContent = task.description;
    document.getElementById('task-detail-overlay').style.display = 'flex';
};

// Close the task detail overlay
document.getElementById('close-task-overlay-btn').addEventListener('click', () => {
    document.getElementById('task-detail-overlay').style.display = 'none';
});


// Initialize page
window.onload = () => {
    initializeTasks();
    renderTasks();
};

