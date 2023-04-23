let addTaskInput = document.querySelector(".add-task__input");
let addButton = document.querySelector(".add-task__button");
let incompleteTaskHolder = document.querySelector(".todo__list");
let completedTasksHolder = document.querySelector(".completed-tasks__list");

let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  listItem.className = "list-item";

  label.innerText = taskString;
  label.className = "list-item__label";

  checkBox.type = "checkbox";
  checkBox.className = "list-item__checkbox input";

  editInput.type = "text";
  editInput.className = "list-ietm__input input";

  editButton.innerText = "Edit";
  editButton.className = "list-item__edit-button button";

  deleteButton.className = "list-item__delete-button button";

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "list-item__delete-img";

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

let addTask = function() {
  if (!addTaskInput.value) return;

  let listItem = createNewTaskElement(addTaskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  addTaskInput.value = "";
}

let editTask = function() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".list-ietm__input");
  let label = listItem.querySelector(".list-item__label");
  let editBtn = listItem.querySelector(".list-item__edit-button");
  let containsClass = listItem.classList.contains("list-item_edit-mode");

  //if class of the parent is .editmode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("list-item_edit-mode");
};

let deleteTask = function() {
  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  ul.removeChild(listItem);
}

let taskCompleted = function() {
  let listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
  let listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem); //when the checkbox is unchecked append task list item to incompleteTaskHolder
  bindTaskEvents(listItem, taskCompleted);
}

let ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".list-item__checkbox ");
  let editButton = taskListItem.querySelector(".list-item__edit-button");
  let deleteButton = taskListItem.querySelector(".list-item__delete-button");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}