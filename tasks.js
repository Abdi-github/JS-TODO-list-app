// ------------------------------------------------------------------------
// Date : 12.01.2020
//
// Explaination :
//  Tasks are managed by a class Task, we use also information from the
//  categories file to have the selected category and the favorti category -
//  hyght priotity category.
// ------------------------------------------------------------------------


// ************************************************************************
// CLASS DEFINITIONS
// ************************************************************************
//-------------------------------------------------------------------------
// Class Task
// How to use:
//  To add new Task
//  @description  - Description of the task
//  @dueDate      - Due Date of the tasks
//  @tasksList    - TaskList of the active category
//-------------------------------------------------------------------------

class Task {

  // Construtor class Task
  constructor(description, dueDate, tasksList) {
    this.description = description;
    this.dueDate = dueDate;
    this.tasksList = tasksList;
    this.favorit = false;
    this.done = false;
    this.id = Date.now().toString(36);
    this.addTaskList(this);
  }

  addTaskList(task) {
    this.tasksList.push(task);
    displayTasks();
  }

  toggleFavorit() {
    if (this.favorit == false)
      this.favorit = true;
    else
      this.favorit = false;
  }

  toggleDone() {
    if (this.done == false)
      this.done = true;
    else
      this.done = false;
  }

}


//-------------------------------------------------------------------------
// Function to create a task and add to the activeTasksList
function addTask() {
  var ElemDescription = document.getElementById("description");
  var ElemDueDate = document.getElementById("date");

  if (selectedCategoryId == highPriorityId)
    alert('Please select a category');
  else
  if ((ElemDescription.value == '') | (ElemDueDate.value == ''))
    alert('Please enter a description and a due date');
  else {
    new Task(ElemDescription.value, ElemDueDate.value, activeTasksList);
    ElemDescription.value = "";
    ElemDueDate.value = "";
  }
}


//-------------------------------------------------------------------------
// Function to add a task to the favoritTaskList
function addTaskToFavorit(id) {
  //control if task already exist in favoritTasksList
  var exist = false;
  for (let j = 0; j < favoritTasksList.length; ++j) {
    if (favoritTasksList[j].id == id) {
      exist = true;
      favoritTasksList[j].toggleFavorit();
      favoritTasksList.splice(j, 1); //delete the task from favorit
      displayTasks();
      break;
    }
  }
  if (!exist) {
    for (let i = 0; i < activeTasksList.length; ++i) {
      if (activeTasksList[i].id == id) {
        favoritTasksList.push(activeTasksList[i]);
        activeTasksList[i].toggleFavorit();
        displayTasks();
      }
    }

  }
}


//-------------------------------------------------------------------------
// Function to edit a task for modify the description and the due date if necessary
function editTask(id) {
  for (let i = 0; i < activeTasksList.length; ++i) {
    if (activeTasksList[i].id == id) {
      var description = prompt("Please modify the description", activeTasksList[i].description);
      if (description != null) {
        activeTasksList[i].description = description;
      }
      var date = prompt("Please modify the date", activeTasksList[i].dueDate);
      if (date != null) {
        activeTasksList[i].dueDate = date;
      }
    }
  }
  displayTasks();
}


//-------------------------------------------------------------------------
// Function to delete a task from the activeTasksList and the favoritTaskList
function deleteTask(id) {
  for (let i = 0; i < activeTasksList.length; ++i) {
    if (activeTasksList[i].id == id) {
      activeTasksList.splice(i, 1); //delete the task
    }
  }
  for (let i = 0; i < favoritTasksList.length; ++i) {
    if (favoritTasksList[i].id == id) {
      favoritTasksList.splice(i, 1); //delete the task
    }
  }
  displayTasks();
}


