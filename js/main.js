/* async function contactInit() {
    displayMobileMenu();
    bottomMenuActive();
    await loadContacts();
    displayHeader();
    displayAsideMenu();
    menuActive();
    displayContacts();
} */

async function boardInit() {
    await includeHTML();
    displayMobileMenu();
    bottomMenuActive();
    await loadTasks();
    await loadContacts();
    // displayHeader();
    // displayAsideMenu();
    // menuActive();
    displayTaskCard();
    updateBoardHtml();
    updateProfileName();
    
}
/* 
function summaryInit() {
    displayMobileMenu();
    bottomMenuActive();
    displayHeader();
    displayAsideMenu();
    menuActive();
} */

/* function addTaskInit() {
    displayMobileMenu();
    bottomMenuActive();
    displayHeader();
    displayAsideMenu();
    menuActive();
} */


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

// function displayHeader() {
//     let header = document.getElementById('header');

//     header.innerHTML = headerHml();
// }

// function displayAsideMenu() {
//     let aside = document.getElementById('aside-menu');

//     aside.innerHTML = asideMenu();
// }

function displayMobileMenu() {
    let mobileMenu = document.getElementById('mobile-menu');

    mobileMenu.innerHTML = mobileMenuHtml();
}



// function menuActive() {
//     let summary = document.getElementById('summary-link');
//     let addTask = document.getElementById('add-task-link');
//     let board = document.getElementById('board-link');
//     let contacts = document.getElementById('contacts-link');

//     if (window.location.pathname === '/html/summary.html') {
//         summary.classList.add('active');
//         addTask.classList.remove('active');
//         board.classList.remove('active');
//         contacts.classList.remove('active');
//     }

//     if (window.location.pathname === '/html/add-task.html') {
//         addTask.classList.add('active');
//         summary.classList.remove('active');
//         board.classList.remove('active');
//         contacts.classList.remove('active');
//     }

//     if (window.location.pathname === '/html/board.html') {
//         board.classList.add('active');
//         summary.classList.remove('active');
//         addTask.classList.remove('active');
//         contacts.classList.remove('active');
//     }
//     if (window.location.pathname === '/html/contacts.html') {
//         contacts.classList.add('active');
//         summary.classList.remove('active');
//         addTask.classList.remove('active');
//         board.classList.remove('active');
//     }

// }

function showLogout() {
    let logout = document.getElementById('logout');
    if (logout.style.display === 'block') {
        logout.style.display = 'none';
    } else {
        logout.style.display = 'block';
    }
}

function bottomMenuActive() {
    let summary = document.getElementById('summary-mobile-link');
    let addTask = document.getElementById('add-task-mobile-link');
    let board = document.getElementById('board-mobile-link');
    let contacts = document.getElementById('contacts-mobile-link');

    if (window.location.pathname === '/html/summary.html') {
        summary.classList.add('summary-active');
        addTask.classList.remove('add-task-active');
        board.classList.remove('board-active');
        contacts.classList.remove('contacts-active');
    }

    if (window.location.pathname === '/html/add-task.html') {
        addTask.classList.add('add-task-active');
        summary.classList.remove('summary-active');
        board.classList.remove('board-active');
        contacts.classList.remove('contacts-active');
    }

    if (window.location.pathname === '/html/board.html') {
        board.classList.add('board-active');
        summary.classList.remove('summary-active');
        addTask.classList.remove('add-task-active');
        contacts.classList.remove('contacts-active');
    }
    if (window.location.pathname === '/html/contacts.html') {
        contacts.classList.add('contacts-active');
        summary.classList.remove('summary-active');
        addTask.classList.remove('add-task-active');
        board.classList.remove('board-active');
    }

}





