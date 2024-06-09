// Task Card Detail
function taskCardDetailHtml(task) {
  return `  
    <div class="task-card-detail-container">
      ${taskCardDetailCategoryHtml(task)}
      ${taskCardDetailTitleHtml(task)}
      ${taskCardDetailDescriptionHtml(task)}
      ${taskCardDetailDueDateHtml(task)}
      ${taskCardDetailPrioHtml(task)}
      ${taskCardDetailAssignedHtml(task)}
      ${taskCardDetailSubtaskHtml(task)}
      ${taskCardDetailBtnContainerHtml(task)}     
    </div>
  `;
}

function taskCardDetailAssignedHtml(task) {
  return `
    <div class="task-card-detail-column-wrapper">
      <span class="task-card-detail-label">Assigned to:</span>
      <div class="task-card-detail-assigned">
        ${task.profileHtml || ''}
      </div>
    </div>
  `;
}

function taskCardDetailAssignedItemHtml(assigned) {
  if (!Array.isArray(assigned)) {
    return '<div>No assigned people</div>';
  }
  return assigned.map(person => `<div>${person.name}</div>`).join('');
}

function getTaskById(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.assigned = task.assigned || [];
    task.prioValue = task.prioValue || ''; // Sicherstellen, dass prioValue vorhanden ist
    task.prioImage = task.prioImage || ''; // Sicherstellen, dass prioImage vorhanden ist
    return task;
  }
  return null; // oder ein leeres Objekt, falls keine Aufgabe gefunden wird
}

function taskCardDetailSubtaskHtml(task) {
  return `
    <div class="task-card-detail-column-wrapper">
      <span class="task-card-detail-label">Subtask:</span>
      <div id="task-card-detail-subtask">
        ${taskCardDeatailSubtaksItemHtml(task)}
      </div>
    </div>
  `;
}

function taskCardDeatailSubtaksItemHtml(task) {
  let subtaskItemsHtml = '';

  for (let i = 0; i < task.subtasks.length; i++) {
    let subtaskItem = task.subtasks[i];
    let subtaskItemHtml = `
      <label for="subtask-item-${i}" class="task-card-detail-subtask-item-label">
        <input type="checkbox" name="subtask-item-${i}" ${subtaskItem.completed ? 'checked' : ''} 
        onclick="toggleSubtask(${task.id}, ${i})" id="subtask-item-${i}">${subtaskItem.content}
      </label>
    `;
    subtaskItemsHtml += subtaskItemHtml;
  }

  return subtaskItemsHtml;
}

function taskCardDetailCategoryHtml(task) {
  const { categoryClass, categoryStyle } = taskCardCategoryBackgroundColor(task);

  return `
    <div class="task-card-detail-category">
      <span class="${categoryClass}" ${categoryStyle}>${task.category}</span>
      <img src="../assets/img/icons/form-add-task/close-blue-32.png" onclick="closeTaskCardDetail()">
    </div>
  `;
}


function taskCardDetailPrioHtml(task) {
  return `
      <div class="task-card-detail-wrapper">
          <span class="task-card-detail-label">Priority:</span>
          <span class="task-card-detail-value"><img src="${task.priority}" alt="Priority" /></span>
      </div>
  `;
}

function taskCardDetailDueDateHtml(task) {
  return `
    <div class="task-card-detail-wrapper">
      <span class="task-card-detail-label">Due Date:</span>
      <span class="task-card-detail-value">${task.dueDate}</span>
    </div>
  `;
}

function taskCardDetailDescriptionHtml(task) {
  return `
    <div class="task-card-detail-description">
      <span>${task.description || ''}</span>
    </div>
  `;
}

function taskCardDetailTitleHtml(task) {
  return `
    <div class="task-card-detail-title">
      <span>${task.title}</span>
    </div>
  `;
}

function taskCardDetailBtnContainerHtml(task) {
  return `
    <div class="task-card-detail-btn-container">
      <div class="task-card-detail-btn" onclick="taskCardDelete(${task.id})">
        <img src="../assets/img/icons/form-add-task/trash-blue.png"><span>Delete</span>
      </div>
      <span class="task-card-detail-seperator"></span>
      <div class="task-card-detail-btn" onclick="openTaskCardDetailEditForm(${task.id})">
        <img src="../assets/img/icons/form-add-task/edit-blue.png"><span>Edit</span>
      </div>
    </div>
  `;
}

