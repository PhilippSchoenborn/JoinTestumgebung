let isItYou = false;

function renderContacts() {
  loadContacts();
  createContactList();
}



// Funktion zum Erstellen der Kontaktliste
function createContactList() {
  const contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';
  let addedLetters = {};

  for (let j = 0; j < alphabet.length; j++) {
    const letter = alphabet[j];
    let letterAdded = false;

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const initials = contact.initialien;
      const firstLetter = initials.charAt(0).toUpperCase();

      if (firstLetter === letter) {
        if (!letterAdded && !addedLetters[letter]) {
          const letterHeading = document.createElement('div');
          letterHeading.textContent = letter;
          letterHeading.classList.add('letter-heading');
          contactList.appendChild(letterHeading);
          letterAdded = true;
          addedLetters[letter] = true;  // Markiere den Buchstaben als hinzugefügt
        }

        const contactItem = document.createElement('div');
        contactItem.classList.add('contact');
        const profileColor = contact['profileColor'];
        const profilePicture = document.createElement('div');
        profilePicture.classList.add('profile-picture');
        profilePicture.style.backgroundColor = profileColor;
        profilePicture.textContent = initials;
        contactItem.appendChild(profilePicture);

        const contactDetails = document.createElement('div');
        contactDetails.classList.add('oneContact');
        contactDetails.innerHTML = `
                    <h2>${contact.name}</h2>
                    <p class="blueColor">${contact.email}</p>
                `;
        contactItem.appendChild(contactDetails);
        contactList.appendChild(contactItem);

        // Füge dem Kontakt und den Kontaktinformationen einen Click-Event-Listener hinzu
        contactItem.addEventListener('click', handleClick);
        function handleClick(event) {
          // Stelle sicher, dass nur das geklickte Element behandelt wird
          if (event.target === contactItem || event.target.parentElement === contactDetails) {
            // Rufe die Kontaktinformationen mit dem aktuellen Kontakt ab
            contactClickHandler(contact, i);
          }
        }
      }
    }
  }
}





// // Funktion zum Erstellen der Kontaktliste
// function createContactList() {
//   const contactList = document.getElementById('contact-list');
//   contactList.innerHTML = '';
//   let currentLetter = null;
//   for (let j = 0; j < alphabet.length; j++) {
//     const letter = alphabet[j];

//     for (let i = 0; i < contacts.length; i++) {
//       const contact = contacts[i];
//       const initials = contact.initialien;
//       const firstLetter = initials.charAt(0).toUpperCase();

//       if (firstLetter === letter) {
//         if (firstLetter !== currentLetter) {
//           currentLetter = firstLetter;
//           const letterHeading = document.createElement('div');
//           letterHeading.textContent = currentLetter;
//           letterHeading.classList.add('letter-heading');
//           contactList.appendChild(letterHeading);
//         }
//         const contactItem = document.createElement('div');
//         contactItem.classList.add('contact');
//         const profileColor = contact['profileColor'];
//         const profilePicture = document.createElement('div');
//         profilePicture.classList.add('profile-picture');
//         profilePicture.style.backgroundColor = profileColor;
//         profilePicture.textContent = initials;
//         contactItem.appendChild(profilePicture);

//         const contactDetails = document.createElement('div');
//         contactDetails.classList.add('oneContact');
//         contactDetails.innerHTML = `
//                     <h2>${contact.name}</h2>
//                     <p class="blueColor">${contact.email}</p>
//                 `;
//         contactItem.appendChild(contactDetails);
//         contactList.appendChild(contactItem);

//         // Füge dem Kontakt und den Kontaktinformationen einen Click-Event-Listener hinzu
//         contactItem.addEventListener('click', handleClick);
//         function handleClick(event) {
//           // Stelle sicher, dass nur das geklickte Element behandelt wird
//           if (event.target === contactItem || event.target.parentElement === contactDetails) {
//             // Rufe die Kontaktinformationen mit dem aktuellen Kontakt ab
//             contactClickHandler(contact, i);
//           }
//         }
//       }
//     }
//   }
// }


