const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton =document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementsById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTaskButton = document.querySelector('[data-clear-complete-tasks-button]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selecetedListId';
let lists =JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.datasetlistId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
if (e.target.tagName.toLowerCase() === 'input') {
    const selecetedList =lists.find(list.id === selectedListId)
    const selectedTask = selecetedList.task.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
}
})

clearCompleteTaskButton.addEventListener('click', e => {
const selecetedList = lists.find(list => list.id === selectedListId)
selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
saveAndRender()
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
   e.preventDefault() 
const listName = newListInput.value
if (listName === null || listName.trim () === '') return;
const list = createList (listName);
newListInput.value = null;
lists.push(list);
saveAndrender();
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
 const taskName = newTaskInput.value;
 if (taskName === null || taskName.trim() === '') return;
 const task = createTask (taskName);
 newTaskInput.value = null;
 const selectedList = lists.find(list => list.id === selectedListId);
 selectedList.tasks.push(task);
 saveAndrender();
 });

function createList(name) {
   return { id: Date.now().toString(), name: name, tasks: []}
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

function render() {
clearElement(listsContainer)
renderLists()

const selectedList = lists.find(list => list.id === selectedListId)
if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
} else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
}
}
function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
const taskTemplate = document.importNode(taskTemplate.content, true)
const checkbox = taskElement.querySelector('input')
checkbox.id = task.id
checkbox.checked = task.complete
const label = taskElement.query.Selector('label')
label.htmlFor = task.id
label.append(task.name)
tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList) {
const incompleteTaskCount= selectedList.tasks.filter(task =>
    !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTaskCount} ${taskString}
    remaining`
}

    function renderLists() {   
lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name")
    listElement.innerText = list.name
    if (list.id === selectedListId) {
    listElement.classList.add ('active-list')
    }
    listsContainer.appendChild(listElement)
    })
}
function clearElement(element){
while(element.firstChild) {
element.removeChild(element.firstChild)

}-n
}

render()