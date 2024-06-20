// function headerHml() {
//   return `
//         <img src="../assets/img/logo/join-logo-white.png" class="logo-header">
//             <div class="header-menu">
//                 <span class="header-project-name" onclick="showLogout()">Kanban Project Managment Tool</span>
//                 <a href="../html/help.html"><img class="help-icon" src="../assets/img/icons/header/help.png"></a>
//                 <div class="wrap-profile-icon" onclick="showLogout()">
//                     <div class="inner-profile-icon">
//                         <span id="profile-name">SM</span>
//                     </div>
//                 </div>
//             </div>
//             ${logoutHtml()}
//     `;
// }

// function asideMenu() {
//   return `
//                 <div class="menu-container" id="menu-container">
//                     <a href="../html/summary.html" id="summary-link" ><img src="../assets/img/icons/menu/summary.png"> Summary</a>
//                     <a href="../html/addTask.html" id="add-task-link"  ><img src="../assets/img/icons/menu/add-task.png"> Add Task</a>
//                     <a href="../html/board.html" id="board-link"  ><img src="../assets/img/icons/menu/board.png"> Board</a>
//                     <a href="../html/contact.html" id="contacts-link"  ><img src="../assets/img/icons/menu/contacts.png"> Contacts</a>
//                 </div> 

//                 <div class="policy-menu-container">
//                     <a href="../html/dataProtection.html">Privacy policy</a>
//                     <a href="../html/imprint.html">Legal notice</a>
//                 </div>
//     `;
// }

// function summaryHtml() {
//   return `                  
//             ${summaryDate()}        
//     `;
// }




function taskCardSubtaskProcessbarHtml(task) {
  let subtaskContentHtml  = '';
  if(task.subtasks && task.subtasks.length > 0) {
    let completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    const progressPercentage = (completedSubtasks / task.subtasks.length) * 100;    
  
  subtaskContentHtml = `
              <div class="task-card-subtaskbar">
                <div class="task-card-subtask-progressbar-background">
                    <div class="task-card-subtask-progressbar" style="width: ${progressPercentage}%;"></div>
                    </div>
                <div class="task-card-subtask-counter">${completedSubtasks}/${task.subtasks.length} Subtasks</div>
            </div>`;
  }
  return subtaskContentHtml;
}

function addContactHtml() {
  return `
    <div class="add-contact-container">
    <div class="add-contact-header">
      <img class="add-contact-close" src="../assets/img/icons/contact/close-white.png" onclick="closeAddContactForm()">
      <img class="contact-logo" src="../assets/img/logo/join-logo-white.png">
      <span class="contact-headline">Add contact</span>
      <span class="add-contact-text">Tasls are better with a team!</span>
    </div>
    <img class="add-contact-img" src="../assets/img/icons/contact/add-contact-img.png">
    <form class="add-contact-form" onsubmit="return false;">
      
      <label for="name" class="label">
        <input type="text" placeholder="Name" id="name" name="name">
        <img src="../assets/img/input-icons/person.png">            
      </label>
      <label for="email" class="label">
        <input type="email" placeholder="Email" id="email" name="email">
        <img src="../assets/img/input-icons/mail.png">            
      </label>
      <label for="phone" class="label">
        <input type="number" placeholder="Phone" id="phone" name="phone" required pattern="[0-9+]+"">
        <img src="../assets/img/input-icons/call.png">            
      </label>
      <div class="add-contact-btn-container">
        <button class="white-btn white-btn-contact">Cancel</button>
        <button class="blue-btn blue-btn-contact" onclick="addContact()">Create contact</button>
      </div>
    </form>
  </div>
    `;
}

function contactItemHtml(contact) {
  return `
        <div class="contact-item">
            <div class="contact-profile" style="background-color: ${contact.profileColor};">${contact.initialien}</div>
            <div class="contact-info">
              <span class="contact-name">${contact.name}</span>
              <span class="contact-email">${contact.email}</span>
            </div>
        </div>`;
}

function contactProfileImageHtml(contact) {
  return `
  <div class="profile-img" style="background-color: ${contact.profileColor};">${contact.initialien}</div>
  `;
}

function formDropdownAssignedItemHtml(contact, i, taskId, isSelected) {
  return `
      <label class="contact-item">
          <input type="checkbox" class="checkbox-assigned" id="contact-${i}-${taskId}" ${isSelected ? 'checked' : ''}/>
          <span class="assigned-name" data-value="${contact.name}">${contact.name}</span> 
      </label>
  `;
}

function formAddTask() {
  return `
    ${formAddTaskTitleHtml()}
    ${formAddTaskDescriptionHtml()}
    ${formAddTaskDateHtml()}
    ${formAddTaskPriorityHtml()}
    ${formAddTaskAssignedHtml()}
    ${formAddTaskCategoryHtml()}
    ${formAddTaskSubtaskHtml()}
  `;
}

function formAddTaskTitleHtml() {
  return `<label for="title" class="label-title label">
          <input type="text" placeholder="Enter a title" id="title"/>
          </label>`;
}

function formAddTaskDescriptionHtml() {
  return `<label for="description" class="label-description">
          Description (optional)
          <textarea placeholder="Enter a description" id="description" ></textarea>
          </label>`;
}

function formAddTaskDateHtml() {
  return `<label for="due-date" class="label-due-date label">
          <input type="date" placeholder="Due date" id="due-date"/>            
          </label>`;
}

