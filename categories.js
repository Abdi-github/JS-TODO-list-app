// ------------------------------------------------------------------------
// Date : 14.01.2020 - 10h
// *************************
// Explaination :
// [List of categories] :
// Managed by an object of type "Categories".
// Several methods are available to add or remove a CATEGORY to the list.
//
// [One category] :
// Managed by an object of type "Category".
// Several methods are available to add or remove a TASK to this category
//
// IMPROVEMENT :
// - Create HIGH PRIORITY category directly in constructor
// - Display only "Task in todo" in category summary and not the completed
//
// LATEST TASKS DONE
//  see Version history at the end of the file...
// ------------------------------------------------------------------------
// *** Methods to use from outside : (see description below) ***
// Category init :    categoriesInitialisation() : NECESSARY
// Add a category :   addCategory()
// Remove category :  removeSelectedCategory()
// Edit category :    editSelectedCategory()
// ------------------------------------------------------------------------

// ************************************************************************
// CONSTANTES
// ************************************************************************
const updateAlsoTasksListValue = 1;
const doNotupdateAlsoTasksListValue = 0;
// Container of li items with selector defined
const displayCategoriesContainer = document.querySelector('[data-categoriesList]');

// Values used by CSS or other source
const CLASSNAME_SELECTED_CATEGORY = "selected-category";
const CLASSNAME_CATEGORYLISTS = "categoryLists";
const LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY = "category.selectedListId";
const CATEGORY_SPECIAL_NAME = "* HIGH PRIORITY *";

// Function to save selectedCategroyId in localstorage
// Not really usefull but first test with localstorage management !
function saveToLS() {
  localStorage.setItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY, selectedCategoryId);
}

//-------------------------------------------------------------------------
// Add listener on categories containers for selection management
displayCategoriesContainer.addEventListener('click', selectCategoryAction);

//-------------------------------------------------------------------------
// Function to select a category by clicking on it
function selectCategoryAction(e) {
  if (e.target.tagName.toLowerCase() === 'li') {
    console.log("--> User select a category ----------------------------------");
    selectedCategoryId = e.target.dataset.listId;
    selectCategoryByID(selectedCategoryId);
    saveAndBuild(updateAlsoTasksListValue);
  }
}
//-------------------------------------------------------------------------
// Function to update task title
function updateTasksTitle(selectedCatDescription) {
  var taskOfCat = document.getElementById("taskofcategorytitle");
  taskOfCat.textContent = "Tasks of category : " + selectedCatDescription;
}

//-------------------------------------------------------------------------
// Function to select a category by its ID
function selectCategoryByID(ID) {
  var currentCategory = getCategoryByID(ID);
  console.log("Selected category tasks : " + currentCategory.getTasks);
  // Change selected tasks list according to selected category
  activeTasksList = currentCategory.getTasks;
}
//-------------------------------------------------------------------------
// Function to search a category by its ID and return the category object
function getCategoryByID(ID) {
  console.log("ID searched: " + ID);
  var currentCategory;
  listOfCategories.allCategories.forEach(category => {
    if (category.getId == ID) {
      console.log("ID found !");
      currentCategory = category;
    }
  });
  return currentCategory;
}
// ************************************************************************
// CLASS DEFINITIONS
// ************************************************************************
//-------------------------------------------------------------------------
// Class to register categories
// How to use:
//  to add new category : listOfCategories.newCategory("Desciption") ;
//-------------------------------------------------------------------------
class Categories {
  constructor() {
    // Categories saved in a array
    this._categoriesList = [];
    //TODO JFS P1 : Create HighPriority automatically
    //this.newCategory("HIGH PRIORITY");
  };
  // Method to add a new category to categories
  newCategory(name) {
    let newcat = new Category(name);
    this._categoriesList.push(newcat);
    return newcat;
  };

