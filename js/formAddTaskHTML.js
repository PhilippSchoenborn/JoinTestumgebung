function titleHtml(){
    return `
    <div class="groupInput m-b-12">
    <input
      type="text"
      id="addTaskInputTitle"
      class="addTaskInputStandard required"
      placeholder="Enter a title"
    />
    <span id="requiredWarningTitle" class="requiredWarningAddTask"
      >This field is required</span
    >
  </div>
    `;
}

function descriptionHtml(){
    return `
    <div class="groupInput m-b-12">
    <label for="description" class="formLabel">Description (optional)</label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      class="textareaDescription"
      placeholder="Enter a Description"
    ></textarea>
  </div>
    `;
}

function dateHtml(){
    return `<div class="groupInput m-b-24">
    <label for="formDate" class="formLabel">Due date</label>
    <input
      type="date"
      name="formDate"
      id="formDate"
      class="addTaskInputStandard required"
    />
    <span id="requiredWarningDate" class="requiredWarningAddTask"
      >This field is required</span
    >
  </div>`;
}

function prioBtnHtml(){
    return `<div class="groupPrioBtn m-b-24">
    <label for="prioBtn" class="formLabel">Priority</label>
    <div class="prioBtnContainer">
      <button class="prioBtn" id="prioUrgent" data-value="Urgent" onclick="prioBtn('urgent')">
        Urgent
        <img
          id="prioUrgentIcon"
          src="../assets/img/formAddTask/prioBtnIcon/prioUrgent.png"
        />
      </button>
      <button class="prioBtn" data-value="Medium" id="prioMedium" onclick="prioBtn('medium')">
        Medium
        <img
          src="../assets/img/formAddTask/prioBtnIcon/prioMedium.png"
          id="prioMediumIcon"
        />
      </button>
      <button class="prioBtn" id="prioLow" data-value="Low" onclick="prioBtn('low')">
        Low
        <img
          src="../assets/img/formAddTask/prioBtnIcon/prioLow.png"
          id="prioLowIcon"
        />
      </button>
    </div>
  </div>`;
}
function assignedDropdownHtml(){
    return `<div class="groupInput m-b-24">
    <label for="contacts" class="formLabel">Assigned to</label>
    <div class="dropdownContact">
        <div class="inputIconWrap">
            <input
                type="text"
                class="addTaskInputStandard"
                placeholder="Select contacts to assign"
                id="inputContact"
                onclick="toggleContactDropdown(event)"
            />
            <img
                src="../assets/img/input/arrow_dropdown_down.png"
                class="dropdown-icon"
                id="dropdownIconContact"
                onclick="toggleContactDropdown(event)"
            />
        </div>
        <div class="contentContact" id="contentContact"></div>
    </div>
</div>`;
}
function categoryDropdownHtml(){
    return `<div class="groupInput m-b-24">
    <label for="category" class="formLabel">Category</label>
    <div class="inputIconWrap">
      <input
        type="text"
        placeholder="Select a category"
        class="addTaskInputStandard"
        id="inputCategory"
        readonly
      />
      <img
        src="../assets/img/input/arrow_dropdown_down.png"
        class="dropdown-icon"
        id="dropdownIconCategory"
      />
    </div>
  
    <div class="dropdownCategory" id="contentCategory">
      <span>Technical Task</span>
      <span>User Story</span>
    </div>
  </div>`;
}

function subtaskHtml(){
    return `<div class="groupInput m-b-24">
    <label for="subtask" class="formLabel"
      >Subtask (optional)</label
    >
    <div class="inputIconWrap" id="subtaskListContainer">
      <input
        type="text"
        placeholder="Add new subtask"
        class="addTaskInputStandard"
        id="inputSubtask"
        onclick="openSubtaskInput(event)"
      />
      <div class="subtaskIconContainer" id="subtaskIconContainer">
          <img
            src="../assets/img/input/subtaskAdd.png"
            class="suptaskIcon"
            id="subtaskIconAdd"
            onclick="openSubtaskInput(event)"
          />
          <div class="subtaskSecondIconsContainer" id="subtaskSecondIconsContainer">
              <img
                src="../assets/img/input/subtaskClose.png"
                class="suptaskIconSecond"
                id="subtaskIconDelete"
                onclick="clearSubtaskInputValue()"
              />
              <span class="seperator"></span>
              <img
                src="../assets/img/input/done.png"
                class="suptaskIconSecond"
                id="subtaskIconDone"
                onclick="addSubtaskToList()"
              />
          </div>
      </div>
    </div>
  
    <div id="subtaskList" class="subtaskList">
  
  </div>
  
  </div>`;
}

function cancelBtnHtml(){
    return `<button onmousedown="mousedownCancelTaskBtn()"
    onmouseup="mouseupCancelTaskBtn()" onmouseover="mouseoverCancelTaskBtn()" onmouseout="mouseoutCancelTaskBtn()"
        class="btn-cancel cancelTaskBtnPostion addTaskBtnPostion"
        id="cancel-task-btn"
      >
        Cancel<img
          id="cancel-task-btn-icon"
          src="../assets/img/buttonIcons/cancel-default-icon.svg"
          class="btn-icon"
        />
      </button>`;
}

function createTaskBtnHtml(){
    return `<button type="submit"
    class="btn-createTask createTaskBtnPostion addTaskBtnPostion "
    id="create-task-btn"
    onclick="saveTask()" onmousedown="mousedownCreatTaskBtn()" onmouseup="mouseupCreatTaskBtn()"
  >
    Create task<img
      id="create-task-btn-icon"
      src="../assets/img/buttonIcons/check.svg"
      class="btn-icon"
    />
  </button>`;
}

function okBtnHtml(){
    return `<button
    type="submit"
    class="btn-createTask createTaskBtnPostion addTaskBtnPostion"
    id="okTaskBtn"
    
    onmousedown="mousedownOkTaskBtn()"
    onmouseup="mouseupOkTaskBtn()"
  >
    Ok<img
      id="okTaskBtnIcon"
      src="../assets/img/buttonIcons/check.svg"
      class="btn-icon"
    />
  </button>`;
}

function closeFormHtml(){
    return `<div class="closeBtnTaskOverlay"><img class="taskOverlayCloseBtn" src="../assets/img/formAddTask/addTaskClose.png" onclick="closeOkCardOverlay()"></div>`;
}

