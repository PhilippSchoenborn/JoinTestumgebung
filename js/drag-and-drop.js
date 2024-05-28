let currentDraggedElement = null;
function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(event, taskId) {
    event.dataTransfer.setData('text/plain', taskId); // Legt die zu übertragende Daten (Task-ID) fest    
    currentDraggedElement = taskId; // Speichert die Task-ID des aktuell gezogenen Elements
}

async function moveTo(status) {
    console.log("Moving task with ID:", currentDraggedElement);
    const task = tasks.find(t => t.id === currentDraggedElement);
    if (task) {
        task.status = status;
        
        updateBoardHtml();
        saveTasks();        
        console.log("Task moved to:", status);
    } else {
        console.error('Task not found with ID:', currentDraggedElement);
    }
}

 function updateBoardHtml() {
    let openTasksHtml = '';
    let inProgressTasksHtml = '';
    let waitFeedbackTasksHtml = '';
    let closedTasksHtml = '';

    let openTasks = tasks.filter(task => task.status === 'open');
    let inProgressTasks = tasks.filter(task => task.status === 'inProgress');
    let waitFeedbackTasks = tasks.filter(task => task.status === 'feedback');
    let closedTasks = tasks.filter(task => task.status === 'done');

    // Generieren von HTML für die einzelnen Task-Status
    openTasks.forEach(task => {
        openTasksHtml += taskCardHtml(task);
    });
    inProgressTasks.forEach(task => {
        inProgressTasksHtml += taskCardHtml(task);
    });
    waitFeedbackTasks.forEach(task => {
        waitFeedbackTasksHtml += taskCardHtml(task);
    });
    closedTasks.forEach(task => {
        closedTasksHtml += taskCardHtml(task);
    });

    // Zuweisen des generierten HTMLs zu den entsprechenden Containern, sofern diese existieren
    if (document.getElementById('to-do-container')) {
        document.getElementById('to-do-container').innerHTML = openTasksHtml || '<div class="no-task-card">No task Done</div>';
    }
    if (document.getElementById('in-progress-container')) {
        document.getElementById('in-progress-container').innerHTML = inProgressTasksHtml || '';
    }
    if (document.getElementById('feedback-container')) {
        document.getElementById('feedback-container').innerHTML = waitFeedbackTasksHtml || '';
    }
    if (document.getElementById('done-container')) {
        document.getElementById('done-container').innerHTML = closedTasksHtml || '<div class="no-task-card">No tasks done</div>';
    }

    
}