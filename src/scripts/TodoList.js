import {Todo} from "./Todo.js";
import {enterKey, inputFilterReg} from "./constanses.js";
import {Modal} from "./Modal.js";

   export class TodoList {
    constructor(selector) {
        this.$el = document.querySelector(selector);
        this.input = this.createInput();
        this.list = this.createTodoList();
        this.modal = this.createModal();

        this.showModal = this.modal.show.bind(this.modal);
        this.modalOpener = this.createModalOpener();
        this.modalListener = this.modalAddListener();
    }

    createInput () {
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('placeholder', 'What needs to be done?');
        newInput.classList.add('todo__input');
        newInput.addEventListener('keypress',this.todoAdder );
        newInput.addEventListener('keyup', this.inputValidation);

        this.$el.appendChild(newInput);

        return newInput;
    }

    createTodoList() {
        const newList = document.createElement('ul');
        newList.classList.add('todo__list');
        this.$el.appendChild(newList);
        return newList;
    }


    todoAdder = this.addNewTodo.bind(this);

    addNewTodo ({keyCode, target}) {
        if(keyCode === enterKey) {
           if(!inputFilterReg.test(target.value)) {
               return;
           }
           const newTodo = new Todo({text: target.value});
           window.todoArr = [...window.todoArr, newTodo];
           localStorage.setItem('todos', JSON.stringify(window.todoArr));
           target.value = '';
           this.clearList();
           this.renderItems();
        }
    }

    clearList () {
        this.list.innerHTML = '';
    }

    inputValidation ({target}) {
        if (!inputFilterReg.test(target.value)) {
            this.classList.add('mistake');

        } else {this.classList.remove('mistake')}

        if(!target.value) {
            this.classList.remove('mistake')
        }
    }

    createModalOpener () {
        const plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.setAttribute('type', 'button');
        plusButton.classList.add('todo__button');
        plusButton.addEventListener('click', this.showModal);
        this.$el.appendChild(plusButton);

        return plusButton;
    }
    createModal () {
        const modal = new Modal();
        this.$el.appendChild(modal.markup);
        return modal;
    }


    modalAddListener () {
        document.addEventListener('add', () => {
            this.clearList();
            this.renderItems();
        })
    }

    renderItems () {
        window.todoArr.forEach((el) => {
            this.list.appendChild(el.getNewTodoMarkup());
            const todoCheckbox = el.getCheckboxElement()
            const todoRemover = el.getRemoveElement();
            todoCheckbox.addEventListener('click', () => {
                el.isCheckedTogler();
            })
            todoRemover.addEventListener('click', (event) => {
                const todoId = +event.target.id.slice(7);
                const result = window.todoArr.filter(todo => todo.id !== todoId)
                window.todoArr = [...result];
                this.clearList();
                this.renderItems();
            })
        })
    }

    initionalRender() {
        this.renderItems();
        this.createModalOpener();
        this.modalAddListener();
    }
   }

