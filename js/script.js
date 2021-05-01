'use strict'; 

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {

    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
    `);

     if (todo.completed) {
       this.todoCompleted.append(li);
     } else {
       this.todoList.append(li);
     }
  }

  addTodo(event) {
    event.preventDefault();
    if(this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.input.value = '';
      this.render();
    } else {
      alert('Нельзя добавить пустое поле!');
    }
    
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2,3);
  }

  completedItem() {
    
  }

  deleteItem(target) {
    this.todoData.forEach((item, li) => {
      if (item.key === target.parentNode.parentNode.key) {
        this.todoData.delete(li.key);
      }
    });
  }

  handler() {
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.addEventListener('click', event => {
      let target = event.target;

      if (target.closest('.todo-complete')) {
        
          this.completedItem(target);
        
      } else if (target.closest('.todo-remove')) {
        this.deleteItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();