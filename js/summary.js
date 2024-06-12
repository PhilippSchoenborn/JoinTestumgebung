async function summaryInit() {
    await includeHTML();
    currentPage();
    renderContactListDropdown();
    openCategoryDropdown();
    // openEditCategoryDropdown();
    // setupSubtaskIcons();
    // setupEditSubtaskIcons();     
    await loadTasks();
    updateNumbers();
    updateNextEvent();
    // renderEditContactListDropdown();
    updateUserName(); // Benutzername aktualisieren
    updateProfileName();
}

const dateElement = document.getElementById('date');
const currentDate = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthIndex = currentDate.getMonth();
const year = currentDate.getFullYear();
const formattedDate = `${months[monthIndex]} ${currentDate.getDate()}, ${year}`;
dateElement.innerHTML = formattedDate;



const greetElement = document.getElementById('greet');
const now = new Date();
const currentHour = now.getHours();

function buttonClick() {
    window.location.href='board.html';
}

function setGreeting() {
    let greeting = '';
    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Hello';
    } else {
        greeting = 'Good evening';
    }

    // Verwende innerHTML, um den HTML-Inhalt des Elements zu ersetzen
    greetElement.innerHTML = greeting;

    // Testen: Konsolenausgabe des Grußes
    console.log("Greeting:", greeting);
}

function updateNumbers() {
    let urgentTasks = tasks.filter(task => task.prioValue=== "Urgent").length;
        document.getElementById('urgentTaskNumber').innerHTML = '';
        document.getElementById('urgentTaskNumber').innerHTML = `${urgentTasks}`;
    let tasksInBoard = tasks.length;
        document.getElementById('taskinBoardNumber').innerHTML = '';
        document.getElementById('taskinBoardNumber').innerHTML = `${tasksInBoard}`;
    let tasksToDo = tasks.filter(task => task.status=== "open").length;
        document.getElementById('tasksToDoNumber').innerHTML = '';
        document.getElementById('tasksToDoNumber').innerHTML = `${tasksToDo}`;
    let tasksInProgress = tasks.filter(task => task.status=== "inProgress").length;
        document.getElementById('tasksInProgressNumber').innerHTML = '';
        document.getElementById('tasksInProgressNumber').innerHTML = `${tasksInProgress}`;
    let tasksAwaitFeedback = tasks.filter(task => task.status=== "feedback").length;
        document.getElementById('tasksAwaitFeedbackNumber').innerHTML = '';
        document.getElementById('tasksAwaitFeedbackNumber').innerHTML = `${tasksAwaitFeedback}`;
    let tasksDone = tasks.filter(task => task.status=== "done").length;
        document.getElementById('tasksDoneNumber').innerHTML = '';
        document.getElementById('tasksDoneNumber').innerHTML = `${tasksDone}`;
}

function updateNextEvent() {
    const today = new Date();
    let nearestDate = null;

    tasks.forEach(task => {
        const taskDate = new Date(task.date);
        
        if (!nearestDate || (taskDate >= today && taskDate < nearestDate)) {
            nearestDate = taskDate;
        }
    });

    const formattedDate = nearestDate ? nearestDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) : 'No upcoming tasks';
    document.getElementById('date').textContent = formattedDate;
}



setGreeting();


// let currentUserName = localStorage.getItem('currentUser');

// // Funktion, um den aktuellen Benutzernamen aus dem Local Storage zu laden und in das Element mit der ID "name" einzufügen
// function updateUserName() {
//     // Laden des aktuellen Benutzernamens aus dem Local Storage
//     const currentUserString = localStorage.getItem('currentUser');

//     // Überprüfen, ob der aktuelle Benutzer vorhanden ist
//     if (currentUserString) {
//         // Entfernen Sie die Anführungszeichen aus dem Benutzernamen und führen Sie eine Trim-Operation durch, um Leerzeichen zu entfernen
//         const currentUser = currentUserString.replace(/"/g, '').trim();

//         // Das Element mit der ID "name" suchen und den aktuellen Benutzernamen einfügen
//         const nameElement = document.getElementById('name');

//         // Überprüfen, ob der Benutzer "Guest" ist
//         if (currentUser.toLowerCase() !== 'guest') {
//             // Wenn der Benutzer nicht "Guest" ist, fügen Sie den Benutzernamen ein
//             nameElement.innerHTML = currentUser;
//         }
//     } else {
//         console.error('Aktueller Benutzer nicht gefunden.');
//     }

