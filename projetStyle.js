// Header style
document.getElementById("header").style.backgroundColor = "SaddleBrown";
var Title = document.getElementById("header")
var title = document.createElement("h1");
title.textContent = "TODO-List in JavaScript";
Title.appendChild(title);

// Input add button style
document.getElementsByClassName("submit")[0].setAttribute("style", "background-color: Gray; color: white;")
document.getElementsByClassName("submit")[1].setAttribute("style", "background-color: Gray; color: white;")

/* -----------------------------------------------------------
// Debugging part used if no categories and tasks are available :

// Add task list header
var todoList = document.getElementById("tasksList");
var ulTodo = document.createElement("ul");
ulTodo.setAttribute("class", "taskLists");
todoList.appendChild(ulTodo);
// adding individual lists

function listsOfTasks() {
  let listItems = [
      "Task One ", "Task Two ", "Task Three", "Task Four "
    ],

    numberOfLists = listItems.length,
    taskItem,
    span;
  i;

  for (i = 0; i < numberOfLists; i++) {
    taskItem = document.createElement("li");
    var doneBtn = document.createElement("button");
    doneBtn.setAttribute("class", "done");
    doneBtn.type = "button";
    var doneIcon = document.createElement("i");
    doneIcon.setAttribute("class", "far fa-check-circle");
    span = document.createElement("span");
    span.className = "textField";
    span.textContent = listItems[i];
    var favoriteBtn = document.createElement("button");
    favoriteBtn.setAttribute("class", "favorite");
    favoriteBtn.type = "button";
    var favoriteIcon = document.createElement("i");
    favoriteIcon.setAttribute("class", "far fa-star");

    var deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.type = "button";
    var deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "far fa-trash-alt")
    var editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit");
    editBtn.type = "button";
    var editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fas fa-user-edit");
    taskItem.appendChild(editBtn);
    editBtn.appendChild(editIcon);
    ulTodo.appendChild(taskItem);
    taskItem.appendChild(span);
    taskItem.appendChild(doneBtn);
    doneBtn.appendChild(doneIcon);
    taskItem.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    taskItem.appendChild(favoriteBtn);
    favoriteBtn.appendChild(favoriteIcon)
  }
}
listsOfTasks();

var listItems2 = document.getElementsByTagName("li");
var i;

// completed tasks
// create unordered list

var doneTasks = document.getElementById("displayTasksList");
var ulDone = document.createElement("ul");
ulDone.setAttribute("class", "doneLists");
doneTasks.appendChild(ulDone);

//create individual lists

function completedTasks() {
  let listItems = [
      "Task One ", "Task Two ", "Task Three", "Task Four"
    ],
    numberOfLists = listItems.length,
    taskItem, span, deleteBtn, deleteIcon,
    i;

  for (i = 0; i < numberOfLists; i++) {
    taskItem = document.createElement("li");

    taskItem.className = "completedList";
    span = document.createElement("span");
    span.className = "textField";
    span.textContent = listItems[i];
    deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "completedDeleteBtn");
    deleteBtn.type = "button";
    deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "far fa-trash-alt");


    ulDone.appendChild(taskItem);
    taskItem.appendChild(span);
    taskItem.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);


  }
}
completedTasks();


// Create categories lists
var ulcateg = document.getElementById("categoriesLists");

function categoryLists() {
  let listItems = [
      "Category One ", "Category Two ", "Category  Three"
    ],
    numberOfLists = listItems.length,
    listItem, span, editBtn, editIcon, deleteBtn, deleteIcon,
    i;

  for (i = 0; i < numberOfLists; i++) {
    listItem = document.createElement("li");
    listItem.className = "categoryLists";
    span = document.createElement("span");
    span.className = "textField";
    span.id = "categoryTextField";
    span.textContent = listItems[i];
    editBtn = document.createElement("button");
    editBtn.setAttribute("class", "categoryEditBtn");
    editBtn.type = "button";
    editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fas fa-user-edit");
    deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "categoryDeleteBtn");
    deleteBtn.type = "button";
    deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "far fa-trash-alt");
    ulcateg.appendChild(listItem);
    listItem.appendChild(span);
    listItem.appendChild(editBtn);
    editBtn.appendChild(editIcon);
    listItem.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
  }
}
categoryLists(); */