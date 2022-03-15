const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul")

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener("submit", function(event){
  event.preventDefault();
  text = input.value
  if (text.length > 0) {
    add();
  }
});

function add(todo) {
  let todoText = input.value;
  
  if (todo){
    todoText = todo.text;
  }
  
  const li = document.createElement("li");
  li.innerText = todoText;
  li.classList.add("list-group-item");
  
  if (todo && todo.completed) {
    li.classList.add("text-decoration-line-through");
    saveData();
  }
  
  li.addEventListener("contextmenu", function(event){
    event.preventDefault();
    li.remove();
    saveData();
  });
  
  li.addEventListener("click", function() {
    li.classList.toggle("text-decoration-line-through");
    saveData();
  });
  
  ul.appendChild(li);
  input.value = "";
  saveData();
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  
  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
