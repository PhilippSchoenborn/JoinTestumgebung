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
    console.log("Closing task card detail...");
    if (detailViewOpen) {
        const taskCardDetailBackground = document.getElementById('task-card-detail-background');
        const openDetailedTask = document.getElementById('openDetailedTask');
        if (openDetailedTask) {
            openDetailedTask.classList.add('dNone');
        } else {
            console.error('Element with ID "openDetailedTask" not found');
        }
        if (taskCardDetailBackground) {
            taskCardDetailBackground.classList.add('slideToBottom');
            setTimeout(() => {
                taskCardDetailBackground.style.display = 'none';
                taskCardDetailBackground.classList.remove('slideToBottom');
                detailViewOpen = false;
                console.log("Task card detail closed.");
                
                const taskDetail = document.getElementById('task-detail');
                if (taskDetail) {
                    console.log("Task detail element found, removing...");
                    taskDetail.remove();
                } else {
                    console.log("Task detail element not found.");
                }
            }, 100);
        } else {
            console.error('Element with ID "task-card-detail-background" not found');
        }
    } else {
        console.log("DetailView is already closed, skipping...");
    }
}



// Initialisierung des Detailelements beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    const taskCardDetailBackground = document.getElementById('task-card-detail-background');
    if (!taskCardDetailBackground) {
        console.error('Task card detail background not found');
    } else {
        const taskDetail = document.getElementById('task-detail');
        if (!taskDetail) {
            console.error('Task detail element not found, creating a new one');
            const newTaskDetail = document.createElement('div');
            newTaskDetail.id = 'task-detail';
            taskCardDetailBackground.appendChild(newTaskDetail);
        }
    }
});

// Entfernen des Detailelements bei Bedarf
function removeTaskDetailElement() {
    const taskDetail = document.getElementById('task-detail');
    if (taskDetail) {
        taskDetail.remove();
    }
}

let detailViewOpen = false;

function openTaskCardDetail(taskId) {
    console.log("Opening task card detail for taskId:", taskId); // Neues Log hinzugefügt
    console.log("DetailView is currently:", detailViewOpen);
    console.log("Tasks:", tasks);

    const taskCardDetailBackground = document.getElementById('task-card-detail-background');
    let taskDetail = document.getElementById('task-detail');
    

    if (!detailViewOpen || taskDetail.dataset.taskId !== taskId) {
        console.log("DetailView is not open or different task is clicked, opening...");
        // Öffne die Detailansicht nur, wenn sie nicht bereits geöffnet ist oder wenn ein anderer Task geklickt wurde
        detailViewOpen = true;

        if (!taskCardDetailBackground) {
            console.error('Task card detail background not found');
            return;
        }

        console.log("Task card detail background found");

        // Überprüfen, ob das Task-Detail-Element bereits vorhanden ist
        if (!taskDetail) {
            // Wenn nicht, erstellen Sie das Element
            console.error('Task detail element not found, creating a new one');
            taskDetail = document.createElement('div');
            taskDetail.id = 'task-detail';
            taskCardDetailBackground.appendChild(taskDetail);
        } else {
            // Wenn bereits vorhanden, setzen Sie nur den Inhalt zurück
            taskDetail.innerHTML = '';
        }

        console.log("Task detail element found or created");

        const task = getTaskById(taskId);
        if (task) {
            console.log("Task found:", task);
            const taskDetailHtml = taskCardDetailHtml(task);
            taskDetail.innerHTML = taskDetailHtml;
            taskDetail.dataset.taskId = taskId; // Speichere die taskId im taskDetail-Dataset
            taskCardDetailBackground.style.display = 'block';
        } else {
            console.error('Task not found');
        }
    } else {
        console.log("DetailView is already open for the same task, skipping...");
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
        document.getElementById('openDetailedTask').classList.remove('dNone');
    } else {
        console.error('Task not found:', taskId);
    }
}

