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
    currentPage();
    // loadContacts();
    displayMobileMenu();
    bottomMenuActive();
    await loadTasks();
    // displayHeader();
    // displayAsideMenu();
    // menuActive();
    displayTaskCard();
    updateBoardHtml();
    updateProfileName();
    

    // Prüfen, ob die Elemente existieren, bevor die Funktion aufgerufen wird
    let contentContact = document.getElementById('contentContact');
    let icon = document.getElementById('dropdownIconContact');

    if (contentContact && icon) {
        toggleContactDropdown(new Event('dummy')); // Ein Dummy-Event übergeben
    } else {
        console.error('Elemente contentContact oder dropdownIconContact wurden nicht gefunden.');
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
            // // Hervorhebungsfunktion für Links hinzufügen
            // addHighlightFunctionality(element);
            // // Aktiven Link setzen
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


function showLogOut() {
    let logOutContainer = document.getElementById('profile-logout-menu');
    if (logOutContainer.style.display === 'flex') {
        logOutContainer.style.display = 'none';

    } else {
        logOutContainer.style.display = 'flex';
    }
}

function toggleContactDropdown(event, taskId) {
    event.stopPropagation();
    const contentContact = document.getElementById(`dropdown-edit-form-assigned-${taskId}`);
    const dropdownIconContact = document.getElementById(`assigned-edit-form-dropdown-arrow-${taskId}`);
  
    if (!contentContact || !dropdownIconContact) {
      console.error(`Elemente contentContact oder dropdownIconContact für Task-ID ${taskId} wurden nicht gefunden.`);
      return;
    }
  
    contentContact.classList.toggle('show');
    dropdownIconContact.classList.toggle('rotate');
  }
  
  document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.custom-dropdown-assigned');
    const icons = document.querySelectorAll('.dropdown-icon');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    icons.forEach(icon => icon.classList.remove('rotate'));
  });
