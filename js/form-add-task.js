function toggleAssignedDropdown() {
    const dropdown = document.getElementById('dropdown-assigned');    
    let icon = document.getElementById('assigned-dropdown-arrow');   
    
        if (dropdown.style.display === 'block') {            
            dropdown.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';        
        } else {
            dropdown.style.display = 'block';            
            icon.style.transform = 'rotate(180deg)';
            displayDropdownAssigned();
        }
    
}

function toogleEditFromAssignedDropdown() {
    const dropdown = document.getElementById('dropdown-edit-form-assigned');    
    let icon = document.getElementById('assigned-edit-form-dropdown-arrow');   
    
        if (dropdown.style.display === 'block') {            
            dropdown.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';        
        } else {
            dropdown.style.display = 'block';            
            icon.style.transform = 'rotate(180deg)';
            displayDropdownEditFormAssigned();
        }
}

function toggleCategoryDropdown() {
    const dropdown = document.getElementById('dropdown-category');
    let icon = document.getElementById('category-dropdown-arrow');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}
// Erstellt ein globales Array, um die Daten zu speichern
let buttonData = [];

function removeClassesAndData() {
    // Findet alle Buttons
    let buttons = document.querySelectorAll('.prio-btn');

    // Geht durch jedes Button-Element
    buttons.forEach(button => {
        // Entfernt die Klassen 'urgent', 'medium' und 'low'
        button.classList.remove('urgent', 'medium', 'low');

        // Holt den Wert des 'data-value' Attributs
        let dataValue = button.getAttribute('data-value');

        // Entfernt die Daten aus dem Array
        buttonData = buttonData.filter(data => data.dataValue !== dataValue);

        // Setzt das 'src' Attribut des 'img' Elements zurück
        let img = button.querySelector('img');
        img.setAttribute('src', `../assets/img/icons/prio-btn/${dataValue.toLowerCase()}.png`);
    });
}

function addPrioData(button, img, priority, originalImgSrc) {
    // Entfernt alle Klassen und Daten
    removeClassesAndData();

    // Fügt die Klasse basierend auf der Priorität zum Button hinzu
    button.classList.add(priority.toLowerCase());

    // Holt den Wert des 'data-value' Attributs
    let dataValue = button.getAttribute('data-value');

    // Ändert das 'src' Attribut des 'img' Elements
    img.setAttribute('src', `../assets/img/icons/prio-btn/${priority.toLowerCase()}-white.png`);

    // Fügt die Daten zum Array hinzu
    buttonData.push({ dataValue, originalImgSrc, class: priority.toLowerCase() });
}

function removePrioData(button, img, priority) {
    // Entfernt die Klasse und die Daten
    button.classList.remove(priority.toLowerCase());

    // Holt den Wert des 'data-value' Attributs
    let dataValue = button.getAttribute('data-value');

    // Ändert das 'src' Attribut des 'img' Elements auf das ursprüngliche Bild
    let buttonDataItem = buttonData.find(data => data.dataValue === dataValue);
    if (buttonDataItem) {
        img.setAttribute('src', buttonDataItem.originalImgSrc);
    }

    // Entfernt die Daten aus dem Array
    buttonData = buttonData.filter(data => data.dataValue !== dataValue);
}

function prioBtnEditFormData(priority) {
    // Findet den Button, der auf der Grundlage der übergebenen Priorität geklickt wurde
    let button = document.querySelector(`#prio-btn-edit-form-${priority.toLowerCase()}`);

    // Holt das 'img' Element und sein 'src' Attribut
    let img = button.querySelector('img');
    let originalImgSrc = img.getAttribute('src');

    // Überprüft, ob der Button bereits die Klasse hat
    if (button.classList.contains(priority.toLowerCase())) {
        removePrioData(button, img, priority);
    } else {
        addPrioData(button, img, priority, originalImgSrc);
    }

    // Gibt das Array aus
    console.log(buttonData);
}

function prioBtnData(priority) {
    // Findet den Button, der auf der Grundlage der übergebenen Priorität geklickt wurde
    let button = document.querySelector(`#prio-btn-${priority.toLowerCase()}`);

    // Holt das 'img' Element und sein 'src' Attribut
    let img = button.querySelector('img');
    let originalImgSrc = img.getAttribute('src');

    // Überprüft, ob der Button bereits die Klasse hat
    if (button.classList.contains(priority.toLowerCase())) {
        removePrioData(button, img, priority);
    } else {
        addPrioData(button, img, priority, originalImgSrc);
    }

    // Gibt das Array aus
    console.log(buttonData);
}