function formEditShowDuoIconSubtaskInput(taskId) {    
    document.getElementById('subtask-icon-container-' + taskId).classList.add('hide');
    document.getElementById('subtask-duo-icon-container-' + taskId).classList.add('show');
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

function showSubtaskEditTrashIcons(taskId, subtaskIndex) {
    console.log(`showSubtaskEditTrashIcons called for taskId: ${taskId}, subtaskIndex: ${subtaskIndex}`);
    const iconContainer = document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskIndex}`);
    if (iconContainer) {
        iconContainer.style.display = 'flex';
    }
}

function hideSubtaskEditTrashIcons(taskId, subtaskIndex) {
    console.log(`hideSubtaskEditTrashIcons called for taskId: ${taskId}, subtaskIndex: ${subtaskIndex}`);
    const iconContainer = document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskIndex}`);
    if (iconContainer) {
        iconContainer.style.display = 'none';
    }
}

function showSubtaskEditTrashIcons(taskId, subtaskIndex) {
    console.log(`showSubtaskEditTrashIcons called for taskId: ${taskId}, subtaskIndex: ${subtaskIndex}`);
    const iconContainer = document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskIndex}`);
    if (iconContainer) {
        iconContainer.style.display = 'flex';
    }
}

function hideSubtaskEditTrashIcons(taskId, subtaskIndex) {
    console.log(`hideSubtaskEditTrashIcons called for taskId: ${taskId}, subtaskIndex: ${subtaskIndex}`);
    const iconContainer = document.getElementById(`subtask-duo-icon-container-${taskId}-${subtaskIndex}`);
    if (iconContainer) {
        iconContainer.style.display = 'none';
    }
}

// const subtasks = ['Subtask 1', 'Subtask 2', 'Subtask 3'];

// function renderSubtasks(subtasks) {
//   const subtaskList = document.getElementById('subtask-list');
// //   subtaskList.innerHTML = ''; // Clear existing subtasks

//   subtasks.forEach((subtask, index) => {
//     subtaskList.innerHTML += subtaskItemHtml(subtask, index);
//   });
// }

// renderSubtasks(subtasks);

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

async function saveEditTask(taskId) {
    let task = getTaskById(taskId);
    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }

    // Aktualisiere die task-Daten mit den Eingabewerten aus dem Formular
    task.title = document.getElementById(`title-${taskId}`).value;
    task.description = document.getElementById(`description-${taskId}`).value;
    task.dueDate = document.getElementById(`due-date-${taskId}`).value;
    task.prioClass = getSelectedPrioClass();
    
    if (task.prioClass && buttons[task.prioClass]) {
        task.priority = buttons[task.prioClass].defaultIcon;
    }

    task.assigned = getAssignedContacts();

    // Protokolliere die aktuellen task-Daten
    console.log('Updated Task:', task);
  
    // Aktualisiere die globale Aufgabenliste
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = task;
    } else {
        tasks.push(task);
    }

    // Speichere die aktualisierte Aufgabenliste
    await saveTasks();
    console.log('Task list saved successfully!');
  
    // Aktualisiere die Task-Karte und Detail-Ansicht
    updateTaskCard(taskId);
    updateTaskCardDetail(taskId);
    closeTaskCardDetail();
}

  

function getSelectedPrioClass() {
    if (document.querySelector('#prio-btn-edit-form-urgent').classList.contains('urgent')) return 'urgent';
    if (document.querySelector('#prio-btn-edit-form-medium').classList.contains('medium')) return 'medium';
    if (document.querySelector('#prio-btn-edit-form-low').classList.contains('low')) return 'low';
    return '';
}

function getAssignedContacts() {
    let assigned = [];
    document.querySelectorAll('.assigned-contact').forEach(contact => {
        assigned.push({ 
            name: contact.textContent, 
            profileColor: contact.style.backgroundColor, 
            initialien: contact.dataset.initialien 
        });
    });
    return assigned;
}

function updateTaskCard(taskId) {
    const task = getTaskById(taskId);
    const taskCard = document.getElementById(`task-${taskId}`);
    if (!taskCard || !task) return;

    taskCard.querySelector('.task-card-title').textContent = task.title;
    taskCard.querySelector('.task-card-description').textContent = task.description;
    taskCard.querySelector('.task-card-prio img').src = task.priority;
    taskCard.querySelector('.task-card-assigned').innerHTML = task.assigned.map(contactProfileImageHtml).join('');
}

function updateTaskCardDetail(taskId) {
    const task = getTaskById(taskId);
    const taskDetailContainer = document.querySelector('.task-card-detail-container');
    if (!taskDetailContainer || !task) return;

    taskDetailContainer.innerHTML = taskCardDetailHtml(task);
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

