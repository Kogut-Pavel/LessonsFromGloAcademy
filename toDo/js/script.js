'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');


const toDoData =  JSON.parse(localStorage.getItem('toDoData'));

const addToStorage = () => {
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  toDoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = 	'<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' + 
      '</div';
      
      if (item.completed) {
        todoCompleted.append(li);
        
      } else {
        todoList.append(li);
        
      }
      
      const btnTodoComplete = li.querySelector('.todo-complete');
      btnTodoComplete.addEventListener('click', function() {
        item.completed = !item.completed;
        console.log(item.completed);
        render();
        
      });

      const btnTodoRemove = li.querySelector('.todo-remove');
      btnTodoRemove.addEventListener('click', function() {
        li.parentNode.removeChild(li);
       
      });     

      if (localStorage.getItem('todos')) {
        toDoData.innerHTML = localStorage.getItem('todos');
      }
      
  });
};

todoControl.addEventListener('submit', function(event){
  event.preventDefault();
  
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  // const addToStorage = function() {
  //   localStorage.setItem(headerInput.value, newTodo.completed);
  // };

  if (headerInput.value.trim() !== '') {
    toDoData.push(newTodo);
    
    headerInput.value = '';
    
  }

  render();

});

render();