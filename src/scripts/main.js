import {TodoList} from "./TodoList.js";
import {Todo} from "./Todo.js";
import {createDate} from "./createDate.js";
import {Modal} from "./Modal.js";

const todoList = new TodoList('.todo__list');
const todoInput = document.querySelector('.todo__input');

todoInput.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        if (! /^[a-zA-Zа-яА-Я0-9 ]+$/.test(todoInput.value)) {
            todoInput.classList.add('mistake');
            return;
        }

        const todo = new Todo(createDate(), todoInput.value, createDate(true));

        todoList.addNewTodo(todo);
        todoInput.value = '';
        todoInput.classList.remove('mistake');
    }
})

if(localStorage.getItem('todos')) {
    todoList.$el.innerHTML = localStorage.getItem('todos');
}

const modal = new Modal('.todo__modal')
const plusButton = new Modal('.todo__button');
const closeButton = new Modal('.todo__modal-close');
const saveButton = new Modal('.todo__modal-save');

const modalInputText = document.querySelector('.todo__modal-text');
const modalCreationDate = document.querySelector('.todo__modal-creation');
const modalExpirationDate = document.querySelector('.todo__modal-expiration');

plusButton.$el.onclick = function (){
    modalCreationDate.value = createDate();
    modalExpirationDate.value = createDate(true);
    modal.show()
}

closeButton.$el.onclick = function (){
    modal.hide();
}

saveButton.$el.onclick = function () {
    if (! /^[a-zA-Zа-яА-Я0-9 ]+$/.test(modalInputText.value)) {
        return;
    }

    const todo = new Todo(modalCreationDate.value, modalInputText.value, modalExpirationDate.value);

    todoList.addNewTodo(todo);
    modalInputText.value = '';
    modal.hide();
}

window.onclick = function (event) {
    if(event.target === modal.$el) {
        modal.hide();
    }
}
