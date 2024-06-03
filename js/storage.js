const STORAGE_TOKEN = '6KQVzK7rg9Avzi82VXMOq97RZXHygp4lj8GUUKIpCDWtCDO0vJGQb618YDXf7LjO';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let contacts = [
    {
        "name": "Julia Schäffer",
        "email": "julia.sch@hotmail.de",
        "phone": "+491778965144",
        "profileColor": "rgb(255, 161, 46)",
        "initialien": "JS"
    },
    {
        "name": "Philipp Schönborn",
        "email": "philipp@schoenborn-home.de",
        "phone": "+49438721221",
        "profileColor": "rgb(42, 115, 224)",
        "initialien": "PS"
    },
    {
        "name": "Tobias Mueller",
        "email": "webstor21@gmail.com",
        "phone": "+49152341609",
        "profileColor": "rgb(232, 58, 58)",
        "initialien": "TM"
    },
    {
        "name": "Nathalie Strauchmann",
        "email": "strauchmann89@yahoo.de",
        "phone": "+49151338395",
        "profileColor": "rgb(139, 42, 224)",
        "initialien": "NS"
    },
    {
        "name": "Melanie Müller",
        "email": "m.muellerstreich@gmail.com",
        "phone": "+491760152757",
        "profileColor": "rgb(255, 46, 46)",
        "initialien": "MM"
    },
    {
        "name": "Herbert Peter",
        "email": "Petermann@hotmail.de",
        "phone": "+491723687234",
        "profileColor": "rgb(232, 58, 133)",
        "initialien": "HP"
    },
    {
        "name": "Heiko Lee",
        "email": "h.lee99@home.com",
        "phone": "",
        "profileColor": "rgb(232, 58, 58)",
        "initialien": "HL"
    },
];

const beautifulColors = [
    'rgb(255, 46, 46)', 'rgb(255, 161, 46)', 'rgb(255, 238, 46)', 'rgb(51, 224, 42)', 'rgb(42, 203, 224)',
    'rgb(42, 115, 224)', 'rgb(139, 42, 224)', 'rgb(218, 42, 224)', 'rgb(232, 58, 133)', 'rgb(232, 58, 58)',
];

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let tasks = [];

const buttons = {
    urgent: {
        button: 'prioUrgent',
        icon: 'prioUrgentIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioUrgentWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioUrgent.png'
    },
    medium: {
        button: 'prioMedium',
        icon: 'prioMediumIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioMediumWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioMedium.png'
    },
    low: {
        button: 'prioLow',
        icon: 'prioLowIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioLowWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioLow.png'
    }
};

const editButtons = {
    urgent: {
        button: 'btnEditUrgent',
        icon: 'btnEditUrgentIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioUrgentWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioUrgent.png'
    },
    medium: {
        button: 'btnEditMedium',
        icon: 'btnEditMediumIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioMediumWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioMedium.png'
    },
    low: {
        button: 'btnEditLow',
        icon: 'btnEditLowIcon',
        activeIcon: '../assets/img/formAddTask/prioBtnIcon/prioLowWhite.png',
        defaultIcon: '../assets/img/formAddTask/prioBtnIcon/prioLow.png'
    }
};

function getAssignedContacts() {
    const assignedElements = document.querySelectorAll('.assigned-contact');
    return Array.from(assignedElements).map(element => element.textContent.trim());
  }


let activePriority = '';

async function setItem(key, value){
    const payload = {key, value, token:STORAGE_TOKEN};
     return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
     .then(res => res.json());
} 

 async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}


async function loadTasks(){
    try{
        const data = await getItem('tasks');
        tasks = JSON.parse(data);
    
    }   catch (error){
        console.error('Error loading tasks', error);
    }
}

async function saveTasks() {
    try {
        const response = await setItem('tasks', JSON.stringify(tasks));
        if (!response || response.error) {
            throw new Error('Failed to save tasks: ' + (response ? response.error : 'No response'));
        }        
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

function saveContacs() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


// function loadContacts() {
//     let storageAsText = localStorage.getItem("contacts");

//     if (storageAsText) {
//         contacts = JSON.parse(storageAsText);
//     }
// }