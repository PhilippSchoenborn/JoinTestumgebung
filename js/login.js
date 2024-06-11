users = [];

async function loginInit() {
    await includeHTML();
    loadUsers();
    startAnimation();
}

// let currentUserName = localStorage.getItem('currentUser');

// Funktion, um den aktuellen Benutzernamen aus dem Local Storage zu laden und in das Element mit der ID "name" einzufügen
function updateUserName() {
    // Laden des aktuellen Benutzernamens aus dem Local Storage
    const currentUserString = localStorage.getItem('currentUser');

    // Überprüfen, ob der aktuelle Benutzer vorhanden ist
    if (currentUserString) {
        // Entfernen Sie die Anführungszeichen aus dem Benutzernamen und führen Sie eine Trim-Operation durch, um Leerzeichen zu entfernen
        const currentUser = currentUserString.replace(/"/g, '').trim();

        // Das Element mit der ID "name" suchen und den aktuellen Benutzernamen einfügen
        const nameElement = document.getElementById('name');

        // Überprüfen, ob der Benutzer "Guest" ist
        if (currentUser.toLowerCase() !== 'guest') {
            // Wenn der Benutzer nicht "Guest" ist, fügen Sie den Benutzernamen ein
            nameElement.innerHTML = currentUser;
        }
    } else {
        console.error('Aktueller Benutzer nicht gefunden.');
    }

    // Nachdem der Benutzername aktualisiert wurde, rufen Sie die Funktion auf, um den Gruß zu aktualisieren
    setGreeting();
}


function updateProfileName() {
    // Laden des aktuellen Benutzernamens aus dem Local Storage
    const currentUserString = localStorage.getItem('currentUser');

    // Überprüfen, ob der aktuelle Benutzer vorhanden ist
    if (currentUserString) {
        // Entfernen Sie die Anführungszeichen aus dem Benutzernamen und führen Sie eine Trim-Operation durch, um Leerzeichen zu entfernen
        const currentUser = currentUserString.replace(/"/g, '').trim();

        // Das Element mit der ID "profile-name" suchen
        const profileNameElement = document.getElementById('profile-name');

        // Überprüfen, ob das Element existiert
        if (!profileNameElement) {
            console.error('Element mit der ID "profile-name" nicht gefunden.');
            return; // Beende die Funktion, wenn das Element nicht existiert
        }

        // Überprüfen, ob der Benutzername "Guest" ist
        if (currentUser.toLowerCase() === 'guest') {
            // Wenn der Benutzername "Guest" ist, setzen Sie das Element mit der ID "profile-name" auf "G"
            profileNameElement.textContent = "G";
        } else {
            // Wenn der Benutzername nicht "Guest" ist, führen Sie die übliche Initialen-Extraktion durch
            // Versuchen Sie, den Benutzernamen zu splitten, um Vor- und Nachnamen zu erhalten
            const nameParts = currentUser.split(' ');
            if (nameParts.length >= 2) {
                // Extrahieren Sie Vor- und Nachnamen
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' '); // Nachname kann aus mehreren Teilen bestehen

                // Extrahieren Sie die Initialen und setzen Sie sie in Großbuchstaben um
                const firstNameInitial = firstName.charAt(0).toUpperCase();
                const lastNameInitial = lastName.charAt(0).toUpperCase();

                // Kombinieren Sie die Initialen, um den vollständigen Namen zu erhalten
                const fullNameInitials = firstNameInitial + lastNameInitial;

                // Das Element mit der ID "profile-name" und die Initialen einfügen
                profileNameElement.textContent = fullNameInitials;
            } else {
                // Wenn Vor- oder Nachname fehlen, setzen Sie einen Standardwert für die Initialen
                const fullNameInitials = "G"; // Zum Beispiel "XX" für "Unbekannt"

                // Das Element mit der ID "profile-name" und die Initialen einfügen
                profileNameElement.textContent = fullNameInitials;
            }
        }

        // Prüfen, ob der Benutzer eingeloggt ist, und das Komma entsprechend setzen
        const greetElement = document.getElementById('greet');
        if (greetElement && currentUser.toLowerCase() !== 'guest') {
            greetElement.innerHTML = greetElement.innerHTML + ', '; // Komma setzen
        }
    } else {
        console.error('Aktueller Benutzer nicht gefunden.');
    }
}

function loginGuestAndRedirect() {
    // Gastnamen im Local Storage speichern
    localStorage.setItem('currentUser', "Guest");

    // Die Begrüßung auf der Homepage aktualisieren, ohne den Gästenamen einzuschließen
    console.log("Updating greeting...");
    updateGreeting();

    // Weiterleitung auf die Seite /html/summary.html
    console.log("Redirecting to summary.html...");
    window.location.href = '../html/summary.html';

    // Erstellen eines leeren Arrays für den Gast, falls nicht vorhanden
    if (!localStorage.getItem('guestTasks')) {
        localStorage.setItem('guestTasks', JSON.stringify([]));
    }
}

// function takeUserContact() {
//     contacts = 0;
//     let name = localStorage.getItem('currentUser');
//     let email = localStorage.getItem('currentEmail');
//     let colorIndx = Math.floor(Math.random() * beautifulColors.length); // Zufälliger Index für Farbe
//     let color = beautifulColors[colorIndx];
//     // let initial = extractInitials(name);
//     let contactLength = contacts.length;
//     contacts.push({
//         name: name,
//         email: email,
//         profileColor: color,
//         // initialien: initial,

//     })
//     let contactsLength = contactLength;
//     saveContacs();
// }

function updateGreeting() {
    console.log("Updating greeting...");
    const greetElement = document.getElementById('greet');
    const now = new Date();
    const currentHour = now.getHours();

    let greeting = '';
    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Hello';
    } else {
        greeting = 'Good evening';
    }
    greetElement.textContent = greeting;
}

