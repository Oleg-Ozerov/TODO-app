import {enterKey, inputFilterReg, wrongInputValue} from "./constanses.js";
import {
    modal,
    modalCreationDate,
    modalExpirationDate,
    modalInputText,
    saveButton,
    todoInput,
    todoList
} from "./DOMelements.js";
import {Todo} from "./Todo.js";
import {createDate} from "./createDate.js";

function filterInput (element) {
    return !inputFilterReg.test(element.value)
}

export const todoInputHandler = ({ keyCode }) => {
    if(keyCode === enterKey) {
        if (filterInput(todoInput)) {
            todoInput.classList.add('mistake');
            return;
        }

        const todo = new Todo(createDate(), todoInput.value, createDate(true));

        todoList.addNewTodo(todo);
        todoInput.value = '';
        todoInput.classList.remove('mistake');
    }
}

export const modalCreationDateHandler = () => {
    if (modalCreationDate.value > modalExpirationDate.value) {
        modalExpirationDate.classList.add(wrongInputValue)
        saveButton.$el.setAttribute('disabled', 'disabled')
        return;
    }

    saveButton.$el.removeAttribute('disabled');
    modalExpirationDate.classList.remove(wrongInputValue);
}

export const modalExpirationDateHandler = () => {
    if(modalExpirationDate.value >= modalCreationDate.value) {
        modalExpirationDate.classList.remove(wrongInputValue);
        saveButton.$el.removeAttribute('disabled');
    } else {
        modalExpirationDate.classList.add(wrongInputValue);
        saveButton.$el.setAttribute('disabled', 'disabled');
    }
}

export const modalInputTextHandler = () => {
    modalInputText.classList.remove(wrongInputValue);
}

export const plusButtonHandler = () => {
    modalCreationDate.value = createDate();
    modalExpirationDate.value = createDate(true);
    modal.show();
}

export const closeButtonHandler = () => {
    modalExpirationDate.classList.remove(wrongInputValue);
    saveButton.$el.removeAttribute('disabled');
    modal.hide();
}

export const saveButtonHandler = () => {
    if (filterInput(modalInputText)) {
        modalInputText.classList.add(wrongInputValue)
        return;
    }
    const todo = new Todo(modalCreationDate.value, modalInputText.value, modalExpirationDate.value);

    todoList.addNewTodo(todo);
    modalInputText.value = '';
    modalCreationDate.value = createDate();
    modalExpirationDate.value = createDate(true);
    modal.hide();
}

export const modalWindowCloser = ({target}) => {
    if(target === modal.$el) {
        modalExpirationDate.classList.remove(wrongInputValue);
        saveButton.$el.removeAttribute('disabled');
        modal.hide();
    }
}