//-------------------------------------------------------------------------
// Function to display tasks from active tasksList , one output for the
//    active tasks and another one with the tasks already done
function displayTasks() {
  var output = [];
  var outputDone = [];

  //update the range of urgency
  document.getElementById("days").innerHTML = document.getElementById("urgency").value;

  for (let i = 0; i < activeTasksList.length; ++i) {

    var tmp = activeTasksList[i].id;

    var priority = definePriority(activeTasksList[i].favorit, document.getElementById("urgency").value, activeTasksList[i].dueDate);
    var priorityClass = "textField" + priority;
    if (activeTasksList[i].done) priorityClass = "textField"; //Desable the priorityClass for Task Done
    var classStar = "far fa-star";
    if (activeTasksList[i].favorit) classStar = "fas fa-star"; //Change the class of favorit Star when activ

    var liDone = '<li class="compltedList" ondblclick="toggleDone(\'' + tmp + '\')">';
    var spanDescription = '<span class="textField">' + activeTasksList[i].description + '</span>';
    var spanDueDate = '<span class="' + priorityClass + '">' + activeTasksList[i].dueDate + '</span>';
    var btnDelDone = '<button class="completedDeleteBtn" onclick="deleteTask(\'' + tmp + '\')" type="button"><i class="far fa-trash-alt"></i></button>';
    var liEnd = '</li>';
    var li = '<li onclick="selectTask(\'' + tmp + '\')"' + ' ondblclick="toggleDone(\'' + tmp + '\')">';
    var btnEdit = '<button class="edit" onclick="editTask(\'' + tmp + '\')"><i class="fas fa-user-edit"></i></button>';
    var btnDone = '<button class="done" onclick="toggleDone(\'' + tmp + '\')"><i class="far fa-check-circle"></i></i></button>';
    var btnDele = '<button class="delete" onclick="deleteTask(\'' + tmp + '\')"><i class="far fa-trash-alt"></i></i></button>';
    var btnFavo = '<button class="favorite" onclick="addTaskToFavorit(\'' + tmp + '\')"><i class="' + classStar + '"></i></i></button></li>';

    if (activeTasksList[i].done) {
      if (selectedCategoryId == highPriorityId) {
        outputDone.push(liDone + spanDescription + spanDueDate + liEnd);
      } else {
        outputDone.push(liDone + spanDescription + spanDueDate + btnDelDone + liEnd);
      }

    } else {
      if (selectedCategoryId == highPriorityId) {
        output.push(li + btnEdit + spanDescription + spanDueDate + btnDone + btnFavo + liEnd);
      } else {
        output.push(li + btnEdit + spanDescription + spanDueDate + btnDone + btnDele + btnFavo + liEnd);
      }
    }
  }

  document.getElementById("tasksList").innerHTML = '<p>Tasks todo:</p><ul class="taskLists">' + output.join('') + '</ul>';
  document.getElementById("displayTasksList").innerHTML = '<p>Completed tasks:</p><ul class="doneLists">' + outputDone.join('') + '</ul>';
  informAboutTasksChanges();
}


//-------------------------------------------------------------------------
// Function to define the priority of the task
function definePriority(important, urgence, dueDate) {
  var dateNow = new Date();
  var dateDue = new Date(dueDate);

  // One day Time in ms (milliseconds)
  var one_day = 1000 * 60 * 60 * 24
  if ((dateNow.getTime() + one_day * urgence) > dateDue.getTime())
    if (important)
      return 1; //urgent & important
    else return 3; //urgent, not importnat
  else
  if (important)
    return 2; //not urgent, important
  else return 4; //not urgent, not importnat
}


//-------------------------------------------------------------------------
// Function to change the property done of a task
function toggleDone(id) {
  console.log(id);
  for (let i = 0; i < activeTasksList.length; ++i) {
    if (activeTasksList[i].id == id) {
      activeTasksList[i].toggleDone();
      displayTasks();
    }
  }
}


//-------------------------------------------------------------------------
// Function to change the property favorit of a task
function toggleFavorit(id) {
  console.log(id);
  for (let i = 0; i < activeTasksList.length; ++i) {
    if (activeTasksList[i].id == id) {
      activeTasksList[i].toggleFavorit();
      displayTasks();
    }
  }
}


//-------------------------------------------------------------------------
// Function to identify the selected task
function selectTask(id) {
  selectedTask = id;
}


//-------------------------------------------------------------------------
// Function to inform categories about tasks changes (number)
function informAboutTasksChanges() {
  console.log("Something changed in tasks, inform categories");
  updateInfoAfterTasksChanges();
}


//initialization
var favoritTasksList = new Array();
var activeTasksList = new Array();
var selectedTask;