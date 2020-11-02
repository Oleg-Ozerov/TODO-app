import {TodoList} from "./TodoList.js";

export class Modal extends TodoList{
    show() {
        this.$el.style.display = 'block';
    }
    hide() {
        this.$el.style.display = 'none';
    }
}