// Funktion, die beim Klicken auf den Kontakt oder Kontaktinformationen aufgerufen wird
function contactClickHandler(contact, i) {
  if (window.innerWidth < 1000) {
    editContactResponsive(contact, i);
  }
  else {
    let contactSection = document.getElementById('contacts');
    contactSection.innerHTML = '';
    contactSection.innerHTML = ` <div id="contactInfo">
    <div id="whiteCircle">
      <div id="initials" style="background-color: ${contact.profileColor}">
        <h1>${contact.initialien}</h1>
      </div>
    </div>
    <div id="nameAndEditButton">
      <h1>${contact.name}</h1>
      <div id="editDiv">
        <img id="edit" onclick="showeditContact(${i})" src="../assets/img/buttonIcons/edit_normal.png" alt="edit">
        <img id="delete" onclick="deleteContact(${i})" src="../assets/img/buttonIcons/delete_normal.png" alt="delete" > 
      </div>
    </div>
  </div>
  <div id="contactInformation">
    <h2>Contact Information</h2>
  </div>
  <div id="contactContent">
    <div id="emailBox">
      <h3>Email</h3>
      <a href="mailto:julia.sch@hotmail.de">${contact.email}</a>
    </div>
    <div id="phoneBox">
      <h3>Phone</h3>
      <p>${contact.phone}</p>
    </div>
  </div>`;
  }
}

function editContactResponsive(contact, i) {
  document.getElementById('content').classList.add('d-none');
  document.getElementById('contactsResponsive').classList.remove('d-none');
  let contactSection = document.getElementById('contactsResponsive');
  contactSection.innerHTML = '';
  contactSection.innerHTML = ` 
    <div id="contactInfoResponsive">
    <div id="contactInformation" >
    <h2>Contact Information</h2> <img onclick="backToContactResponsive()" id="backIconContactInfo" src="../assets/img/buttonIcons/arrow-left.svg">
  </div>
  <div id="contactInfoandProfilePic" >
    <div id="whiteCircle">
      <div id="initials" style="background-color: ${contact.profileColor}">
        <h1>${contact.initialien}</h1>
      </div>
    </div>
    <div id="nameAndEditButton">
      <h1>${contact.name}</h1>
    </div>
  </div>
  </div>
  <div id="contactContent">
    <div id="emailBox">
      <h3>Email</h3>
      <a href="mailto:julia.sch@hotmail.de">${contact.email}</a>
    </div>
    <div id="phoneBox">
      <h3>Phone</h3>
      <p>${contact.phone}</p>
    </div>
  </div>
  <div id="editResponsiveDiv" class="d-none" onclick="event.stopPropagation()">
  <img onclick="showeditContact(${i})" src="../assets/img/buttonIcons/edit_contacts.png">
  <img onclick="deleteContact(${i})" src="../assets/img/buttonIcons/delete_contact.png">
  </div>
  <div onclick="openEditResponsive(${i});event.stopPropagation()" id="editResponsive"><img src="../assets/img/buttonIcons/points.png" ></div>
  </div>`;
}

function openEditResponsive(i) {
  document.getElementById('editResponsiveDiv').classList.remove('d-none');
}

function closeEditResponsive() {
  document.getElementById('editResponsiveDiv').classList.add('d-none');
}

function backToContactResponsive() {
  document.getElementById('contactsResponsive').classList.add('d-none');
  document.getElementById('content').classList.remove('d-none');
}

function deleteContact(i) {
  contacts.splice(i, 1);
  save();
  renderContacts();
  document.getElementById('contacts').innerHTML = '';
  closeEditResponsive();
  backToContactResponsive();
}

// Hilfsfunktion zum Extrahieren des ersten Buchstabens des Vornamens und Nachnamens
function extractInitials(name) {
  const names = name.split(' ');
  let initials = '';
  for (let i = 0; i < names.length; i++) {
    initials += names[i].charAt(0).toUpperCase();
  }
  return initials;
}


