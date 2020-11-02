import {TodoList} from "./TodoList.js";
import {Modal} from "./Modal.js";

export const todoList = new TodoList('.todo__list');
export const todoInput = document.querySelector('.todo__input');
export const modal = new Modal('.todo__modal')
export const plusButton = new Modal('.todo__button');
export const closeButton = new Modal('.todo__modal-close');
export const saveButton = new Modal('.todo__modal-save');

export const modalInputText = document.querySelector('.todo__modal-text');
export const modalCreationDate = document.querySelector('.todo__modal-creation');
export const modalExpirationDate = document.querySelector('.todo__modal-expiration')