  // Method to return INDEX of a category by its ID
  getCategoryIndexByID(ID) {
    for (let i = 0; i < this._categoriesList.length; i++) {
      // For debug : console.log("Search..." + this._categoriesList[i].getId);
      if (this._categoriesList[i].getId == ID) {
        console.log("Found ! Index is " + i);
        return i;
      }
    };
    // Not found --> return null
    console.log("Not found ! Null returned !");
    return null;
  };

  // Method to return ID of a category by its Index
  getCategoryIDByIndex(Index) {
    return this._categoriesList[Index].getId;
  };

  // Method to remove a category by index
  removeCategoryByID(ID) {
    console.log("Try to remove category with ID :" + ID);
    // Find index according to ID
    let searchCatIndex = this.getCategoryIndexByID(ID);
    if (searchCatIndex !== null) {
      console.log("Remove it...");
      this._categoriesList.splice(searchCatIndex, 1);
    }
  };

  // Method to edit a category description by index
  editCategoryByID(ID, newDescription) {
    console.log("Edit category with ID :" + ID);
    // Find Index according to ID
    let searchCatIndex = this.getCategoryIndexByID(ID);
    if (searchCatIndex !== null) {
      console.log("Found ! --> Change description with :" + newDescription);
      this._categoriesList[searchCatIndex].setDescription = newDescription;
    }
  };

  // Method to edit a category description by index
  getCategoryDescriptionByID(ID) {
    console.log("Get category description with ID :" + ID);
    // Find Index according to ID
    let searchCatIndex = this.getCategoryIndexByID(ID);
    if (searchCatIndex !== null) {
      console.log("Found ! --> Get description");
      return this._categoriesList[searchCatIndex].getDescription;
    }
  };

  // Method to return the array of categories
  get allCategories() {
    return this._categoriesList;
  };
  // Method to return the number of categories
  get numberOfCategories() {
    return this._categoriesList.length;
  };
}

//-------------------------------------------------------------------------
// Class for one category
// How to use:
//  to add new task : category.newTask("Infos") ;
//-------------------------------------------------------------------------
class Category {
  constructor(descriptionValue) {
    this._description = descriptionValue;
    // List of task link to this category
    this._tasksList = [];
    // Set ID for category. Must by unique
    this._id = "Cat_" + new Date().getTime();
  };
  set setDescription(value) {
    this._description = value;
  };
  get getDescription() {
    return this._description;
  };
  get getId() {
    return this._id;
  };
  // Method to return the array of categories
  get getTasks() {
    return this._tasksList;
  };
  // Method to return the number of categories
  get numberOfTasks() {
    return this._tasksList.length;
  };
  available() {
    console.log("Categorie: " + this._description + " available / id :" + this._id);
  };
}

// ************************************************************************
// FUNCTIONS TO UPDATE DISPLAY AND SAVE
// TODO : Move in separate file (View)
// ************************************************************************
//-------------------------------------------------------------------------
// Function to save in localstorage and update the display of categories
function saveAndBuild(updateDisplayTasks) {
  saveToLS();
  buildCategoryDisplay(updateDisplayTasks);
}

//-------------------------------------------------------------------------
// Function to updateInfo after changes done in tasks
function updateInfoAfterTasksChanges() {
  buildCategoryDisplay(doNotupdateAlsoTasksListValue);
}

//-------------------------------------------------------------------------
// Function to rebuild the display of categories
function buildCategoryDisplay(updateTasksList) {
  console.log("--> Build category list");
  // Clear all current infos
  clearElements(displayCategoriesContainer);
  // Generate all li elements for categoriesList
  buildCategoriesList();
  updateTasksTitle(listOfCategories.getCategoryDescriptionByID(selectedCategoryId));
  // If update tasks list necessary
  if (updateTasksList == updateAlsoTasksListValue) {
    console.log("--> Update tasks list");
    displayTasks();
  };
}

//-------------------------------------------------------------------------
// Function to clear the current list of elements in a container
function clearElements(element) {
  // Remove every childs
  while (element.firstChild) {
    //console.log("Clear elements...");
    element.removeChild(element.firstChild);
  };
}