console.log("Script loaded.");


function logout() {
    console.log('Logout-Funktion wurde aufgerufen');

    // Lösche den Benutzerstatus aus dem Local Storage
    localStorage.removeItem('currentUser');

    // Leite den Benutzer zur Login-Seite weiter
    window.location.href = '../html/login.html';

}

function startAnimation() {
    let container = document.querySelector(".animationContainer");
    let logo = document.querySelector(".animationLogo");
    let headerLogo = document.querySelector(".logo");
    container.style.backgroundColor = "#4589ff";
    setTimeout(() => {
        container.style.backgroundColor = "transparent";
        document.getElementById("logoImage").src = "../assets/img/login/animation/animationLogoBlue.svg";
        headerLogo.style.display = "none";
        logo.style.top = "0";
        logo.style.left = "0";
        logo.style.transform = "translate(-5%, -10%) scale(0.30)";
        logo.addEventListener("transitionend", function animationEnd() {
            logo.removeEventListener("transitionend", animationEnd);
            headerLogo.style.display = "block";
            container.style.display = "none";
        });
    }, 500);
}


async function loadUsers() {
    try {
        console.log('Versuche, Benutzerdaten zu laden...');
        users = JSON.parse(await getItem('users'));
        console.log('Benutzerdaten erfolgreich geladen:', users); // Protokollierung hinzugefügt
    } catch (e) {
        console.warn('Fehler beim Laden der Benutzerdaten:', e);
    }
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('customCheckbox').checked = '';
}

async function register() {
    console.log('Register-Funktion wird aufgerufen...');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const isTermsAcceptedElement = document.getElementById('signUpCheckbox');

    console.log('Abruf der Eingabewerte:', name, email, password, confirmPassword);

    hideWarningMessage("pwWarningContainer");
    hideWarningMessage("termsWarning");

    if (!isTermsAcceptedElement) {
        console.error('Checkbox-Element nicht gefunden');
        return false;
    }

    const isTermsAccepted = isTermsAcceptedElement.checked;

    if (password !== confirmPassword) {
        console.log('Passwörter stimmen nicht überein');
        showWarningMessage("Die Passwörter stimmen nicht überein.", "pwWarningContainer");
        return false;
    } else {
        console.log('Passwörter stimmen überein');
        hideWarningMessage("pwWarningContainer");
    }

    if (password.length < 8) {
        console.log('Passwort zu kurz');
        showWarningMessage("Das Passwort muss mindestens 8 Zeichen lang sein.", "pwWarningContainer");
        return false;
    }

    if (!/\d/.test(password)) {
        console.log('Passwort enthält keine Zahl');
        showWarningMessage("Das Passwort muss mindestens eine Zahl enthalten.", "pwWarningContainer");
        return false;
    }

    if (!isTermsAccepted) {
        console.log('Nutzungsbedingungen nicht akzeptiert');
        showWarningMessage("Sie müssen die Nutzungsbedingungen akzeptieren.", "termsWarning");
        return false;
    } else {
        console.log('Nutzungsbedingungen akzeptiert');
        hideWarningMessage("termsWarning");
    }

    try {
        console.log('Laden der Benutzerdaten...');
        await loadUsers();

        users.push({
            name: name,
            email: email,
            password: password
        });

        await setItem('users', JSON.stringify(users));

        // Neuen Kontakt hinzufügen und auf dem Server speichern
        await addNewContact(name, email);

        // Aktualisiere die Kontaktliste nach dem Hinzufügen des neuen Kontakts
        await loadContacts();
        // createContactList();

        slideSuccessfully();
    } catch (e) {
        console.error('Fehler beim Laden der Benutzerdaten:', e);
        alert("Fehler beim Laden der Benutzerdaten.");
        return false;
    }

    resetForm();
    return false;
}


async function addNewContact(name, email) {
    let youName = name + '&nbsp; (You)';
    const colorIndex = Math.floor(Math.random() * beautifulColors.length); // Zufälliger Index für Farbe
    const color = beautifulColors[colorIndex];
    const initial = extractInitials(name); // Annahme: extractInitials ist bereits implementiert
    const newContact = {
        name: youName,
        email: email,
        phone: '', // Da wir keine Telefonnummer während der Registrierung erhalten
        profileColor: color,
        initialien: initial,
    };

    contacts.push(newContact);
    saveContacts();
    console.log('Neuer Kontakt hinzugefügt:', newContact);
}


