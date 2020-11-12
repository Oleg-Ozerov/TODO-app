import {Todo} from "./Todo.js";
import {enterKey, inputFilterReg} from "./constanses.js";
import {Modal} from "./Modal.js";
import {createDate} from "./createDate.js";

   export class TodoList {
    itemsLeft = window.todoArr.length;
    display = 'none';
    currentArray = window.todoArr;
    constructor(selector) {
        this.$el = document.querySelector(selector);
        this.sortList = this.createSortList();
        this.sortButton = this.createSortButton();
        this.input = this.createInput();
        this.list = this.createTodoList();
        this.modal = this.createModal();

        this.showModal = this.modal.show.bind(this.modal);
        this.modalListener = this.modalAddListener();
    }

    bindDisplay = this.displayToggler.bind(this);
    displayToggler () {
        if(this.display === 'none') {
            this.display = 'block';
        } else this.display = 'none';

        this.sortList.style.display = this.display;
    }

    createSortButton () {
        const newSortButton = document.createElement('span');
        newSortButton.classList.add('todo__sort')
        newSortButton.addEventListener('click', this.bindDisplay);

        this.$el.appendChild(newSortButton);
    }

    createSortList () {
        const sortList = document.createElement('ul');
        sortList.innerHTML = `
            <li class="todo__sortList-item" id="byLatest">Latest</li>
            <li class="todo__sortList-item" id="byOldest">Oldest</li>
            <li class="todo__sortList-item" id="fromAToZ">Alphabetically from A to Z</li>
            <li class="todo__sortList-item" id ="fromZToA">Alphabetically from Z to A</li>
        `;

        sortList.classList.add('todo__sortList');
        this.$el.appendChild(sortList);

        this.addSortListEventListeners();


        return sortList;
    }

    addSortListEventListeners () {
        const byOldest = document.getElementById('byOldest');
        const byLatest = document.getElementById('byLatest');
        const fromAToZ = document.getElementById('fromAToZ');
        const fromZToA = document.getElementById('fromZToA');

        byOldest.addEventListener('click', () => {
            this.currentArray = this.currentArray.sort((a,b) => a.creationTime.localeCompare(b.creationTime));
            this.bindDisplay();
            this.clearList();
            this.renderItems(this.currentArray);
        });

        byLatest.addEventListener('click', () => {
            this.currentArray = this.currentArray.sort((a,b) => b.creationTime.localeCompare(a.creationTime));
            this.bindDisplay();
            this.clearList();
            this.renderItems(this.currentArray);
        })

        fromAToZ.addEventListener('click', () => {
            this.currentArray = this.currentArray.sort( (a, b) => a.text.localeCompare(b.text));
            this.bindDisplay();
            this.clearList();
            this.renderItems(this.currentArray);
        })

        fromZToA.addEventListener('click', () => {
            this.currentArray = this.currentArray.sort( (a, b) => b.text.localeCompare(a.text));
            this.bindDisplay();
            this.clearList();
            this.renderItems(this.currentArray);
        })
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

    createButtonsBlock () {
        const newBlock = document.createElement('div');
        newBlock.innerHTML = `
            <span>
              ${this.itemsLeft} items left 
            </span>
            <button id="allButton">All</button>
            <button id="activeButton">Active</button>
            <button id="completedButton">Completed</button>
            <button id ="clearCompletedButton">Clear completed</button>`;

        newBlock.setAttribute('id', 'buttonsBlock')
        this.$el.appendChild(newBlock);

        const allButton = document.getElementById('allButton');
        allButton.addEventListener('click', () => {
            this.itemsLeft = window.todoArr.length;
            this.currentArray = window.todoArr;
            this.removeButtonsBlock();
            this.createButtonsBlock();
            this.clearList();
            this.renderItems(window.todoArr);
        })

        const activeButton = document.getElementById('activeButton');
        activeButton.addEventListener('click', () => {
            this.currentArray = window.todoArr.filter(todo => !todo.isChecked);
            this.itemsLeft = this.currentArray.length;
            this.removeButtonsBlock();
            this.createButtonsBlock();
            this.clearList();
            this.renderItems(this.currentArray);
        })

        const completedButton = document.getElementById('completedButton');
        completedButton.addEventListener('click', () => {
            this.currentArray = window.todoArr.filter(todo => todo.isChecked);
            this.itemsLeft = this.currentArray.length;
            this.removeButtonsBlock();
            this.createButtonsBlock();
            this.clearList();
            this.renderItems(this.currentArray);
        })

        const clearCompletedButton = document.getElementById('clearCompletedButton');
        clearCompletedButton.addEventListener('click', ()=> {
            const result = window.todoArr.filter(todo => !todo.isChecked);
            window.todoArr = [...result];
            localStorage.setItem('todos', JSON.stringify(window.todoArr));
            this.currentArray = window.todoArr;
            this.itemsLeft = window.todoArr.length;
            this.removeButtonsBlock();
            this.createButtonsBlock();
            this.clearList();
            this.renderItems(this.currentArray);
        })


    }

    removeButtonsBlock () {
        const block = document.getElementById('buttonsBlock');
        block.parentNode.removeChild(block);
    }



    todoAdder = this.addNewTodo.bind(this);

    addNewTodo ({keyCode, target}) {
        if(keyCode === enterKey) {
           if(!inputFilterReg.test(target.value)) {
               return;
           }
           const newTodo = new Todo({text: target.value});
           window.todoArr = [...window.todoArr, newTodo];
           this.itemsLeft = window.todoArr.length;
           this.currentArray = [...this.currentArray, newTodo]
           this.removeButtonsBlock();
           this.createButtonsBlock();
           localStorage.setItem('todos', JSON.stringify(window.todoArr));
           target.value = '';
           this.clearList();
           this.renderItems(this.currentArray);
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

    refreshModalOpener (newModal) {
        const oldOpener = document.querySelector('.todo__button');
        oldOpener.parentNode.removeChild(oldOpener);
        const newOpener = this.createModalOpener();
        newOpener.addEventListener('click', () => {
            newModal.show();
        })
    }

    createModal () {
        const modal = new Modal();
        this.$el.appendChild(modal.markup);
        modal.addEventListeners();
        return modal;
    }


    modalAddListener () {
        document.addEventListener('add', () => {
            this.clearList();
            this.renderItems(this.currentArray);
        })
    }

    renderItems (currentArray) {
        currentArray.forEach((el) => {
            this.list.appendChild(el.getNewTodoMarkup());
            const todoCheckbox = el.getCheckboxElement()
            const todoRemover = el.getRemoveElement();
            const editElement = el.getEditElement();
            todoCheckbox.addEventListener('click', () => {
                el.isCheckedTogler();
            })
            todoRemover.addEventListener('click', (event) => {
                const todoId = +event.target.id.slice(7);
                const result = window.todoArr.filter(todo => todo.id !== todoId)
                window.todoArr = [...result];
                const filtredResult = currentArray.filter(todo => todo.id !== todoId);
                currentArray = [...filtredResult];
                localStorage.setItem('todos', JSON.stringify(window.todoArr))
                this.itemsLeft = currentArray.length;
                this.removeButtonsBlock();
                this.createButtonsBlock();
                this.clearList();
                this.renderItems(currentArray);
            })

            editElement.addEventListener('click', (event) => {
                el.isCheckedTogler();
                this.removeCurrentModal();
                const newModal = new Modal(el);
                this.$el.appendChild(newModal.markup);
                this.refreshModalOpener(newModal);
                newModal.show();
                newModal.addEventListeners();
            })
        })
    }

    removeCurrentModal () {
        const oldModal = document.getElementById('modalWindow');
        oldModal.parentNode.removeChild(oldModal);
    }

    initionalRender() {
        this.renderItems(window.todoArr);
        this.createModalOpener();
        this.modalAddListener();
        this.createButtonsBlock();
    }
   }