function displayDropdownAssigned(){
    let dropdown = document.getElementById('dropdown-assigned');

    dropdown.innerHTML = '';

    for(let i = 0; i < contacts.length; i++){
        let contact = contacts[i];
        dropdown.innerHTML += formDropdownAssignedItemHtml(contact, i);
    }
} 

function displayDropdownEditFormAssigned() {
    let dropdown = document.getElementById('dropdown-edit-form-assigned');
    
    let assignedContactsString = document.getElementById('assigned').value;
    
    let assignedContacts = assignedContactsString.split(', ');

    dropdown.innerHTML = '';

    for(let i = 0; i < contacts.length; i++){
        let contact = contacts[i];
        let contactHtml = formDropdownAssignedItemHtml(contact, i);

        
        if (assignedContacts.includes(contact.name)) {
            
            contactHtml = contactHtml.replace('<input', '<input checked');
        }
        dropdown.innerHTML += contactHtml;
    }
}

function selectAssigned() {
    let selectAssigned = [];
    let inputAssigned = document.getElementById('assigned');
    let checkboxes = document.querySelectorAll('.checkbox-assigned');

    checkboxes.forEach(checkbox => {
        let contactName = checkbox.parentNode.querySelector('.assigned-name').getAttribute('data-value');
        if (checkbox.checked) {            
            let contact = contacts.find(c => c.name === contactName);
            selectAssigned.push(contact);
        }
    });

    inputAssigned.value = selectAssigned.length > 0 ? 'An: ' + selectAssigned.map(c => c.name).join(', '): '';
    console.log('Selected contacts:', selectAssigned);
    return selectAssigned;
}

function selectCategory(category){
    let inputCategory = document.getElementById('category');
    inputCategory.value = category;
    toggleCategoryDropdown();


}function formShowDuoIconSubtaskInput() {    
    document.getElementById('subtask-icon-container').classList.add('dNone');
    document.getElementById('subtask-duo-icon-container').classList.remove('dNone');
}




// function formShowDuoIconSubtaskInput() {    
//     let icon = document.getElementById('subtask-icon-container');
//     let duoIcon = document.getElementById('subtask-duo-icon-container');
    
//     icon.style.display = 'none';
//     duoIcon.style.display = 'flex';        
// }

function formHideDuoIconSubtaskInput() {
    let icon = document.getElementById('subtask-icon-container');
    let duoIcon = document.getElementById('subtask-duo-icon-container'); 
    
    icon.style.display = 'flex';
    duoIcon.style.display = 'none';
}

function clearSubtaskInputValue() {
    document.getElementById('subtask').value = '';    
}

function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let category = document.getElementById('category').value;
    let priority = buttonData[0]?.dataValue;
    let prioImage = buttonData[0]?.originalImgSrc;
    let prioClass = buttonData[0]?.class;
    let assignedContacts = selectAssigned();
    let assignedImage = collectProfileImage(assignedContacts);
    let subtasks = subtaskItemValue();
    let status = 'open';    

    let task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        category,
        priority,
        prioImage,
        prioClass,
        assignedContacts,
        assignedImage,
        subtasks,
        status
    };

    tasks.push(task);
    saveTasks();
    displaySucessMessage();
    updateBoardHtml();     
    closeAddTask(); 
    
}

function subtaskItemValue(){   
    let subtasks = [];
    const subtaskElements = document.querySelectorAll(`#subtask-item-input`); 

    subtaskElements.forEach(subtask => {
        subtasks.push({
            content: subtask.value  // Nehmen Sie an, dass der Wert des Inputs den Inhalt des Subtasks enthält
        });
    });

    return subtasks;
}

function collectProfileImage(selectedContacts) {
    let profilesImage = '';
    selectedContacts.forEach(contact => {
        profilesImage += contactProfileImageHtml(contact);
    });
    return profilesImage;
}

async function clearTasks() {
    // Leeren des lokalen Task-Arrays
    tasks = [];

    saveTasks();
    loadTasks();
}

function assignedItemChangeBackground(){
    let assignedItems = document.querySelectorAll('.dropdown-item-assigned');
    let checkbox = document.querySelectorAll('.checkbox-assigned');
    
    if(checkbox.checked){
        assignedItems.style.backgroundColor = 'blue';
}
}

function displaySucessMessage(){
    let background = document.getElementById('task-card-detail-background');

    background.style.display = 'flex';
    background.innerHTML = '';
    background.innerHTML = succesSaveTaskHtml();
    setTimeout(() => {
        background.style.display = 'none';
    }, 1000);
}