function showWarningMessage(message, targetElementId) {
    const warningContainer = document.getElementById(targetElementId);
    if (warningContainer) {
        warningContainer.style.display = 'block';
        warningContainer.textContent = message;
        console.log(`Warnmeldung angezeigt: ${message}`);
    } else {
        console.error(`Element mit der ID "${targetElementId}" nicht gefunden.`);
    }
}

async function saveContacts() {
    try {
        const response = await setItem('contacts', JSON.stringify(contacts));
        if (!response || response.error) {
            throw new Error('Failed to save contacts: ' + (response ? response.error : 'No response'));
        }
    } catch (error) {
        console.error('Error saving contacts:', error);
    }
}

function hideWarningMessage(targetElementId) {
    const warningContainer = document.getElementById(targetElementId);
    if (warningContainer) {
        warningContainer.style.display = 'none';
        warningContainer.textContent = '';
        console.log(`Warnmeldung ausgeblendet: ${targetElementId}`);
    } else {
        console.error(`Element mit der ID "${targetElementId}" nicht gefunden.`);
    }
}

async function getCurrentUser(email, password) {
    try {
        await loadUsers(); // Lade Benutzer aus dem lokalen Speicher
        const user = users.find(u => u.email === email && u.password === password);
        return user; // Gib den gefundenen Benutzer zurück (oder null, wenn nicht gefunden)
    } catch (error) {
        console.error('Fehler beim Laden der Benutzer:', error);
        return null; // Gib null zurück, wenn ein Fehler aufgetreten ist
    }
}

function checkFormFields() {
    const isTermsAccepted = document.getElementById('customCheckbox');
    const registerBtn = document.getElementById('registerBtn');

    // Überprüfen, ob alle Felder ausgefüllt sind und die Checkbox markiert ist
    if (isTermsAccepted = isTermsAccepted.checked) {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
}

function slideSuccessfully() {
    let container = document.getElementById('successfullyContainer');
    let successfully = document.getElementById('successfully');

    // Stellen Sie sicher, dass der Container sichtbar ist, um die Animation zu zeigen
    container.style.display = 'flex';

    // Fügen Sie die Klasse für die Animation hinzu
    successfully.classList.add('slide-in-bottom');

    // Setzen Sie eine Verzögerung, um der Animation Zeit zum Abspielen zu geben
    setTimeout(() => {
        // Entfernen Sie die Animation, nachdem sie abgespielt wurde
        successfully.classList.remove('slide-in-bottom');

        // Verstecken Sie den Container wieder
        container.style.display = 'none';

        // Wechseln Sie die Seite nach der Animation
        window.location.href = '../html/login.html';
    }, 2000); // Warten Sie z.B. 1000 Millisekunden (1 Sekunde)
}

function pwWarningHTML() {
    return `<span id="signUpWarning"
    >The password must be at least 8 characters long and must contain a number.</span>`
}

function closeWarning() {
    document.getElementById('pwWarningContainer').style.display = 'none';
}

// let loggedInUsers = []; // Array zum Speichern der eingeloggten Benutzer



async function login() {
    console.log('Login button clicked.');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Attempting to login with email:', email);
    console.log('Attempting to login with password:', password);

    // Laden der Benutzerdaten
    await loadUsers();
    console.log('Users loaded:', users);

    // Überprüfen, ob das users-Array erfolgreich geladen wurde
    if (users) {
        // Finden des Benutzers anhand der E-Mail-Adresse
        const user = users.find(u => u.email === email);
        console.log('User found:', user);

        if (user) {
            // Überprüfen, ob das eingegebene Passwort mit dem gespeicherten Passwort übereinstimmt
            if (user.password === password) {
                console.log('Eingeloggt:', user.name);
                // Hier wird der Benutzer erfolgreich eingeloggt

                // Speichern des aktuellen Benutzerdaten im Local Storage
                localStorage.setItem('currentUser', user.name);
                localStorage.setItem('currentEmail', user.email);
                // takeUserContact();
                window.location.href = '../html/summary.html';
            } else {
                console.log('Ungültiges Passwort.');
                // Hier wird die Fehlermeldung angezeigt
                showErrorMessage("Die E-Mail oder das Passwort stimmen nicht überein.");
            }
        } else {
            console.log('Benutzer mit dieser E-Mail-Adresse wurde nicht gefunden.');
            // Hier wird die Fehlermeldung angezeigt
            showErrorMessage("Die E-Mail oder das Passwort stimmen nicht überein.");
        }
    } else {
        console.error('Benutzerdaten wurden nicht erfolgreich geladen.');
        // Hier wird die Fehlermeldung angezeigt
        showErrorMessage("Benutzerdaten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    }
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('errorMessagePassword');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block'; // Element immer anzeigen
    } else {
        console.error('Element mit der ID "errorMessagePassword" nicht gefunden.');
    }
}