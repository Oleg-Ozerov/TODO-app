export class TodoList {
    constructor(selector) {
        this.$el = document.querySelector(selector)
    }

    toLocalStorage () {
        localStorage.setItem('todos', this.$el.innerHTML);
    }

    addNewTodo (todo) {
        const newTodo = document.createElement('li');

        newTodo.className = 'todo__list-item';
        newTodo.innerHTML = `<input type="checkbox" class="todo__list-checkbox"><span>${todo.creationTime} </span><span>${todo.text} </span><span>${todo.expirationTime}</span>`;
        this.$el.appendChild(newTodo);
        this.toLocalStorage();
    }
}