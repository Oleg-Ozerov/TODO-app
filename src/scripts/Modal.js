import {createDate} from "./createDate.js";
import {Todo} from "./Todo.js";
import {addTodo} from "./main.js";
import {inputFilterReg, wrongInputValue} from "./constanses.js";

export class Modal {
    saveButtonHandlerBind = this.saveButtonHandler.bind(this);
    modalWindowHandlerBind = this.modalWindowHandler.bind(this);
    modalInputHandlerBind = this.modalInputHandler.bind(this);
    creationDateHandlerBind = this.creationDateHandler.bind(this);
    expirationDateHandlerBind = this.expirationDateHandler.bind(this);
    closeButtonHandlerBind = this.closeButtonHandler.bind(this);
    elements = {};

    constructor(todo = {}) {
        this.todo = todo;
        this.markup = this.createModal();
        this.buttonListen = this.buttonListener();
        this.isModalForEditing = false;
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

    buttonListener () {
        document.addEventListener('plusButton', () => {
            }
        )
    }

    addEventListeners () {
        this.elements.creationDate = document.getElementById('creationDate');
        this.elements.inputText = document.getElementById('inputTask');
        this.elements.expirationDate = document.getElementById('expirationDate');
        this.elements.saveButton = document.getElementById('saveButtonId');
        this.elements.closeButton = document.getElementById('closeButtonId');

        this.elements.creationDate.addEventListener('change', this.creationDateHandlerBind);
        this.elements.inputText.addEventListener('keyup', this.modalInputHandlerBind);
        this.elements.expirationDate.addEventListener('change', this.expirationDateHandlerBind);
        this.elements.saveButton.addEventListener('click', this.saveButtonHandlerBind);
        window.addEventListener('click', this.modalWindowHandlerBind);
        this.elements.closeButton.addEventListener('click', this.closeButtonHandlerBind);
    }

    saveButtonHandler (event) {
        const newTodo = new Todo({
            text: this.todo.text,
            creationTime: this.todo.creationTime,
            expirationTime: this.todo.expirationTime,
        });

        if(newTodo.creationTime > newTodo.expirationTime) {
            this.elements.creationDate.classList.add(wrongInputValue);
            this.elements.expirationDate.classList.add(wrongInputValue);
            return;
        }

        if (!inputFilterReg.test(this.elements.inputText.value)) {
            this.elements.inputText.classList.add(wrongInputValue);
            return ;
        }

        if(!this.isModalForEditing) {
            window.todoArr = [...window.todoArr, newTodo];
        }

        localStorage.setItem('todos', JSON.stringify(window.todoArr));
        event.target.dispatchEvent(addTodo)
        this.hide();
    }

    modalWindowHandler({ target }) {
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
        const { text } = this.todo;

        return text ? text : '';
    }

    getExpirationDate() {
        const { expirationTime } = this.todo;

        return expirationTime ? expirationTime : createDate(true);
    }

    creationDateHandler (event) {
        this.todo.creationTime = event.target.value;
        if(this.todo.creationTime <= this.elements.expirationDate.value) {
            this.elements.creationDate.classList.remove(wrongInputValue);
            this.elements.expirationDate.classList.remove(wrongInputValue);
        }
    }

    modalInputHandler (event) {
        this.todo.text = event.target.value;
        this.elements.inputText.classList.remove(wrongInputValue);
    }

    expirationDateHandler (event) {
        this.todo.expirationTime = event.target.value;
        if(this.todo.expirationTime > this.elements.creationDate.value) {
            this.elements.creationDate.classList.remove(wrongInputValue);
            this.elements.expirationDate.classList.remove(wrongInputValue);
        }
    }

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