function getNewContact() {
  let name = document.getElementById('fullName');
  let email = document.getElementById('emailAdress');
  let phone = document.getElementById('phoneNumber');
  if (name.value == '' || email.value == '' || phone.value == '') {
    document.getElementById('addNewContactAlert').innerHTML = '';
    document.getElementById('addNewContactAlert').innerHTML = '<p>the fields must be filled</p>';
  } else {
    const colorIndx = Math.floor(Math.random() * beautifulColors.length); // Zufälliger Index für Farbe
    const color = beautifulColors[colorIndx];
    const initial = extractInitials(name.value);
    const newContact = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      profileColor: color,
      initialien: initial,
    };
    contacts.push(newContact);
    save();
    loadContacts();
    contactClickHandler(newContact, contacts.length - 1);
    createContactList();
    name.value = '';
    email.value = '';
    phone.value = '';
    cancelAddContact();
    slideSuccessfullyContact();
  }
}


function slideSuccessfullyContact() {
  let container = document.getElementById('successfullyContainer');
  let successfully = document.getElementById('successfully');
  container.style.display = 'flex';
  successfully.classList.add('slide-in-bottom');
  setTimeout(() => {
    successfully.classList.remove('slide-in-bottom');
    container.style.display = 'none';

  }, 1000);
}

function save() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadContacts() {
  let storageAsText = localStorage.getItem("contacts");

  if (storageAsText) {
    contacts = JSON.parse(storageAsText);
  }
}


// Schließt die Box 'Add new Contact'
function cancelAddContact() {
  document.getElementById('addNewContact').classList.remove('addnewContactActive');
  document.getElementById('blurBackground').classList.add('d-none');
  document.getElementById('buttonActiveImg').classList.remove('buttonActiveImg');
  document.getElementById('addContactButton').classList.remove('buttonActive');
}

// Schließt die Box 'Edit Contact'
function cancelEditContact() {
  document.getElementById('editContact').classList.remove('editContactActive');
  document.getElementById('blurBackground').classList.add('d-none');s
}


function showeditContact(i) {
  const contact = contacts[i];
  let name = contact.name;
  isItYou = name.includes('(You)');
  let displayName = isItYou ? name.substr(0, name.length - 12) : name;
  
  const color = contact['profileColor'];
  
  document.getElementById('editSecondSectione').innerHTML = '';
  document.getElementById('editContact').classList.add('editContactActive');
  document.getElementById('blurBackground').classList.remove('d-none');
  document.getElementById('editSecondSectione').innerHTML = editContactHTML(i);
  document.getElementById('editName').value = displayName;
  document.getElementById('editEmail').value = contact.email;
  document.getElementById('editPhone').value = contact.phone;
  document.getElementById('initialsEditContact').style.backgroundColor = color;
  document.getElementById('initialsText').innerHTML = contact.initialien;
  closeEditResponsive();
}

// // Öffnet die Box 'Edit Contact'
// function showeditContact(i) {
//   const contact = contacts[i];
//   let name = contact.name;
//   if (name.includes('(You)')) {
//     let newName = contact.name.substr(0, contact.name.length - 12);
//     const color = contact['profileColor'];
//     isItYou = true;
//     document.getElementById('editSecondSectione').innerHTML = '';
//     document.getElementById('editContact').classList.add('editContactActive');
//     document.getElementById('blurBackground').classList.remove('d-none');
//     document.getElementById('editSecondSectione').innerHTML = editContactHTML(i);
//     document.getElementById('editName').value = `${newName}`;
//     document.getElementById('editEmail').value = `${contact.email}`;
//     document.getElementById('editPhone').value = `${contact.phone}`;
//     document.getElementById('initialsEditContact').style = `background-color: ${color};`;
//     document.getElementById('initialsText').innerHTML = `${contact.initialien}`;
//     closeEditResponsive();
//   } else {
//     const color = contact['profileColor'];
//     document.getElementById('editSecondSectione').innerHTML = '';
//     document.getElementById('editContact').classList.add('editContactActive');
//     document.getElementById('blurBackground').classList.remove('d-none');
//     document.getElementById('editSecondSectione').innerHTML = editContactHTML(i);
//     document.getElementById('editName').value = `${contact.name}`;
//     document.getElementById('editEmail').value = `${contact.email}`;
//     document.getElementById('editPhone').value = `${contact.phone}`;
//     document.getElementById('initialsEditContact').style = `background-color: ${color};`;
//     document.getElementById('initialsText').innerHTML = `${contact.initialien}`;
//     closeEditResponsive();
//   }
// }