//-------------------------------------------------------------------------
// Function to update list of categories displayed
// Element <ul> must have dataset [data-categoriesList]
function buildCategoriesList() {
  console.log("SelectedCategoryId : " + selectedCategoryId);
  listOfCategories.allCategories.forEach(category => {
    // Create li item with according attributes
    const listElement = document.createElement('li');
    // Add dataset for selection
    listElement.dataset.listId = category.getId;
    // Add class for CSS
    listElement.classList.add(CLASSNAME_CATEGORYLISTS);
    // Add class for selection prupose
    if (category.getId == selectedCategoryId) {
      listElement.classList.add(CLASSNAME_SELECTED_CATEGORY);
    };
    listElement.innerText = category.getDescription + " - (" + category.numberOfTasks + ")";
    displayCategoriesContainer.appendChild(listElement);
  });
}

//-------------------------------------------------------------------------
// Function to add a category from the input fields
// Input : from input field with id=categoryDescription
function addCategory() {
  console.log("-------------------------------------------");
  console.log("--> Try to add new category: " + document.getElementById("categoryDescription").value);
  // Add new Category (if not empty) to the list of categories
  if (document.getElementById("categoryDescription").value !== '') {
    var newCat = listOfCategories.newCategory(document.getElementById("categoryDescription").value);
    // Add the new category in the list of items in HTML
    if (typeof newCat !== 'undefined') {
      // Select directly new category
      selectedCategoryId = newCat.getId;
      console.log("Id of new category : " + selectedCategoryId);
      selectCategoryByID(selectedCategoryId);
    };
    buildCategoryDisplay(updateAlsoTasksListValue);
    // Clear Category field
    document.getElementById("categoryDescription").value = "";
  } else {
    alert('Please enter a description !');
  };
}

//-------------------------------------------------------------------------
// Function to remove a category selected
// SelectionId is managed by the variable "selectedCategoryId" saved in Localstorage
function removeSelectedCategory() {
  console.log("-------------------------------------------");
  console.log("--> Try to remove selected category: " + selectedCategoryId);
  // Save index of current selected category
  var savedSelectedCategoryIndex = listOfCategories.getCategoryIndexByID(selectedCategoryId);
  // DEBUG : console.log("savedSelectedCategoryIndex: " + savedSelectedCategoryIndex);
  // Not allowed to remove High Priority Category
  if (selectedCategoryId !== highPriorityId) {
    if (confirm("Do you really want to remove the category \"" + listOfCategories.getCategoryDescriptionByID(selectedCategoryId) + "\" and all its tasks ? ")) {
      listOfCategories.removeCategoryByID(selectedCategoryId);
      // Set previous as new selected category
      savedSelectedCategoryIndex--;
      console.log("Then savedSelectedCategoryIndex: " + savedSelectedCategoryIndex);
      selectedCategoryId = listOfCategories.getCategoryIDByIndex(savedSelectedCategoryIndex);
      selectCategoryByID(selectedCategoryId);
      buildCategoryDisplay(updateAlsoTasksListValue);
    };
  };
}

//-------------------------------------------------------------------------
// Function to edit a category selected
// SelectionId is managed by the variable "selectedCategoryId" saved in Localstorage
function editSelectedCategory() {
  console.log("-------------------------------------------");
  console.log("--> Try to edit selected category: " + selectedCategoryId);
  console.log("Index : " + listOfCategories.getCategoryIndexByID(selectedCategoryId));
  // Now allowed to modify High Priority Category
  if (selectedCategoryId !== highPriorityId) {
    var description = prompt("Please modify the description", listOfCategories.getCategoryDescriptionByID(selectedCategoryId));
    if (description != null) {
      listOfCategories.editCategoryByID(selectedCategoryId, description);
    } else {
      console.log("New description entered is null. Probably canceled");
    };
  };
  buildCategoryDisplay(updateAlsoTasksListValue);
}

