function closeAddTask() {
    let addTaskContainer = document.getElementById('floating-add-task-container');
    addTaskContainer.classList.add('slideToRight');

    setTimeout(() => {
        addTaskContainer.style.display = 'none';
        addTaskContainer.classList.remove('slideToRight');
    }, 100);
}

function openAddTask() {
    if (window.innerWidth <= 768) {
        window.location.href = '/html/add-task.html';
    } else {
        let addTaskContainer = document.getElementById('floating-add-task-container');
        document.getElementById('board-add-task').innerHTML = formAddTask();
        addTaskContainer.style.display = 'block';
    }
}

function displayTaskCard() {
    let toDoContainer = document.getElementById('to-do-container');

    toDoContainer.innerHTML = '';    

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        
        toDoContainer.innerHTML += taskCardHtml(task);
    }    
}

function taskCardCategoryBackgroundColor(task) {
    let categoryClass = '';
    let categoryStyle = '';
    if (task.category) {
        categoryClass = 'task-card-category'        
        categoryStyle = task.category === 'Technical Task' ? 'style="background-color: #0038FF;"' : '';
    }
    return { categoryClass, categoryStyle };
}

function collectProfileImage(selectAssigned) {
    let profilesImage = '';
    
    selectAssigned.forEach(contact => {
        profilesImage += contactProfileImageHtml(contact);
    });
    return profilesImage;
}

function closeTaskCardDetail() {
    let taskCardDetail = document.getElementById('task-card-detail-background');

    taskCardDetail.classList.add('slideToBottom');

    setTimeout(() => {
        taskCardDetail.style.display = 'none';
        taskCardDetail.classList.remove('slideToBottom');
    }, 100);

}

function openTaskCardDetail(taskId){
    let taskCardDetail = document.getElementById('task-card-detail-background');
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }
    closeAddTask();
    
    taskCardDetail.style.display = 'block';
    taskCardDetail.innerHTML = taskCardDetailHtml(task);
    
  }

  function displayTaskCardEditAssigned(task){

    for (let i = 0; i < contacts.length; i++) {        
        let assignedContacts = task.assigned;
        let assignedImage = collectProfileImage(assignedContacts);
        let assigned = document.getElementById('assigned');
        assigned.innerHTML += taskCardDetailAssignedItemHtml(assignedImage);
    }
  }

  function toggleSubtask(taskId, subtaskIndex) {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.subtasks[subtaskIndex]) {
        task.subtasks[subtaskIndex].completed = !task.subtasks[subtaskIndex].completed; 
        saveTasks();  
        updateBoardHtml(); 
    }
}

function taskCardDelete(taskId) {
    // Find the index of the task with the given taskId in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    // Check if the task is found
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);

        // Close the task card detail view
        closeTaskCardDetail();

        // Save the updated tasks array to persistent storage
        saveTasks();

        // Update the board HTML to reflect the changes
        updateBoardHtml();
    } else {
        // Log an error if the task is not found
        console.error('Task not found:', taskId);
    }
}

function openTaskCardDetailEditForm(taskId){
    let taskCardDetail = document.getElementById('task-card-detail-background');
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }
    taskCardDetail.style.display = 'block';
    taskCardDetail.innerHTML = taskCardDetailEditFormHtml(task);
}

function formEditShowDuoIconSubtaskInput(taskId) {    
    let icon = document.getElementById('subtask-icon-container-' + taskId);
    let duoIcon = document.getElementById('subtask-duo-icon-container-' + taskId);    
    if (taskId) {
        icon.style.display = 'none';
        duoIcon.style.display = 'flex';        
    }          
}

function showDuoIconSubtaskInput(taskId) {    
    let icon = document.getElementById('subtask-icon-container');
    let duoIcon = document.getElementById('subtask-duo-icon-container');    
    if (taskId) {
        icon.style.display = 'none';
        duoIcon.style.display = 'flex';        
    }          
}

function formEditHideDuoIconSubtaskInput(taskId) {
    let icon = document.getElementById('subtask-icon-container-' + taskId);
    let duoIcon = document.getElementById('subtask-duo-icon-container-' + taskId);     
    
        icon.style.display = 'flex';
        duoIcon.style.display = 'none';    
}

function clearEditSubtaskInputValue(taskId) {
    
    if (taskId) {
        document.getElementById('subtask-' + taskId).value = '';    
    }        
}

function addEditSubtaskItemToList(taskId) {
    let subtask = document.getElementById('subtask-' + taskId).value;
    let subtaskList = document.getElementById('task-card-detail-subtask-' + taskId);

    if (subtask) {
        subtaskList.innerHTML += subtaskItemHtml(subtask);
        document.getElementById('subtask-' + taskId).value = '';
        subtask.readOnly = true;        
    }    
}

