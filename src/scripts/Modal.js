import {TodoList} from "./TodoList.js";
import {createDate} from "./createDate.js";
import {enterKey, inputFilterReg, wrongInputValue} from "./constanses.js";
import {Todo} from "./Todo.js";
import {addTodo} from "./main.js";

export class Modal {
    constructor(todo = {}) {
        this.todo = todo;
        this.markup = this.createModal();
    }

    createModal () {
        const newModal = document.createElement('div');
        newModal.innerHTML = `
          <form action="#" class="todo__modal-content">
            <label for="creationDate">Creation date</label>
            <input
              type="date"
              id="creationDate"
              class="todo__modal-creation"
              value="${this.getCreationDate()}"
              required
            >
            <label for="inputTask">Todo</label>
            <input
              type="text"
              id="inputTask"
              class="todo__modal-text"
              placeholder="What needs to be done?"
              value="${this.getInputText()}"
              required
            >
            <label for="expirationDate">Expiration date</label>
            <input
              type="date"
              id="expirationDate"
              class="todo__modal-expiration"
              value="${this.getExpirationDate()}"
              required
            >
            <button type="submit" id="saveButtonId" class="todo__modal-save">
              Save
            </button>
            <button type="button" id="closeButtonId" class="todo__modal-close">
              Close
            </button>
          </form>`
        newModal.classList.add('todo__modal')
        newModal.setAttribute('id', 'modalWindow');

        return newModal;
    }

    addEventListeners () {
        const creationDate = document.getElementById('creationDate');
        const inputText = document.getElementById('inputTask');
        const expirationDate = document.getElementById('expirationDate');
        const saveButton = document.getElementById('saveButtonId');
        const closeButton = document.getElementById('closeButtonId');

        creationDate.addEventListener('change', this.creationBind);
        inputText.addEventListener('change', this.inputBind);
        expirationDate.addEventListener('change', this.expirationBind);
        saveButton.addEventListener('click', this.bindSave);
        window.addEventListener('click', this.bindModalWindow);
        closeButton.addEventListener('click', this.bindCloseButton);
    }

    bindSave = this.saveButtonHandler.bind(this);
    saveButtonHandler (event) {
        if(!this.todo.text) {
            const newTodo = new Todo({text: this.todo.text, creationTime: this.todo.creationTime, expirationTime: this.todo.expirationTime});
            window.todoArr = [...window.todoArr, newTodo];
        }

        localStorage.setItem('todos', JSON.stringify(window.todoArr));
        event.target.dispatchEvent(addTodo)
        this.hide();
    }

    bindModalWindow = this.modalWindowHandler.bind(this);
    modalWindowHandler({target}) {
        const modalWindow = document.getElementById('modalWindow');

        if(target === modalWindow) {
            this.hide();
        }
    }


    getCreationDate() {
        const { creationTime } = this.todo;

        return creationTime ? creationTime : createDate();
    }

    getInputText () {
        const {text} = this.todo;

        return text ? text : '';
    }

    getExpirationDate() {
        const {expirationTime} = this.todo;

        return expirationTime ? expirationTime : createDate(true);
    }

    creationBind = this.creationDateHandler.bind(this)
    creationDateHandler (event) {
        this.todo.creationTime = event.target.value;
    }

    inputBind = this.modalInputHandler.bind(this);
    modalInputHandler (event) {
        this.todo.text = event.target.value;
    }

    expirationBind = this.expirationDateHandler.bind(this);
    expirationDateHandler (event) {
        this.todo.expirationTime = event.target.value;
    }

    bindCloseButton = this.closeButtonHandler.bind(this);
    closeButtonHandler () {
        this.hide()
    }


    show() {
        this.markup.style.display = 'block';
    }

    hide() {
        this.markup.style.display='none';

    }

}
