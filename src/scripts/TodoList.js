import {Todo} from "./Todo.js";
import {enterKey, inputFilterReg} from "./constanses.js";
import {Modal} from "./Modal.js";
import {createDate} from "./createDate.js";
import {plusHandler} from "./main.js";

   export class TodoList {
        itemsLeft = window.todoArr.length;
        display = 'none';
        currentArray = window.todoArr;
        displayTogglerBind = this.displayToggler.bind(this);
        todoAdder = this.addNewTodo.bind(this);

        constructor(selector) {
            this.$el = document.querySelector(selector);
            this.sortList = this.createSortList();
            this.sortButton = this.createSortButton();
            this.input = this.createInput();
            this.list = this.createTodoList();
            this.modal = this.createModal();

            this.showModal = this.modal.show.bind(this.modal);
        }

        displayToggler () {
            if(this.display === 'none') {
                this.display = 'block';
            } else this.display = 'none';

            this.sortList.style.display = this.display;
        }

        createSortButton () {
            const newSortButton = document.createElement('span');

            newSortButton.classList.add('todo__sort')
            newSortButton.addEventListener('click', this.displayTogglerBind);

            this.$el.appendChild(newSortButton);
        }

        createSortList () {
            const sortList = document.createElement('ul');

            sortList.innerHTML = `
                <li class="todo__sortList-item">
                  <input type="text" class="todo__sortList-text" placeholder="Search...">
                  <button class="todo__sortList-find">Find</button>
                </li>
                <li class="todo__sortList-item">
                  <input type="date" class="todo__sortList-date" value="${createDate()}">
                  <button class="todo__sortList-search">Find</button>
                </li>
                
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

        renderSortedItems(arrayToRender) {
            this.displayTogglerBind();
            this.clearList();
            this.renderItems(arrayToRender);
        }

        addSortListEventListeners () {
            const textInput = document.querySelector('.todo__sortList-text');
            const findInput = document.querySelector('.todo__sortList-find')
            const dateInput = document.querySelector('.todo__sortList-date');
            const findDate = document.querySelector('.todo__sortList-search')
            const byOldest = document.getElementById('byOldest');
            const byLatest = document.getElementById('byLatest');
            const fromAToZ = document.getElementById('fromAToZ');
            const fromZToA = document.getElementById('fromZToA');

            findInput.addEventListener('click', () => {
                const result = this.currentArray.filter(todo => todo.text.includes(textInput.value));

                this.renderSortedItems(result);
            } )

            findDate.addEventListener('click', () => {
                const result = this.currentArray.filter(todo => {
                    return todo.creationTime === dateInput.value || todo.expirationTime === dateInput.value;
                })

                this.renderSortedItems(result);
            })

            byOldest.addEventListener('click', () => {
                this.currentArray = this.currentArray.sort((a,b) => a.creationTime.localeCompare(b.creationTime));
                this.renderSortedItems(this.currentArray);
            });

            byLatest.addEventListener('click', () => {
                this.currentArray = this.currentArray.sort((a,b) => b.creationTime.localeCompare(a.creationTime));
                this.renderSortedItems(this.currentArray);
            })

            fromAToZ.addEventListener('click', () => {
                this.currentArray = this.currentArray.sort( (a, b) => a.text.localeCompare(b.text));
                this.renderSortedItems(this.currentArray)
            })

            fromZToA.addEventListener('click', () => {
                this.currentArray = this.currentArray.sort( (a, b) => b.text.localeCompare(a.text));
                this.renderSortedItems(this.currentArray)
            })
        }

        createInput () {
            const newInput = document.createElement('input');

            newInput.setAttribute('type', 'text');
            newInput.setAttribute('placeholder', 'What needs to be done?');
            newInput.classList.add('todo__input');
            newInput.addEventListener('keypress',this.todoAdder );
            newInput.addEventListener('keyup', this.validateInput);

            this.$el.appendChild(newInput);

            return newInput;
        }

        createTodoList() {
            const newList = document.createElement('ul');

            newList.classList.add('todo__list');
            this.$el.appendChild(newList);

            return newList;
        }

        createBlock () {
            const newBlock = document.createElement('div');

            newBlock.innerHTML = `
                <span class="todo__block-counter">
                  ${this.itemsLeft} items left 
                </span>
                <button id="allButton" class="todo__block-button">All</button>
                <button id="activeButton" class="todo__block-button">Active</button>
                <button id="completedButton" class="todo__block-button">Completed</button>
                <button id ="clearCompletedButton" class="todo__block-button">Clear completed</button>`;


            newBlock.setAttribute('id', 'buttonsBlock')
            newBlock.classList.add('todo__block')
            this.$el.appendChild(newBlock);
        }

        allButtonAddListener () {
            const allButton = document.getElementById('allButton');

            allButton.addEventListener('click', () => {
                this.itemsLeft = window.todoArr.length;
                this.currentArray = window.todoArr;
                this.removeButtonsBlock();
                this.createButtonsBlock();
                this.clearList();
                this.renderItems(window.todoArr);
            })
        }

        activeButtonAddListener() {
            const activeButton = document.getElementById('activeButton');

            activeButton.addEventListener('click', () => {
                this.currentArray = window.todoArr.filter(todo => !todo.isChecked);
                this.itemsLeft = this.currentArray.length;
                this.removeButtonsBlock();
                this.createButtonsBlock();
                this.clearList();
                this.renderItems(this.currentArray);
            })
        }

        completedButtonAddListener() {
            const completedButton = document.getElementById('completedButton');

            completedButton.addEventListener('click', () => {
                this.currentArray = window.todoArr.filter(todo => todo.isChecked);
                this.itemsLeft = this.currentArray.length;
                this.removeButtonsBlock();
                this.createButtonsBlock();
                this.clearList();
                this.renderItems(this.currentArray);
            })
        }

        clearCompletedButtonAddListener () {
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

        createButtonsBlock () {
            this.createBlock();
            this.allButtonAddListener();
            this.activeButtonAddListener();
            this.completedButtonAddListener();
            this.clearCompletedButtonAddListener();
        }

        removeButtonsBlock () {
            const block = document.getElementById('buttonsBlock');

            block.parentNode.removeChild(block);
        }


        addNewTodo ({keyCode, target}) {
            if(keyCode === enterKey && inputFilterReg.test(target.value)) {
                const newTodo = new Todo({ text: target.value });

                window.todoArr = [...window.todoArr, newTodo];
                this.itemsLeft = window.todoArr.length;
                this.currentArray = [...this.currentArray, newTodo]
                this.removeButtonsBlock();
                this.createButtonsBlock();
                localStorage.setItem('todos', JSON.stringify(window.todoArr));
                target.value = '';
                this.renderItems(window.todoArr);
                this.clearList();
                this.renderItems(this.currentArray);
            }
        }

        clearList () {
            this.list.innerHTML = '';
        }

        validateInput ({ target }) {
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
            plusButton.addEventListener('click', (event) => {
                event.target.dispatchEvent(plusHandler)
            })
            plusButton.addEventListener('click', this.showModal);
            this.$el.appendChild(plusButton);

            return plusButton;
        }

        refreshModalOpener (newModal) {
            const oldOpener = document.querySelector('.todo__button');
            const newOpener = this.createModalOpener();

            oldOpener.parentNode.removeChild(oldOpener);
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
                this.renderItems(window.todoArr);
                this.currentArray = [...window.todoArr];
                this.itemsLeft = window.todoArr.length;
                this.removeButtonsBlock();
                this.createButtonsBlock();
            })
        }

        todoCheckboxAddListener (el) {
            const todoCheckbox = el.getCheckboxElement();

            todoCheckbox.addEventListener('click', (event) => {
                el.isCheckedTogler();
            })
        }

        todoRemoverAddListener (el, array) {
            const todoRemover = el.getRemoveElement();

            todoRemover.addEventListener('click', (event) => {
                const todoId = +event.target.id.slice(7);
                const result = window.todoArr.filter(todo => todo.id !== todoId)
                const filtredResult = array.filter(todo => todo.id !== todoId);

                window.todoArr = [...result];
                array = [...filtredResult];
                this.currentArray = [...array];
                localStorage.setItem('todos', JSON.stringify(window.todoArr))
                this.itemsLeft = array.length;
                this.removeButtonsBlock();
                this.createButtonsBlock();
                this.clearList();
                this.renderItems(array);
            })
        }

        editElementAddListener (el) {
            const editElement = el.getEditElement();
            editElement.addEventListener('click', (event) => {
                event.preventDefault();
                this.removeCurrentModal();

                const newModal = new Modal(el);
                newModal.isModalForEditing = true;

                this.$el.appendChild(newModal.markup);
                this.refreshModalOpener(newModal);
                newModal.show();
                newModal.addEventListeners();
            });

        }

        renderItems (currentArray) {
            currentArray.forEach((el) => {
                this.list.appendChild(el.getNewTodoMarkup());
                this.todoCheckboxAddListener(el);
                this.todoRemoverAddListener(el, currentArray);
                this.editElementAddListener(el);
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

document.addEventListener('plusHandler', () => {
    const oldModal = document.querySelector('.todo__modal');
    const parent = oldModal.parentElement;
    oldModal.parentNode.removeChild(oldModal);

    const newModal = new Modal();

    parent.appendChild(newModal.markup);
    newModal.show();
    newModal.addEventListeners();

})
