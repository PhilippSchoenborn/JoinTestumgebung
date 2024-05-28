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
    tasks.forEach(task => toDoContainer.innerHTML += taskCardHtml(task));
}

function taskCardCategoryBackgroundColor(task) {
    let categoryClass = 'task-card-category';
    let categoryStyle = task.category === 'Technical Task' ? 'style="background-color: #0038FF;"' : '';
    return { categoryClass, categoryStyle };
}

function collectProfileImage(selectAssigned) {
    return selectAssigned.map(contactProfileImageHtml).join('');
}

function closeTaskCardDetail() {
    const taskCardDetailBackground = document.getElementById('task-card-detail-background');
    if (taskCardDetailBackground) {
        taskCardDetailBackground.classList.add('slideToBottom');
        setTimeout(() => {
            taskCardDetailBackground.style.display = 'none';
            taskCardDetailBackground.classList.remove('slideToBottom');
        }, 100);
    }
}

function openTaskCardDetail(taskId) {
    const taskCardDetailBackground = document.getElementById('task-card-detail-background');
    let taskDetail = document.getElementById('task-detail');

    if (!taskCardDetailBackground) {
        console.error('Task card detail background not found');
        return;
    }

    // Ensure taskDetail element is present and clear it
    if (!taskDetail) {
        console.error('Task detail element not found, creating a new one');
        taskDetail = document.createElement('div');
        taskDetail.id = 'task-detail';
        taskCardDetailBackground.appendChild(taskDetail);
    } else {
        taskDetail.innerHTML = '';
    }

    const task = getTaskById(taskId);
    if (task) {
        const taskDetailHtml = taskCardDetailHtml(task);
        taskDetail.innerHTML = taskDetailHtml;
        taskCardDetailBackground.style.display = 'block';
    } else {
        console.error('Task not found');
    }
}

function getTaskById(taskId) {
    const task = tasks.find(task => task.id === taskId);
    return task ? {...task, assigned: task.assigned || []} : null;
}

function displayTaskCardEditAssigned(task) {
    let assignedImage = collectProfileImage(task.assigned);
    let assigned = document.getElementById('assigned');
    assigned.innerHTML = taskCardDetailAssignedItemHtml(assignedImage);
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
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        closeTaskCardDetail();
        saveTasks();
        updateBoardHtml();
    } else {
        console.error('Task not found:', taskId);
    }
}

function openTaskCardDetailEditForm(taskId) {
    const task = getTaskById(taskId);
    if (task) {
        document.getElementById('task-card-detail-background').innerHTML = taskCardDetailEditFormHtml(task);
        document.getElementById('task-card-detail-background').style.display = 'block';
    } else {
        console.error('Task not found:', taskId);
    }
}

function formEditShowDuoIconSubtaskInput(taskId) {    
    document.getElementById('subtask-icon-container-' + taskId).style.display = 'none';
    document.getElementById('subtask-duo-icon-container-' + taskId).style.display = 'flex';
}

function clearEditSubtaskInputValue(taskId) {
    document.getElementById('subtask-' + taskId).value = '';    
}

function addEditSubtaskItemToList(taskId) {
    let subtaskInput = document.getElementById('subtask-' + taskId);
    let subtask = subtaskInput.value;
    if (subtask) {
        document.getElementById('task-card-detail-subtask-' + taskId).innerHTML += subtaskItemHtml(subtask);
        subtaskInput.value = '';
        subtaskInput.readOnly = true;
    }    
}

function addSubtaskItemToList() {
    let subtask = document.getElementById('subtask').value;
    if (subtask) {
        document.getElementById('subtask-container').innerHTML += subtaskItemHtml(subtask);
        document.getElementById('subtask').value = '';
    }
}

function editSubtaskItemEditForm(taskId, subtaskId) {    
    let subtask = document.getElementById(`subtask-item-input-${taskId}-${subtaskId}`);
    if (subtask) {
        subtask.readOnly = false;  
        subtask.focus();           
    } else {
        console.error('Subtask input element not found with ID:', `subtask-item-input-${taskId}-${subtaskId}`);
    }
}

function showSubtaskEditTrashIcons(taskId, subtaskId) {
    document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskId}`).style.display = 'flex';
}

function hideSubtaskEditTrashIcons(taskId, subtaskId) {
    document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskId}`).style.display = 'none';
}

function deleteSubtaskItem(taskId, subtaskId) {
    let subtaskInput = document.getElementById(`subtask-item-input-${taskId}-${subtaskId}`);
    if (subtaskInput) {
        let subtaskItem = subtaskInput.closest('.subtask-item-li');
        if (subtaskItem) {
            subtaskItem.remove();
        } else {
            console.error('Subtask item not found!');
        }
    } else {
        console.error('Input element not found with ID:', `subtask-item-input-${taskId}-${subtaskId}`);
    }
}

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
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(taskCard => {
        const taskTitle = taskCard.querySelector('.task-card-title').textContent.toLowerCase();
        const taskDescription = taskCard.querySelector('.task-card-description').textContent.toLowerCase();
        taskCard.style.display = (taskTitle.includes(query.toLowerCase()) || taskDescription.includes(query.toLowerCase())) ? 'flex' : 'none';
    });
}

function deleteAllTasks() {
    tasks = [];
    saveTasks();
    updateBoardHtml();
}
