async function init() {
    await includeHTML();
    // responsive();
    renderContactListDropdown();
    openCategoryDropdown();
    openEditCategoryDropdown();
    setupSubtaskIcons();
    setupEditSubtaskIcons();     
    loadTasks();
    renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function signUpInit(){
    await includeHTML();
    renderContactListDropdown();
    openCategoryDropdown();
    loadTasks();
}

async function addTaskInit(){
    await includeHTML();
    currentPage();
    // responsive();
    loadContacts();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    loadTasks();
    // renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function contactInit(){
    await includeHTML();
    currentPage();
    loadContacts();
    // responsive();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    loadTasks();
    // renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function imprintInit(){
    await includeHTML();
    currentPage();
    // responsive();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    loadTasks();
    // renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function dataProtectionInit(){
    await includeHTML();
    currentPage();
    // responsive();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    loadTasks();
    // renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function helpInit(){
    await includeHTML();
    currentPage();
    // responsive();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    loadTasks();
    // renderEditContactListDropdown();
    // setupEditSubtaskListeners();
    updateProfileName();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            // Hervorhebungsfunktion für Links hinzufügen
            // addHighlightFunctionality(element);
            // Aktiven Link setzen
            // setHighlight();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function currentPage() {
    let currentPage = window.location.href;

    if(window.innerWidth < 1360) {
        responsiveCurrentPage(currentPage);
    }else {
        normalCurrentPage(currentPage);
    }
}

function normalCurrentPage(cP) {
if (cP.includes('summary.html')) {
    document.getElementById('summaryMenu').classList.add('currentPage');
}
else if (cP.includes('addTask.html')) {
    document.getElementById('addTaskMenu').classList.add('currentPage');
}
else if (cP.includes('board.html')) {
    document.getElementById('boardMenu').classList.add('currentPage');
} 
else if(cP.includes('contact.html')) {
    document.getElementById('contactMenu').classList.add('currentPage');
}
else if (cP.includes('imprint.html')){
    document.getElementById('imprintMenu').classList.add('currentPagePolicy');
}
else if(cP.includes('dataProtection.html')){
    document.getElementById('dataProtectionMenu').classList.add('currentPagePolicy');
}
}

function responsiveCurrentPage(cP) {
responsiveLogoutMenu();
if (cP.includes('summary.html')) {
    document.getElementById('summaryMenu').classList.add('currentPageResponsive');
    document.getElementById('summaryIcon').style = 'content: url(/assets/img/aside-icon/summary_blue.png) !important;';
}
else if (cP.includes('addTask.html')) {
    document.getElementById('addTaskMenu').classList.add('currentPageResponsive');
    document.getElementById('addTaskIcon').style = 'content: url(/assets/img/aside-icon/addTask_blue.png)!important;';
}
else if (cP.includes('board.html')) {
    document.getElementById('boardMenu').classList.add('currentPageResponsive');
    document.getElementById('boardIcon').style = 'url(/assets/img/aside-icon/board_blue.png) !important;';
} 
else if(cP.includes('contact.html')) {
    document.getElementById('contactMenu').classList.add('currentPageResponsive');
    document.getElementById('contactsIcon').style = 'content: url(/assets/img/aside-icon/contacts_blue.png)!important;';
} 

}

function responsiveLogoutMenu() {
document.getElementById('helpHeaderMenu').classList.remove('d-none');
document.getElementById('logout-linkLogOut').classList.add('blueColorResponsive');
document.getElementById('logout-linkData').classList.add('blueColorResponsive');
document.getElementById('logout-linkImprint').classList.add('blueColorResponsive');
}

// function responsive(){
//     if(window.innerWidth < 1200){
//         document.getElementById('helpHeaderMenu').classList.remove('d-none');
//         document.getElementById('profile-logout-menu').classList.add('blueColorResponsive');
//     }else{
//         document.getElementById('helpHeaderMenu').classList.add('d-none');
//     }

// }

// function addHighlightFunctionality(element) {
//     let links = element.querySelectorAll('.menu-links, .policy-links');
//     links.forEach(link => {
//         link.addEventListener('click', function(event) {
//             // Toggle-Klasse für Hervorhebung hinzufügen oder entfernen
//             link.classList.toggle('highlight');
//             // Führe das Standardverhalten des Links nach der Hervorhebung aus
//             setTimeout(() => {
//                 window.location.href = link.getAttribute('href');
//             }, 100);
//         });
//     });
// }

// Diese Funktion setzt die Hervorhebung basierend auf der aktuellen Seite
// function setHighlight() {
//     let currentPath = window.location.pathname;
//     let links = document.querySelectorAll('.menu-links, .policy-links');
//     links.forEach(link => {
//         if (link.getAttribute('href') === currentPath) {
//             link.classList.add('highlight');
//         } else {
//             link.classList.remove('highlight');
//         }
//     });
// }

// Führe die includeHTML-Funktion aus, um die Seiteninhalte einzubinden und die Hervorhebung zu setzen
// function toggleHighlight(element) {
//     // Toggle-Klasse für Hervorhebung hinzufügen oder entfernen
//     element.classList.toggle('highlight');
//     // Führe das Standardverhalten des Links nach der Hervorhebung aus
//     setTimeout(() => {
//         window.location.href = element.getAttribute('href');
//     }, 100);
// }

async function displaySuccessMessage() {
    const successHtml = successfullyHtml(); // Generiere das HTML für die Erfolgsmeldung
    document.body.insertAdjacentHTML('beforeend', successHtml); // Füge das Erfolgs-HTML am Ende des Body-Elements ein

    // Optional: Entferne die Nachricht nach 5 Sekunden
   setTimeout(() => {
        const successContainer = document.querySelector('.successfullyContainer');
        if (successContainer) {
            successContainer.remove(); // Entfernt das Erfolgsnachricht-Element
        }
    }, 2000);

    
}

function successfullyHtml() {
    return `<div class="successfullyContainer">
    <div class="successfully slide-in-bottom" >
        <span>Task added to board</span>
        <img src="../assets/img/formAddTask/addTaskBoardIconWhite.png">
    </div>
  </div>`;
}

async function saveTasks() {
    try {
        await setItem('tasks', JSON.stringify(tasks));

    } catch (e) {
        console.error('Failed to save tasks', e);
    }
}

let tasksLoaded = false; // Variable, um den Ladezustand der Aufgaben zu verfolgen

function getItem(key) {
    return localStorage.getItem(key);
}

async function loadTasks() {
    try {
        tasks = await getItem('tasks');
        tasks = JSON.parse(tasks); 

        // Überprüfen, ob tasks erfolgreich geladen wurden, bevor updateHtml() aufgerufen wird
        if (tasks) {
            updateHtml();
        } else {
            console.log('No tasks loaded.'); // Handle den Fall, dass tasks nicht geladen wurden
        }
    } catch (e) {
        console.error('Failed to load tasks', e);
    }
}

/* öffnet LogOut Container */
function showLogOut() {
    let logOutContainer = document.getElementById('profile-logout-menu');
    if (logOutContainer.style.display === 'flex') {
        logOutContainer.style.display = 'none';

    } else {
        logOutContainer.style.display = 'flex';
    }
}

function mousedownCreatTaskBtn() {
    let addTaskBtnIcon = document.getElementById('create-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/check-blue.svg';
}

function mouseupCreatTaskBtn() {
    let addTaskBtnIcon = document.getElementById('create-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/check.svg';
}

function mousedownCancelTaskBtn() {
    let addTaskBtnIcon = document.getElementById('cancel-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/cancel-click-icon.svg';
}

function mouseupCancelTaskBtn() {
    let addTaskBtnIcon = document.getElementById('cancel-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/cancel-hover-icon.svg';
}

function mouseoverCancelTaskBtn() {
    let addTaskBtnIcon = document.getElementById('cancel-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/cancel-hover-icon.svg';
}

function mouseoutCancelTaskBtn() {
    let addTaskBtnIcon = document.getElementById('cancel-task-btn-icon');
    addTaskBtnIcon.src = '../assets/img/buttonIcons/cancel-default-icon.svg';
}

function prioBtn(selected) {    

    Object.keys(buttons).forEach(key => {
        const btn = document.getElementById(buttons[key].button);
        const icon = document.getElementById(buttons[key].icon);

        if (key === selected) {
            if (btn.classList.contains('prioBtn' + key.charAt(0).toUpperCase() + key.slice(1))) {
                btn.classList.remove('prioBtn' + key.charAt(0).toUpperCase() + key.slice(1));
                icon.src = buttons[key].defaultIcon;
                activePriority = ''; // Zurücksetzen, wenn die Priorität deaktiviert wird
                activeIconPath = ''; // Pfad zurücksetzen
            } else {
                btn.classList.add('prioBtn' + key.charAt(0).toUpperCase() + key.slice(1));
                icon.src = buttons[key].activeIcon;
                activePriority = btn.getAttribute('data-value'); // Aktuelle Priorität speichern
                activeIconPath = buttons[key].defaultIcon; // Pfad des aktiven Icons speichern
            }
        } else {
            btn.classList.remove('prioBtn' + key.charAt(0).toUpperCase() + key.slice(1));
            icon.src = buttons[key].defaultIcon;
        }
    });
    
    console.log("Aktive Priorität:", activePriority);
    console.log("Aktiver Icon Pfad:", activeIconPath);
}

// Funktion um den gespeicherten Icon-Pfad abzurufen
function getActiveIconPath() {
    return activeIconPath;
    
}

function getActivePrio(){
    return activePriority;
}

async function saveTask() {
    let title = document.getElementById('addTaskInputTitle');
    let date = document.getElementById('formDate');
    let description = document.getElementById('description');
    let category = document.getElementById('inputCategory');

    // Extrahiere Informationen über ausgewählte Kontakte
    let selectedContacts = getSelectedContactsInfo();

    if (!title.value || !date.value) {
        document.getElementById('requiredWarningDate').classList.add('requiredWarningBorder');
        document.getElementById('requiredWarningTitle').classList.add('requiredWarningBorder');
        title.classList.add('borderWarning');
        date.classList.add('borderWarning');
        return; // Beenden der Funktion, wenn Titel oder Datum fehlen
    }

    // Erstellen des Task-Objekts
    let task = {
        id: Date.now(),  // Verwenden Sie Date.now() für eine einzigartige ID
        title: title.value,
        date: date.value,
        description: description.value,
        priority: getActiveIconPath(),
        assigned: selectedContacts.map(contact => {
            return { name: contact.name, profileColor: contact.profileColor, initialien: contact.initialien };
        }),
        profileHtml: generateProfileHtml(selectedContacts),
        category: category.value,
        subtasks: collectSubtasks(),
        status: 'open',
        prioValue: getActivePrio(),
        
    };

    // Füge den Task dem globalen Array hinzu
    tasks.push(task);

    // Speichere die Tasks auf dem Server und führe weitere Aktionen aus
    try {
        await saveTasks();
        // renderTaskCard(task);
        displaySuccessMessage();
        clearForm();
        loadTasks();
        updateHtml();
        fromAddTaskToBoardPage();
    } catch (error) {
        console.error('Failed to save the task:', error);
    }
}


function clearForm() {
    document.getElementById('addTaskInputTitle').value = '';
    document.getElementById('formDate').value = '';
    document.getElementById('description').value = '';
    document.getElementById('inputContact').value = '';
    document.getElementById('inputCategory').value = '';

    // Setze alle Subtasks zurück, falls nötig
    document.querySelectorAll('#subtaskList .inputIconWrap').forEach(subtask => {
        subtask.remove();
    });

    resetPriority();
}

function resetPriority() {

    Object.keys(buttons).forEach(key => {
        const btn = document.getElementById(buttons[key].button);       
        // Entferne die aktive Klasse
        btn.classList.remove('prioBtn' + key.charAt(0).toUpperCase() + key.slice(1));

    });
    activeIconPath = '';
    

}

function renderContactListDropdown() {
    let contentContact = document.getElementById('contentContact');

    // Überprüfe, ob das Element existiert, bevor du es bearbeitest
    if (contentContact) {
        contentContact.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contentContact.innerHTML += contactListDropdownHtml(contact);
    }}
}

function generateProfileHtml(selectedContacts) {
    let profilesHtml = '';
    selectedContacts.forEach(contact => {
        profilesHtml += `<div class="profileIconNameWrap">
            <div class="profileCircle" style="background-color: ${contact.profileColor};">
                <span class="initialsText">${contact.initialien}</span>
            </div>
        </div>`;
    });
    return profilesHtml;
}

function contactListDropdownHtml(contacts) {
    return `
    <label for="${contacts.name}" class="contactList" onclick="event.stopPropagation();">
    <div class="profileIconNameWrap">
    <div class="profileCircle" style="background-color: ${contacts.profileColor};">
    <span class="initialsText">${contacts.initialien}</span>
    </div>
    ${contacts.name}
    </div>
    <input type="checkbox" name="${contacts.name}" id="${contacts.name}" class="checkboxContact" onchange="updateInputContact()" /><img src="../assets/img/input/checkbox.svg" class="checkboxIconContact">
    </label>`;
}

function updateInputContact() {
    let selectedContacts = [];
    let checkboxes = document.querySelectorAll('.checkboxContact');
    checkboxes.forEach((checkbox) => {
        let label = checkbox.closest('label.contactList');
        let contactName = label.querySelector('.profileIconNameWrap').textContent.trim();
        contactName = contactName.replace(/\s*\b[A-Z]{2}\b\s*/, ''); // Entfernt die Initialen

        if (checkbox.checked) {
            selectedContacts.push(contactName);
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    });

    // Setzt den Input-Wert, abhängig davon, ob Kontakte ausgewählt wurden
    let inputContact = document.getElementById('inputContact');
    inputContact.value = selectedContacts.length > 0 ? 'An: ' + selectedContacts.join(', ') : '';
}

function toggleContactDropdown(event) {
    let contentContact = document.getElementById('contentContact');
    let icon = document.getElementById('dropdownIconContact');

    // Verhindern, dass das Ereignis weitergeleitet wird
    event.stopPropagation();

    // Umschalten der Sichtbarkeit des Dropdowns
    contentContact.style.display = contentContact.style.display === 'block' ? 'none' : 'block';

    // Bild je nach Zustand ändern
    icon.src = contentContact.style.display === 'block' ? '../assets/img/input/arrow_dropdown_up.png' : '../assets/img/input/arrow_dropdown_down.png';
}

function closeDropdown() {
    let contentContact = document.getElementById('contentContact');
    let icon = document.getElementById('dropdownIconContact');

    if (contentContact.style.display === 'block') {
        contentContact.style.display = 'none';
        icon.src = '../assets/img/input/arrow_dropdown_down.png';
        updateInputContact(); // Aktualisiere den Input-Wert beim Schließen
    }
}

function openCategoryDropdown() {
    let contentCategory = document.getElementById('contentCategory');
    let inputCategory = document.getElementById('inputCategory');
    let icon = document.getElementById('dropdownIconCategory');
    if (contentCategory && inputCategory && icon) {
        let options = contentCategory.querySelectorAll('span');

    // Event-Listener für das Eingabefeld und das Icon
    [inputCategory, icon].forEach(element => {
        element.addEventListener('click', function (event) {
            event.stopPropagation(); // Verhindert das Weiterleiten des Klicks
            // Umschalten der Sichtbarkeit des Dropdowns
            contentCategory.style.display = contentCategory.style.display === 'flex' ? 'none' : 'flex';
            // Bild je nach Zustand ändern
            icon.src = contentCategory.style.display === 'flex' ? '../assets/img/input/arrow_dropdown_up.png' : '../assets/img/input/arrow_dropdown_down.png';
        });
    });

    // Event-Listener für Optionen im Dropdown
    options.forEach(option => {
        option.addEventListener('click', function () {
            inputCategory.value = this.textContent; // Setzt den Text der gewählten Option ins Eingabefeld
            contentCategory.style.display = 'none'; // Schließt das Dropdown
            icon.src = '../assets/img/input/arrow_dropdown_down.png'; // Ändert das Icon zurück
        });
    });

    // Schließt das Dropdown, wenn außerhalb des Dropdowns und seiner Steuerelemente geklickt wird
    document.addEventListener('click', function () {
        if (contentCategory.style.display === 'flex') {
            contentCategory.style.display = 'none';
            icon.src = '../assets/img/input/arrow_dropdown_down.png';
        }
    });
    }
}

function openSubtaskInput(event) {
    let subtaskIconAdd = document.getElementById('subtaskIconAdd');
    let subtaskSecondIconsContainer = document.getElementById('subtaskSecondIconsContainer');

    subtaskIconAdd.style.display = 'none';
    subtaskSecondIconsContainer.style.display = 'flex';
    inputSubtask.focus();
    event.stopPropagation(); // Verhindert das Weiterleiten des Klicks
}

function hideSubtaskIcons() {
    let subtaskIconAdd = document.getElementById('subtaskIconAdd');
    let subtaskSecondIconsContainer = document.getElementById('subtaskSecondIconsContainer');

    subtaskIconAdd.style.display = 'flex';
    subtaskSecondIconsContainer.style.display = 'none';
}

function setupSubtaskIcons() {
    let subtaskIconDelete = document.getElementById('subtaskIconDelete');
    let subtaskIconDone = document.getElementById('subtaskIconDone');

    // Überprüfe, ob die benötigten Elemente vorhanden sind, bevor Event-Listener hinzugefügt werden
    if (subtaskIconDelete && subtaskIconDone) {
        // Hover-Effekt für das Close-Icon
        subtaskIconDelete.addEventListener('mouseenter', function () {
            this.src = '../assets/img/input/subtaskCloseHover.png'; // Pfad zu Ihrem Hover-Icon für Lösch-Icon
        });
        subtaskIconDelete.addEventListener('mouseleave', function () {
            this.src = '../assets/img/input/subtaskClose.png'; // Pfad zu Ihrem normalen Lösch-Icon
        });

        // Hover-Effekt für das Fertig-Icon
        subtaskIconDone.addEventListener('mouseenter', function () {
            this.src = '../assets/img/input/doneHover.png'; // Pfad zu Ihrem Hover-Icon für Fertig-Icon
        });
        subtaskIconDone.addEventListener('mouseleave', function () {
            this.src = '../assets/img/input/done.png'; // Pfad zu Ihrem normalen Fertig-Icon
        });
    }
}

function clearSubtaskInputValue() {
    document.getElementById('inputSubtask').value = '';
}

function addSubtaskToList() {
    let inputSubtask = document.getElementById('inputSubtask');
    let subtaskList = document.getElementById('subtaskList');
    let subtaskValue = inputSubtask.value.trim();

    if (subtaskValue !== '') {
        let newSubtask = document.createElement('div');
        newSubtask.className = 'inputIconWrap p-6';
        newSubtask.innerHTML = `
            
            <input type="text" class="addTaskInputStandard subtaskListItem" value="${subtaskValue}" readonly>
            <div class="subtaskIconContainer">
            <span class="bullet">&#x2022;</span>
                <div class="subtaskListIconsContainer">
                    <img src="../assets/img/input/subtask_edit.png" onclick="subtaskItemEdit(event)" class="suptaskListIconSecond" id="subtaskListEditIcon"/>
                    <span class="seperator"></span>
                    <img src="../assets/img/input/delete.png" onclick="subtaskItemDelete(event)" class="suptaskListIconSecond" id="subtaskListDeleteIcon"/>
                </div>
            </div>
        `;
        
        subtaskList.appendChild(newSubtask);
        inputSubtask.value = '';
    }
}

function subtaskItemDelete(event) {
    
    let subtaskItem = event.target.closest('.inputIconWrap'); // Greifen Sie auf das übergeordnete Subtask-Element zu
    if (subtaskItem) {
        subtaskItem.remove(); // Entfernt das Subtask-Element aus dem DOM
    }
}

function subtaskItemEdit(event) {
   
    let subtaskItem = event.target.closest('.inputIconWrap'); // Zugriff auf das übergeordnete Subtask-Element
    if (subtaskItem) {
        let inputField = subtaskItem.querySelector('.subtaskListItem');
        if (inputField) {
            inputField.readOnly = false; // Entfernt das readonly-Attribut
            inputField.focus(); // Setzt den Fokus auf das Input-Feld
        }
    }
}

function collectSubtasks() {
    let subtasks = [];
    const subtaskElements = document.querySelectorAll('.subtaskListItem'); 

    subtaskElements.forEach(subtask => {
        subtasks.push({
            content: subtask.value  // Nehmen Sie an, dass der Wert des Inputs den Inhalt des Subtasks enthält
        });
    });

    return subtasks;
}

function getSelectedContactsInfo() {
    // Extrahiert den Text aus dem Eingabefeld und entfernt den Präfix "An: " falls vorhanden
    let inputText = document.getElementById('inputContact').value;
    let cleanInput = inputText.startsWith("An: ") ? inputText.substring(4) : inputText;

    // Teilt die saubere Eingabe in einzelne Namen, indem sie bei ', ' aufgeteilt wird
    let selectedNames = cleanInput.split(', ').map(name => name.trim());

    // Filtert die Kontakte, deren Namen in der Liste der ausgewählten Namen enthalten sind
    let selectedContactsInfo = contacts.filter(contact => selectedNames.includes(contact.name)).map(contact => {
        return { initialien: contact.initialien, profileColor: contact.profileColor, name: contact.name };
    });

    return selectedContactsInfo;
}

function back() {
    window.history.back();
}

function fromAddTaskToBoardPage() {    
    if (window.location.href.includes('../html/addTask.html')) {
        window.location.href = '../html/board.html';
    }
}