function formAddTaskPriorityHtml() {
  return `
    <label for="priority" class="label-prio">
      Priority
        <div class="prio-btn-container">
          <button class="prio-btn" id="prio-btn-urgent" data-value="Urgent" onclick="prioBtnData('Urgent')">
          Urgent <img src="../assets/img/icons/prio-btn/urgent.png" id="prio-icon-urgent"/>
          </button>
          <button class="prio-btn" id="prio-btn-medium" data-value="Medium"   onclick="prioBtnData('Medium')">
          Medium <img src="../assets/img/icons/prio-btn/medium.png" id="prio-icon-medium"/  >
          </button>
          <button class="prio-btn" id="prio-btn-low" data-value="Low"   onclick="prioBtnData('Low')">
          Low <img src="../assets/img/icons/prio-btn/low.png" id="prio-icon-low"/>
          </button>
        </div>
    </label>`;
}

function formAddTaskAssignedHtml(taskId) {
  return `
      <label for="assigned-${taskId}" class="label">
        Assigned To (optional)
        <div class="input-icon-container">
        <input id="assigned-${taskId}" type="text"
        placeholder="Select contacts to assign"
        onclick="toggleAssignedDropdown(${taskId})"/>
        <img onclick="toggleAssignedDropdown(${taskId})"
        class="dropdown-icon" id="assigned-dropdown-arrow-${taskId}"
        src="../assets/img/icons/form-add-task/arrow-dropdown-down.png"/>
        </div>
      </label>
    <div class="custom-dropdown-assigned custom-dropdown" id="dropdown-assigned-${taskId}">
    </div>`;
}

function formAddTaskCategoryHtml() {
  return `<label for="category" class="label">
           Category
          <div class="input-icon-container">
            <input id="category"
            onclick="toggleCategoryDropdown()"
            type="text"
            placeholder="Select task category"
            readonly/><img
            class="dropdown-icon"
            id="category-dropdown-arrow"
            src="../assets/img/icons/form-add-task/arrow-dropdown-down.png"
            onclick="toggleCategoryDropdown()" />
          </div>
          </label>
      <div
        class="custom-dropdown-category custom-dropdown"
        id="dropdown-category">
          <span class="dropdown-item-category" onclick="selectCategory('Technical Task')">
              Technical Task
          </span>
          <span class="dropdown-item-category" onclick="selectCategory('User Story')">
          User Story
      </span>
      </div>`;
}

function formAddTaskSubtaskHtml() {

  return `<label for="subtask" class="label">
  Subtasks (optional)
  <div class="inputIconContainer">
    <input type="text" placeholder="Add new Subtask" id="subtask" onclick="formShowDuoIconSubtaskInput()" />

      <div class="subtask-icon-container" id="subtask-icon-container">
        <img
        class="dropdown-icon"
        id="subtask-icon-plus"
        src="../assets/img/icons/form-add-task/plus-blue.png"/>
      </div>

      <div class="subtask-icon-container dNone" id="subtask-duo-icon-container">
        <img class="dropdownIcon"
        id="subtask-icon-close" onclick="clearSubtaskInputValue()"
        src="../assets/img/icons/form-add-task/close-blue.png"/>
        <span class="taskCardDetailSeperator"></span>
        <img class="dropdownIcon"
        id="subtask-icon-check" onclick="addSubtaskItemToList()"
        src="../assets/img/icons/form-add-task/check-blue.png"/>
      </div>

  </div>
</label>
<div class="subtask-container" id="subtask-container"></div>`;
}

function subtaskItemHtml(subtask, subtaskId) {
  return `
  <li class="subtaskItemLi" onmouseleave="hideSubtaskEditFloation(${subtaskId})" onmouseenter="showSubtaskEditFloation(${subtaskId})">
    <span class="bullet">&#x2022; <input class="subtask-item" type="text" id="subtask-item-input-${subtaskId}" readonly value="${subtask}"/></span>
    

    <div class="editIconsSubtask" id="subtask-trash-edit-icon-container-${subtaskId}">
      <img class="dropdown-icon"
      id="add-task-subtask-icon-edit-${subtaskId}" onclick="editSubtaskItemEditForm(${subtaskId})"
      src="../assets/img/icons/form-add-task/edit-blue.png"/>
      <span class="taskCardDetailSeperator"></span>
      <img class="dropdown-icon subtask-icon-edit"
      id="add-task-subtask-icon-trash-${subtaskId}" onclick="deleteSubtaskItem(${subtaskId})"
      src="../assets/img/icons/form-add-task/trash-blue.png"/>
    </div>
  </li>`;
}

function succesSaveTaskHtml(){
  return `
    <div class="success-save-task" >
    <span class="success-save-task-text">Task added to board</span>
    <img src="../assets/img/icons/menu/board-white.png">      
    </div>
  `;
}

function logoutHtml(){
  return`
  <div class="logout-container" id="logout" style="display: none">
        <a class="help-link" href="../html/help.html">Help</a>
        <a href="../html/imprint.html">Legal Notice</a>
        <a href="../html/dataProtection.html">Privacy Policy</a>
        <a href="#">Log out</a>
      </div>
  `;
}

function mobileMenuHtml(){
  return `
  <a class="menu-link" id="summary-mobile-link" onclick="linkToSummary()" href="../html/summary.html">
  <img src="../assets/img/icons/menu/summary.png" />
  <span >Summary</span>
</a>
<a class="menu-link" id="board-mobile-link" href="../html/board.html">
  <img src="../assets/img/icons/menu/board.png" />
  <span>Board</span>
</a>
<a class="menu-link" id="add-task-mobile-link" onclick="linkToAddTask()" href="../html/add-task.html">
  <img src="../assets/img/icons/menu/add-task.png" />
<span>Add Task</span>
</a>

<a class="menu-link" id="contacts-mobile-link" onclick="linkToBoard()" href="../html/contacts.html">
  <img src="../assets/img/icons/menu/contacts.png" />
<span>Contacts</span>
</a>
  
  `;}