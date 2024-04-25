// Access the data to be working and assigning to the variables
let form = document.querySelector("#new-todo-form");
let input = document.querySelector("#content");
let list = document.querySelector("#todo-list");

let catagory1 = document.querySelector('#catagory1');
let catagory2 = document.querySelector('#catagory2');

// Initialize todo list
let todoItems = JSON.parse(localStorage.getItem('todos')) || [];

// Function to create a new todo item
function createTodoItem(content, categoryClass) {
    let newTodo = document.createElement('div');
    newTodo.classList.add('todo-items');

    let label = document.createElement('label');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    let bubble = document.createElement('span');
    bubble.classList.add('bubble', categoryClass);

    let todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');

    let todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.value = content;
    todoInput.readOnly = true;

    label.appendChild(checkbox);
    label.appendChild(bubble);
    label.appendChild(todoContent);
    todoContent.appendChild(todoInput);

    var editDeleteBtn = document.createElement('div');
    editDeleteBtn.id = 'edit-delete-btn';
    label.appendChild(editDeleteBtn);
    
    var editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color:var(--light); margin-right: .2rem;"></i>'
    
    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash" style="color: var(--light)"></i>'
    
    editDeleteBtn.appendChild(editBtn);
    editDeleteBtn.appendChild(deleteBtn);

    editBtn.addEventListener('click', ()=>{
        if(todoInput.readOnly){
            todoInput.readOnly = false;
        }
        else{
            // Find the corresponding item in the todoItems array
            let index = todoItems.findIndex(item => item.content === todoInput.value && item.category === catagoryClass);
            if (index !== -1) {
                // Update the content of the item
                todoItems[index].content = todoInput.value;
            }
            // Save the updated todoItems array to local storage
            localStorage.setItem('todos', JSON.stringify(todoItems));
            todoInput.readOnly = true;
        }
    });

    
        deleteBtn.addEventListener('click', ()=>{
            newTodo.remove();
            let index = todoItems.findIndex(item => item.content === content && item.category === categoryClass);
            if (index !== -1) {
                todoItems.splice(index, 1);
            }
            localStorage.setItem('todos', JSON.stringify(todoItems));
        });

    newTodo.appendChild(label);

    list.appendChild(newTodo);

        
        let clearAll = document.querySelector('#clear-all');
        clearAll.addEventListener('click', ()=>{
            todoItems = [];
            localStorage.setItem('todos', JSON.stringify(todoItems));
            location.reload();
        });

}

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    let categoryClass;
    if(catagory1.checked){
        categoryClass = 'business';
    }
    else if(catagory2.checked){
        categoryClass = 'personal';
    }
    else{
        categoryClass = 'education'
    }

    todoItems.push({
      content: input.value,
      category: categoryClass
    });

    localStorage.setItem('todos', JSON.stringify(todoItems));

    createTodoItem(input.value, categoryClass);

    input.value = "";
});

window.onload = function() {
    let savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(function(todo) {
            createTodoItem(todo.content, todo.category);
        });
    }
};
