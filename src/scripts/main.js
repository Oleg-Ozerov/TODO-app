import { todoList, todoInput, modalInputText, modalExpirationDate, saveButton, modalCreationDate, closeButton, plusButton} from "./DOMelements.js";
import {
    todoInputHandler,
    modalCreationDateHandler,
    modalExpirationDateHandler,
    modalInputTextHandler,
    plusButtonHandler,
    closeButtonHandler,
    saveButtonHandler, modalWindowCloser
} from "./callbacks.js";

todoInput.addEventListener('keypress', todoInputHandler);

modalCreationDate.addEventListener('change', modalCreationDateHandler);
modalExpirationDate.addEventListener('change', modalExpirationDateHandler)
modalInputText.addEventListener('change', modalInputTextHandler)

plusButton.$el.addEventListener('click', plusButtonHandler);
closeButton.$el.addEventListener('click', closeButtonHandler);
saveButton.$el.addEventListener('click', saveButtonHandler);

window.addEventListener('click', modalWindowCloser);

if (localStorage.getItem('todos')) {
    todoList.$el.innerHTML = localStorage.getItem('todos');
}
