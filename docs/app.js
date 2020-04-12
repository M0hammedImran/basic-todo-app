// Selectors
const todobtn = document.querySelector('.todo-btn');
const inputTodos = document.querySelector('.inputTodos');
const todosList = document.querySelector('.todosList');
const allDone = document.querySelector('.all-done');
const undoAll = document.querySelector('.undo-all');
const deleteAll = document.querySelector('.delete-all');
let todoItems;
let todos = [];

// EventListeners
todobtn.addEventListener('click', addTodos);
todosList.addEventListener('click', deleteCheck);
allDone.addEventListener('click', AllDone);
undoAll.addEventListener('click', UndoAll);
deleteAll.addEventListener('click', DeleteAll);

document.addEventListener('DOMContentLoaded', getTodos);

// Functions
function addTodos(e) {
  e.preventDefault();
  let input = inputTodos.value;
  if (input.length !== 0) {
    div = document.createElement('div');
    div.classList.add('todoItems');

    const li = document.createElement('li');
    li.innerText = input;
    div.appendChild(li);
    console.log(input);
    saveTodo({ todo: input, isDone: false });

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML =
      '<img src="./images/check-solid.svg" alt="Completed Button"/>';
    div.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML =
      '<img src="./images/trash-solid.svg"  alt="Delete Button" />';
    div.appendChild(deleteBtn);

    todosList.appendChild(div);
    inputTodos.value = null;
  } else {
    console.error('Please Enter a String');
  }
}

function deleteCheck(e) {
  const item = e.target;
  const todoDiv = item.parentElement;
  const todo = todoDiv.childNodes[0].innerText;
  if (item.classList[0] === 'delete-btn') {
    todoDiv.classList.add('fall');
    todoDiv.addEventListener('transitionend', () => {
      todoDiv.remove();
    });
    removeTodos(todo);
  } else if (item.classList[0] === 'complete-btn') {
    todoDiv.classList.toggle('completed');
    todos.forEach((todoItem) => {
      todoItem.todo === todo ? (todoItem.isDone = !todoItem.isDone) : '';
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function AllDone() {
  todoItems = document.querySelectorAll('.todoItems');
  todoItems.forEach((item) => {
    item.classList.add('completed');
  });
  todos.forEach((todoItem) => {
    todoItem.isDone = true;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function UndoAll() {
  todoItems = document.querySelectorAll('.todoItems');
  todoItems.forEach((item) => {
    item.classList.remove('completed');
  });
  todos.forEach((todoItem) => {
    todoItem.isDone = false;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function DeleteAll() {
  todoItems = document.querySelectorAll('.todoItems');
  todoItems.forEach((item) => {
    item.classList.add('fall');
    item.addEventListener('transitionend', () => {
      item.remove();
    });
  });
}

function saveTodo(todo) {
  if (localStorage.getItem('todos') === null) {
    todos;
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem('todos') === null) {
    todos;
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(({ todo, isDone }) => {
    div = document.createElement('div');
    div.classList.add('todoItems');

    const li = document.createElement('li');
    li.innerText = todo;
    div.appendChild(li);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML =
      '<img src="./images/check-solid.svg" alt="Completed Button"/>';
    div.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML =
      '<img src="./images/trash-solid.svg"  alt="Delete Button" />';
    div.appendChild(deleteBtn);
    isDone === true ? div.classList.add('completed') : '';

    todosList.appendChild(div);
  });
}

function removeTodos(todo) {
  todos.forEach((todoItem, index) => {
    todoItem.todo === todo ? todos.splice(index, 1) : '';
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