//-------------------------------------------------------------------------
// Function to wait x milliseconds
// Necessary to create fake category with different time and ID
function sleepMS(ms) {
  let date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

//-------------------------------------------------------------------------
// Function to display summary information of categories in console
function selectHigPriorityCategory() {
  selectedCategoryId = highPriorityId;
  selectCategoryByID(selectedCategoryId);
  // Refresh also tasks list
  saveAndBuild(updateAlsoTasksListValue);
}

//-------------------------------------------------------------------------
// Function to create the HighPriority category.
function addHighPriorityCategory() {
  let newCategory = listOfCategories.newCategory(CATEGORY_SPECIAL_NAME);
  highPriorityId = newCategory.getId;
  // Define favoritTasksList table for tasks
  favoritTasksList = newCategory.getTasks;
}

//-------------------------------------------------------------------------
// Function to create fake categories for tests.
function addFakeCategoriesLoop(numberOfFakes) {
  // Add sleep to have unique ID
  for (let i = 1; i < numberOfFakes + 1; i++) {
    sleepMS(5);
    addOneFakeCategorie(i);
  };
}

//-------------------------------------------------------------------------
// Function to create fake categories for tests.
// Should be no more necessary when load and save from LS working
function addOneFakeCategorie(Id) {
  // Add sleep to have unique ID
  console.log("Add one category with Id :" + Id);
  var newCategory = listOfCategories.newCategory("Project " + Id);
  // Added by SV
  activeTasksList = newCategory.getTasks;
  addFakeTasksLoopInSelectedCategory(5, Id);
}

//-------------------------------------------------------------------------
// Function to create fake tasks for tests.
function addFakeTasksLoopInSelectedCategory(numberOfTasks, IdCat) {
  // Add sleep to have unique ID
  for (let i = 1; i < numberOfTasks + 1; i++) {
    sleepMS(5);
    new Task("Demo task - " + IdCat + "." + i, "01/2" + i + "/2020", activeTasksList);
  };
}

//-------------------------------------------------------------------------
// DEBUG : Function to display summary information of categories in console
function displaySummaryInConsole() {
  // List all the categories in the log
  console.log("Number of categories in the list: " + listOfCategories.numberOfCategories);
  console.log(listOfCategories.allCategories);
  // Debug : To test accesssing infos :
  // listOfCategories.allCategories.forEach(category => category.available());
}

//-------------------------------------------------------------------------
// Function for category initialisation
// Must be called from todo.html
function categoriesInitialisation() {
  addHighPriorityCategory();
  addFakeCategoriesLoop(5);
  // Select high priority category
  selectHigPriorityCategory();
  // For debug :
  displaySummaryInConsole();
}

//-------------------------------------------------------------------------
// Global variable
//-------------------------------------------------------------------------
// Must be defined AFTER Class Categories
var listOfCategories = new Categories;
var selectedCategoryId;
var highPriorityId;

//-------------------------------------------------------------------------
// Version history :
//-------------------------------------------------------------------------
// 2020-01-14
// - Add confirmation when removing the selected category
//
// 2020-01-09 - 16h00 : JFS
// - Clean code
//
// 2020-01-07 - 14h00 : JFS
// - Select High Priority categorie on startup
// - Display number of tasks in a category
// - Add informAboutTasksChanges() for tasks to inform category about changes
// - Adapt buildCategoryDisplay() with parameter to update or not tasks list
// - Rename function updateXXX to buildXXX
//
// 2020-01-04 : JFS
// - Remove Alert on Category added
// - Create categoriesInitialisation function
// - Edit category name : Nice to have
// - Rename Favorite to High Priority
// - Select previous category after category deletion
//-------------------------------------------------------

/* Task description for Demo :
Préparer présentation projet
Aller skier
Lire livre WEB GL
Répondre aux derniers mails
*/