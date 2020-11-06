import {TodoList} from "./TodoList.js";
import {Todo} from "./Todo.js";


export let addTodo = new Event('add', {bubbles: true})

window.addEventListener('load', () => {
    if(localStorage.getItem('todos')) {
        window.todoArr =  getTodosFromLocalStorage()
    } else {
        window.todoArr = [];
    }
    const todoList = new TodoList('.todo');
    todoList.initionalRender();

} )

function getTodosFromLocalStorage(){
    return JSON.parse(localStorage.getItem('todos')).map(el => {
        return new Todo(el)
    });
}

