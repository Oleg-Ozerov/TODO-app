import {createDate} from "./createDate.js";

export class Todo {
    id = this.generateId();

    constructor({
        text = ' ',
        creationTime = createDate(),
        expirationTime = createDate(true),
        isChecked = false
    }) {
        this.creationTime = creationTime
        this.text = text
        this.expirationTime = expirationTime
        this.isChecked = isChecked
    }

    getNewTodoMarkup() {
        const newTodo = document.createElement('li');

        newTodo.innerHTML = `<label class="todo__list-item" for="${this.id}">
                            <input id="${this.id}" type="checkbox" class="todo__list-checkbox" ${this.isChecked ? "checked" : ""}>
                            <span>${this.creationTime} </span>
                            <span>${this.text} </span>
                            <span>${this.expirationTime}</span>
                            <span class="todo__list-edit" id="edit${this.id}"></span>
                            <span class="todo__list-remove" id="remover${this.id}">X</span>
                         </label>`;

        return newTodo;
    }

    getEditElement () {
        return document.getElementById(`edit${this.id}`);
    }

    getRemoveElement () {
        return  document.getElementById(`remover${this.id}`);
    }

    getCheckboxElement () {
        return document.getElementById(this.id)
    }

    isCheckedTogler () {
        this.isChecked = !this.isChecked;
        localStorage.setItem('todos', JSON.stringify(window.todoArr));
    }


    generateId() {
        return new Date().getTime() + Math.floor(Math.random() * 1000);
    }
}