//     // Nachdem der Benutzername aktualisiert wurde, rufen Sie die Funktion auf, um den Gruß zu aktualisieren
//     setGreeting();
// }


// // Funktion, um das Element "profile-name" entsprechend dem aktuellen Benutzer zu aktualisieren
// function updateProfileName() {
//     // Laden des aktuellen Benutzernamens aus dem Local Storage
//     const currentUserString = localStorage.getItem('currentUser');

//     // Überprüfen, ob der aktuelle Benutzer vorhanden ist
//     if (currentUserString) {
//         // Entfernen Sie die Anführungszeichen aus dem Benutzernamen und führen Sie eine Trim-Operation durch, um Leerzeichen zu entfernen
//         const currentUser = currentUserString.replace(/"/g, '').trim();

//         // Das Element mit der ID "profile-name" suchen
//         const profileNameElement = document.getElementById('profile-name');

//         // Überprüfen, ob der Benutzername "Guest" ist
//         if (currentUser.toLowerCase() === 'guest') {
//             // Wenn der Benutzername "Guest" ist, setzen Sie das Element mit der ID "profile-name" auf "G"
//             profileNameElement.textContent = "G";
//         } else {
//             // Wenn der Benutzername nicht "Guest" ist, führen Sie die übliche Initialen-Extraktion durch
//             // Versuchen Sie, den Benutzernamen zu splitten, um Vor- und Nachnamen zu erhalten
//             const nameParts = currentUser.split(' ');
//             if (nameParts.length >= 2) {
//                 // Extrahieren Sie Vor- und Nachnamen
//                 const firstName = nameParts[0];
//                 const lastName = nameParts.slice(1).join(' '); // Nachname kann aus mehreren Teilen bestehen

//                 // Extrahieren Sie die Initialen und setzen Sie sie in Großbuchstaben um
//                 const firstNameInitial = firstName.charAt(0).toUpperCase();
//                 const lastNameInitial = lastName.charAt(0).toUpperCase();

//                 // Kombinieren Sie die Initialen, um den vollständigen Namen zu erhalten
//                 const fullNameInitials = firstNameInitial + lastNameInitial;

//                 // Das Element mit der ID "profile-name" und die Initialen einfügen
//                 profileNameElement.textContent = fullNameInitials;
//             } else {
//                 // Wenn Vor- oder Nachname fehlen, setzen Sie einen Standardwert für die Initialen
//                 const fullNameInitials = "G"; // Zum Beispiel "XX" für "Unbekannt"

//                 // Das Element mit der ID "profile-name" und die Initialen einfügen
//                 profileNameElement.textContent = fullNameInitials;
//             }
//         }

//         // Prüfen, ob der Benutzer eingeloggt ist, und das Komma entsprechend setzen
//         const greetElement = document.getElementById('greet');
//         if (currentUser.toLowerCase() !== 'guest') {
//             greetElement.innerHTML = greetElement.innerHTML + ', '; // Komma setzen
//         }
//     } else {
//         console.error('Aktueller Benutzer nicht gefunden.');
//     }
// }

// function loginGuestAndRedirect() {
//     // Gastnamen im Local Storage speichern
//     localStorage.setItem('currentUser', "Guest");

//     // Die Begrüßung auf der Homepage aktualisieren, ohne den Gästenamen einzuschließen
//     console.log("Updating greeting...");
//     updateGreeting();

//     // Weiterleitung auf die Seite /html/summary.html
//     console.log("Redirecting to summary.html...");
//     window.location.href = '../html/summary.html';

//     // Erstellen eines leeren Arrays für den Gast, falls nicht vorhanden
//     if (!localStorage.getItem('guestTasks')) {
//         localStorage.setItem('guestTasks', JSON.stringify([]));
//     }
// }

// function updateGreeting() {
//     console.log("Updating greeting...");
//     const greetElement = document.getElementById('greet');
//     const now = new Date();
//     const currentHour = now.getHours();

//     let greeting = '';
//     if (currentHour >= 5 && currentHour < 12) {
//         greeting = 'Good morning';
//     } else if (currentHour >= 12 && currentHour < 18) {
//         greeting = 'Hello';
//     } else {
//         greeting = 'Good evening';
//     }
//     greetElement.textContent = greeting;
// }



// function logout() {
//     console.log('Logout-Funktion wurde aufgerufen');
    
//     // Lösche den Benutzerstatus aus dem Local Storage
//     localStorage.removeItem('currentUser');
    
//     // Leite den Benutzer zur Login-Seite weiter
//     window.location.href = '../html/login.html';
// }