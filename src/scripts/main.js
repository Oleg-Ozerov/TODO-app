const todoList = document.querySelector(`.todo__list`);
function toLocalStorage () {
    localStorage.setItem('todos', todoList.innerHTML)
}

function addNewTodo (text) {
    const createDate = (nextDay) => {
        const fullDate = new Date();
        if(nextDay) {
            fullDate.setDate(fullDate.getDate() + 1);
        }
        return `${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`;
    }
    const todo = {
        creationTime: createDate(),
        text: text,
        expirationTime: createDate(true),
    }
    const newTodo = document.createElement("li" );
    newTodo.className = "todo__list-item"
    newTodo.innerHTML = `<span>${todo.creationTime} </span><span>${todo.text} </span><span>${todo.expirationTime}</span>`;
    todoList.appendChild(newTodo);
    toLocalStorage();
}

const todoInput = document.querySelector('.todo__input')

todoInput.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        if (! /^[a-zA-Z0-9]+$/.test(todoInput.value)) {
            todoInput.classList.add('mistake');
            return;
        }
        addNewTodo(todoInput.value);
        todoInput.value = '';
        todoInput.classList.remove('mistake');
    }
})

if(localStorage.getItem('todos')) {
    todoList.innerHTML = localStorage.getItem('todos');
}

const modal = document.querySelector('.todo__modal');
const plusButton = document.querySelector('.todo__button');
const form = document.querySelector('.todo__modal-content');
const closeButton = document.querySelector('.todo__modal-close')

plusButton.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

form.onsubmit = function () {
    const todo = {
        creationTime: document.querySelector('.todo__modal-creation').value,
        text: document.querySelector('.todo__modal-text').value,
        expirationTime: document.querySelector('.todo__modal-expiration').value,
    }
    const newTodo = document.createElement("li" );
    newTodo.className = "todo__list-item"
    newTodo.innerHTML = `<span>${todo.creationTime} </span><span>${todo.text} </span><span>${todo.expirationTime}</span>`;
    todoList.appendChild(newTodo);
    toLocalStorage();
    modal.style.display = "none";
}