// Task Card for Board
function taskCardHtml(task) {
  const { categoryClass, categoryStyle } = taskCardCategoryBackgroundColor(task);
  return `
      <div class="task-card ${task.status}" id="task-${task.id}" draggable="true" ondragstart="startDragging(event, ${task.id})" onclick="openTaskCardDetail(${task.id})">
          <span class="${categoryClass}" ${categoryStyle}>${task.category || ''}</span>
          <span class="task-card-title">${task.title}</span>
          <span class="task-card-description">${task.description || ''}</span>   
          ${taskCardSubtaskProcessbarHtml(task)}    
          <div class="task-card-assigned-prio-container">
              <div class="task-card-assigned">${task.profileHtml || ''}</div>
              <div class="task-card-prio"><img src="${task.priority}" alt="Priority" /></div>
          </div>
      </div>
  `;
}

// Task Card Detail Edit Form
function taskCardDetailEditFormHtml(task) {
  return `  
  <div class="dNone" id="openDetailedTask">
    <div class="task-card-detail-form-container">
      ${taskCardDetailEditFormCloseBtnHtml()} 
      <div class="task-card-detail-form">    
        ${taskCardDetailEditFormTitleHtml(task)}
        ${taskCardDetailEditFormDescriptionHtml(task)}
        ${taskCardDetailEditFormDueDateHtml(task)}
        ${taskCardDetailEditFormPrioHtml(task)} 
        ${taskCardDetailEditFormAssignedHtml(task)}
        ${taskCardDetailEditFormSubtaskHtml(task)}
      </div>
      ${taskCardDetailFormOkBtn(task)}     
    </div> 
  </div>   
  `;
}

function taskCardDetailEditFormCloseBtnHtml() {
  return `
    <div class="task-card-detail-category flex-end">    
      <img src="../assets/img/icons/form-add-task/close-blue-32.png" onclick="closeTaskCardDetail()">
    </div>
  `;
}

function taskCardDetailEditFormTitleHtml(task) {
  return `<label for="title-${task.id}" class="label-title label">
            <input class="detailedTaskTitle" type="text" placeholder="Enter a title" id="title-${task.id}" value="${task.title}"/>
          </label>`;
}

function taskCardDetailEditFormDescriptionHtml(task) {
  return `<label for="description" class="label-description">
            Description (optional)
            <textarea placeholder="Enter a description" id="description-${task.id}">${task.description}</textarea>
          </label>`;
}

function taskCardDetailEditFormDueDateHtml(task) {
  return `<label for="due-date-${task.id}" class="label-due-date label">
            <input type="date" placeholder="Due date" id="due-date-${task.id}" value="${task.dueDate}">
          </label>`;
}

function taskCardDetailEditFormPrioHtml(task) {
  let prioClassUrgent = task.prioClass === 'urgent' ? 'urgent' : '';
  let prioClassMedium = task.prioClass === 'medium' ? 'medium' : '';
  let prioClassLow = task.prioClass === 'low' ? 'low' : '';

  let prioImgUrgent = task.prioClass === 'urgent' ? '../assets/img/icons/prio-btn/urgent-white.png' : '../assets/img/icons/prio-btn/urgent.png';
  let prioImgMedium = task.prioClass === 'medium' ? '../assets/img/icons/prio-btn/medium-white.png' : '../assets/img/icons/prio-btn/medium.png';
  let prioImgLow = task.prioClass === 'low' ? '../assets/img/icons/prio-btn/low-white.png' : '../assets/img/icons/prio-btn/low.png';

  return `
      <label for="priority" class="label-prio">
          Priority
          <div class="prio-btn-container">
              <button class="prio-btn ${prioClassUrgent}" id="prio-btn-edit-form-urgent" data-value="Urgent" onclick="prioBtnEditFormData('Urgent')">
                  Urgent <img src="${prioImgUrgent}" id="prio-icon-urgent" alt="Priority" />
              </button>
              <button class="prio-btn ${prioClassMedium}" id="prio-btn-edit-form-medium" data-value="Medium" onclick="prioBtnEditFormData('Medium')">
                  Medium <img src="${prioImgMedium}" id="prio-icon-medium" alt="Priority" />
              </button>
              <button class="prio-btn ${prioClassLow}" id="prio-btn-edit-form-low" data-value="Low" onclick="prioBtnEditFormData('Low')">
                  Low <img src="${prioImgLow}" id="prio-icon-low" alt="Priority" />
              </button>
          </div>
      </label>`;
}