function addSubtaskItemToList() {
    let subtask = document.getElementById('subtask').value;
    let subtaskList = document.getElementById('subtask-container');
    
        subtaskList.innerHTML += subtaskItemHtml(subtask);
        document.getElementById('subtask').value = '';   
    
}

function editSubtaskItemEditForm(taskId, subtaskId){    
    let elementId = taskId !== undefined && subtaskId !== undefined 
                    ? 'subtask-item-input-' + taskId + '-' + subtaskId 
                    : 'subtask-item-input';
    
    let subtask = document.getElementById(elementId);
    
    if (subtask) {
        subtask.readOnly = false;  
        subtask.focus();           
    } else {
        console.error('Subtask input element not found with ID:', elementId);
    }
}

function showSubtaskEditTrashIcons(taskId, subtaskId){
    let elementId = taskId !== undefined && subtaskId !== undefined 
                    ? 'subtask-duo-icon-container-' + taskId + '-' + subtaskId 
                    : 'subtask-trash-edit-icon-container';
    let subtask = document.getElementById(elementId);
    subtask.style.display = 'flex';
}

function hideSubtaskEditTrashIcons(taskId, subtaskId){
    let elementId = taskId !== undefined && subtaskId !== undefined 
                    ? 'subtask-duo-icon-container-' + taskId + '-' + subtaskId 
                    : 'subtask-trash-edit-icon-container';
    let subtask = document.getElementById(elementId);
    subtask.style.display = 'none';
}

function deleteSubtaskItem(taskId, subtaskId) {
    let elementId = taskId !== undefined && subtaskId !== undefined 
                    ? 'subtask-item-input-' + taskId + '-' + subtaskId 
                    : 'subtask-item-input';
    let subtaskInput = document.getElementById(elementId);

    if (subtaskInput) {
        let subtaskItem = subtaskInput.closest('.subtask-item-li');
        if (subtaskItem) {
            subtaskItem.remove();
        } else {
            console.error('Subtask item not found!');
        }
    } else {
        console.error('Input element not found with ID:', elementId);
    }
}

let currentTaskId = null;



function saveEditTask(currentTaskId) {
    let titleElement = document.getElementById('title-' + currentTaskId);
    let descriptionElement = document.getElementById('description-' + currentTaskId);
    let dueDateElement = document.getElementById('due-date-' + currentTaskId);

    let title = titleElement && titleElement.value ? titleElement.value : '';
    let description = descriptionElement && descriptionElement.value ? descriptionElement.value : '';
    let dueDate = dueDateElement && dueDateElement.value ? dueDateElement.value : '';

    
    let currentTask = tasks.find(t => t.id === currentTaskId);

    
    let category = currentTask.category;
    let priority = buttonData[0]?.dataValue || currentTask.priority;
    let prioImage = buttonData[0]?.originalImgSrc || currentTask.prioImage;
    let prioClass = buttonData[0]?.class || currentTask.prioClass;
    let assignedContacts = selectAssigned() || currentTask.assignedContacts;
    let assignedImage = collectProfileImage(assignedContacts) || currentTask.assignedImage;
    let subtasks = subtaskItemValue() || currentTask.subtasks;
    let status = currentTask.status;

    let task = {
        id: currentTaskId,
        category,
        title,
        description,
        dueDate,
        priority,
        prioImage,
        prioClass,
        assignedContacts,
        assignedImage,
        subtasks,
        status
    };

    let taskIndex = tasks.findIndex(t => t.id === currentTaskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = task;
    } else {
        tasks.push(task);
    }
    saveTasks();
    displaySucessMessage();
    loadTasks();
    closeTaskCardDetail();
    updateBoardHtml();
}

function searchTasks(query) {
    const tasksContainer = document.getElementById('board-task-container');
    const taskCards = tasksContainer.querySelectorAll('.task-card');

    taskCards.forEach(taskCard => {
        const taskTitle = taskCard.querySelector('.task-card-title').textContent.toLowerCase();
        const taskDescription = taskCard.querySelector('.task-card-description').textContent.toLowerCase();
        if (taskTitle.includes(query.toLowerCase()) || taskDescription.includes(query.toLowerCase())) {
            taskCard.style.display = 'flex';
        } else {
            taskCard.style.display = 'none'; 
        }
    });
}

function deleteAllTasks() {
    tasks = [];
    saveTasks();
    updateBoardHtml();
}