function editContactHTML(i) {
  return `<div id="contactInput" class="contactInput">
    <div id="profilepicture">
      <div id="whiteCircle">
        <div id="initialsEditContact">
          <h1 id="initialsText"></h1>
        </div>
      </div>
    </div>
    <div id="inputDiv" onclick="writeContact(event.stopPropagation())">
      <div id="inputBox1" class="inputBox inputBox1"><input id="editName" required type="text" placeholder="Name"> <img
          src="../assets/img/addNewContact/person.png" alt=""></div>
      <div class="inputBox"><input type="text" id="editEmail" required placeholder="Email"> <img src="../assets/img/addNewContact/mail.png" alt=""></div>
      <div class="inputBox"><input type="number" id="editPhone"  pattern="[0-9+]" placeholder="Phone"> <img src="../assets/img/addNewContact/call.png" alt=""></div>
    </div>
    <div id="btnDiv">
      <button onclick="cancelEditContact();deleteContact(${i}) " id="cancelButtonContact">Delete</button>
      <button onclick="editContactToArray(${i})" id="safeButton">Safe <img src="../assets/img/addNewContact/check_whitepng.png"></button>
    </div>
  </div>`;
}


function editContactToArray(i) {
  let contact = contacts[i];
  let name = document.getElementById('editName');
  let email = document.getElementById('editEmail');
  let phone = document.getElementById('editPhone');
  const initial = extractInitials(name.value);

  let myName = isItYou ? name.value + ' (You)' : name.value;

  const newContact = {
      "name": myName,
      "email": email.value,
      "phone": phone.value,
      "profileColor": contact.profileColor,
      "initialien": initial
  };
  
  contacts.splice(i, 1, newContact);
  save();
  loadContacts();
  contactClickHandler(newContact, contacts.length);
  cancelEditContact();
  createContactList();
}

// function editContactToArray(i) {
//   let contact = contacts[i];
//   let name = document.getElementById('editName');
//   let email = document.getElementById('editEmail');
//   let phone = document.getElementById('editPhone');
//   const initial = extractInitials(name.value);
//   if (isItYou = true) {
//     let myName = name.value + '&nbsp; (You)';
//     const newContact = {
//       "name": myName,
//       "email": email.value,
//       "phone": phone.value,
//       "profileColor": contact.profileColor,
//       "initialien": initial
//     };
//     isItYou = false;
//     contacts.splice(i, 1, newContact);
//     save();
//     loadContacts();
//     contactClickHandler(newContact, contacts.length);
//     cancelEditContact();
//     createContactList();
//   } else {
//     const newContact = {
//       "name": name.value,
//       "email": email.value,
//       "phone": phone.value,
//       "profileColor": contact.profileColor,
//       "initialien": initial
//     };
//     contacts.splice(i, 1, newContact);
//     save();
//     loadContacts();
//     contactClickHandler(newContact, contacts.length);
//     cancelEditContact();
//     createContactList();
//   }

// }


// Öffnet die Box 'Add new Contact'
function showAddContact() {
  document.getElementById('addNewContactAlert').innerHTML = '';
  document.getElementById('addNewContact').classList.add('addnewContactActive');
  document.getElementById('blurBackground').classList.remove('d-none');
  document.getElementById('buttonActiveImg').classList.add('buttonActiveImg');
  document.getElementById('addContactButton').classList.add('buttonActive');
}

// fügt der InputBox den Effekt 'blaue Linie' hinzu
function writeContact(event) {
  document.getElementById('inputBox1').classList.add('blueborder');
}

// Entfernt der InputBox den Effekt 'blaue Linie' 
function StopPropergation() {
  document.getElementById('inputBox1').classList.remove('blueborder');
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadContacts();
  createContactList();
});