function taskCardDetailEditFormAssignedHtml(task) {
  return `
    <label for="assigned" class="label">
        Assigned To (optional)
       <div class="input-icon-container">
          <input class="placeholderFontSize" id="assigned-{task.id}" type="text" autocomplete="off" placeholder="Select contacts to assign" onclick="toggleContactDropdown(event, {task.id})"/>
          <img onclick="toggleContactDropdown(event, {task.id})" class="dropdown-icon" id="assigned-edit-form-dropdown-arrow-{task.id}" src="../assets/img/icons/form-add-task/arrow-dropdown-down.png"/>
       </div>
       <div class="custom-dropdown-assigned custom-dropdown" id="dropdown-edit-form-assigned-{task.id}"></div>
    </label>
    <div id="task-card-detail-profile-assigned">
        ${task.profileHtml || ''}
    </div>
  `;
}

function taskCardDetailEditFormSubtaskHtml(task) {
  return `<label for="subtask-${task.id}" class="label">
    Subtasks
    <div class="input-icon-container">
        <input class="placeholderFontSize" type="text" placeholder="Add new Subtask" id="subtask-${task.id}" onclick="changeIcon(event)"/>    
        <div class="subtaskIconContainer" id="subtask-icon-container-${task.id}">
            <img class="dropdown-icon" id="subtask-icon-plus-${task.id}" src="../assets/img/icons/form-add-task/plus-blue.png"/>
        </div>

        <div class="subtaskIconContainer hidden" id="subtask-duo-icon-container-${task.id}">
            <img class="dropdownIconClose" id="subtask-icon-close-${task.id}" onclick="clearEditSubtaskInputValue(${task.id})" src="../assets/img/icons/form-add-task/close-blue.png"/>
            <span class="task-card-detail-seperator" id="subtaskSeparator"></span>
            <img class="dropdownIconCheck" id="subtask-icon-check-${task.id}" onclick="addEditSubtaskItemToList(${task.id})" src="../assets/img/icons/form-add-task/check-blue.png"/>
        </div>
    </div>
</label>
<div class="subtask-container subtask-edit-container" id="task-card-detail-subtask-${task.id}">
    ${taskCardDetailEditFormSubtasksItemHtml(task)}
</div>`;
}

function taskCardDetailEditFormSubtasksItemHtml(task) {
  let subtaskItemsHtml = '';

  for (let i = 0; i < task.subtasks.length; i++) {
    let subtaskItem = task.subtasks[i];
    let subtaskItemHtml = `
      <li class="subtask-item-li" onmouseleave="hideSubtaskEditTrashIcons(${task.id}, ${i})" onmouseenter="showSubtaskEditTrashIcons(${task.id}, ${i})">
        <input class="subtask-item" type="text" id="subtask-item-input-${task.id}-${i}" readonly value="${subtaskItem.content}" />
        <div class="subtaskIconContainer subtask-item-edit-icon-container" id="subtask-duo-icon-container-${task.id}-${i}" style="display: none;">
          <img class="dropdownIcon" id="subtask-icon-edit-${task.id}-${i}" onclick="editSubtaskItemEditForm(${task.id}, ${i})" src="../assets/img/icons/form-add-task/edit-blue.png"/>
          <span class="taskCardDetailSeperator"></span>
          <img class="dropdownIcon subtask-icon-edit" id="subtask-icon-trash-${task.id}-${i}" onclick="deleteSubtaskItem(${task.id}, ${i})" src="../assets/img/icons/form-add-task/trash-blue.png"/>
        </div>
      </li>
    `;
    subtaskItemsHtml += subtaskItemHtml;
  }

  return subtaskItemsHtml;
}

function taskCardDetailFormOkBtn(task) {
  return `
    <div class="task-card-detail-btn-container">
      <button class="create-ok-btn" onclick="saveEditTask(${task.id})">
        Ok
        <img src="../assets/img/icons/btn/check-white.png"/>
      </button>
    </div>
  `;
}
