import {TodoList} from "./TodoList.js";
import {Todo} from "./Todo.js";


export let addTodo = new Event('add', {bubbles: true});
export const plusHandler = new Event('plusHandler', {bubbles: true});

window.addEventListener('load', () => {
    isListAlreadyCreated();
    const todoList = new TodoList('.todo');

    todoList.initionalRender();

} )

function isListAlreadyCreated () {
    localStorage.getItem('todos') ? window.todoArr = getTodosFromLocalStorage() : window.todoArr = [];
}

function getTodosFromLocalStorage(){
    return JSON.parse(localStorage.getItem('todos')).map(el => {
        return new Todo(el)
    });
}

