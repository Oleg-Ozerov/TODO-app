import {TodoList} from "./TodoList.js";
import {createDate} from "./createDate.js";
import {enterKey, inputFilterReg, wrongInputValue} from "./constanses.js";
import {Todo} from "./Todo.js";
import {addTodo} from "./main.js";

export class Modal {
    constructor() {
        this.markup = this.createModal();
        this.creationDate = this.creationDateHandler.bind(this);
        this.modalInput = this.modalInputHandler.bind(this);
        this.expirationDate = this.expirationDateHandler.bind(this);
        this.isCreated = false;

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
              required
            >
            <label for="inputTask">Todo</label>
            <input
              type="text"
              id="inputTask"
              class="todo__modal-text"
              placeholder="What needs to be done?"
              required
            >
            <label for="expirationDate">Expiration date</label>
            <input
              type="date"
              id="expirationDate"
              class="todo__modal-expiration"
              required
            >
            <button type="submit" id="saveButtonId" class="todo__modal-save">
              Save
            </button>
            <button type="button" class="todo__modal-close">
              Close
            </button>
          </form>`
        newModal.classList.add('todo__modal')
        return newModal;
    }

    creationDateHandler () {
        const creationDate = document.querySelector('#creationDate');
        creationDate.value = createDate();
        this.creationDate.value = creationDate.value;
        creationDate.addEventListener('change', (event) => {
            this.creationDate.value = event.target.value;
        })
        return creationDate;
    }

    modalInputHandler () {
        const modalInput = document.querySelector('#inputTask');
        modalInput.value = '';
        this.modalInput.value = '';
        modalInput.addEventListener('change', (event) => {
            this.modalInput.value = event.target.value;
        })

        return modalInput;
    }

    expirationDateHandler () {
        const expirationDate = document.querySelector('#expirationDate');
        expirationDate.value = createDate(true);
        this.expirationDate.value = expirationDate.value;
        expirationDate.addEventListener('change', (event) => {
            this.expirationDate.value = event.target.value;
        })

        return expirationDate;
    }

    modalWindowCloser() {
        const modalWindow = document.querySelector('.todo__modal');
        window.addEventListener('click', ({target}) => {
            if(target === modalWindow) {
                this.hide();
            }
        })
    }


    saveButtonHandler () {
        const saveButton = document.querySelector('.todo__modal-save');
        saveButton.addEventListener('click', () => {
            if (!inputFilterReg.test(this.modalInput.value) || this.expirationDate.value < this.creationDate.value) {
                alert('Input shouldn`t be empty. Expiration Date should be greater, than Creation Date')
                return;
            }

            const newTodo = new Todo({text: this.modalInput.value, creationTime: this.creationDate.value, expirationTime: this.expirationDate.value});
            window.todoArr = [...window.todoArr, newTodo];
            localStorage.setItem('todos', JSON.stringify(window.todoArr));
            saveButton.dispatchEvent(addTodo)
            this.hide();
        })
        return saveButton;

    }

    closeButtonHandler () {
        const closeButton = document.querySelector('.todo__modal-close');
        closeButton.addEventListener('click', () => {
            this.hide();
        })
    }


    show() {
        this.markup.style.display = 'block';
        this.creationDateHandler();
        this.modalInputHandler();
        this.expirationDateHandler();
        if(!this.isCreated) {
            this.saveButtonHandler();
            this.closeButtonHandler();
            this.modalWindowCloser();
        }

        this.isCreated = true;
    }

    hide() {
        this.markup.style.display='none';

    }

}
