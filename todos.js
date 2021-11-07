import api from "./api.js";

const todoNameInput = document.querySelector(".todoName");
const todoCheck = document.querySelector(".todoIsDone");
const todoSend = document.querySelector(".todoSend");
let todos = [];

const getTodos = async () => {
  try {
    const response = await api.getTodos();
    todos = response.data;
    renderTodos();
  } catch (err) {
    console.error(err);
  }
};

const postTodos = async () => {
  try {
    await api.updateTodos(todos);
    console.log("A lista frissült.");
    renderTodos();
  } catch (err) {
    console.error(err);
  }
};

const addTodo = async () => {
  const newTodo = {
    name: todoNameInput.value,
    isDone: todoCheck.checked,
    date: moment().format("YYYY-MM-DD"),
  };
  todos.push(newTodo);
  postTodos();
};

todoSend.addEventListener("click", () => {
  addTodo();
});
getTodos();
const renderTodos = () => {
  const todoContainer = document.querySelector(".todoContainer");
  todoContainer.innerHTML = "";
  let i = 0;
  todos.forEach((todo) => {
    const cardContent = document.createElement("a");
    const card = document.createElement("li");
    card.setAttribute("class", "todoCard text-center");
    card.tabIndex = i;
    const todoText = document.createElement("div");
    todoText.setAttribute("class", "todoText");
    todoText.textContent = todo.name;
    const checkLabel = document.createElement("label");
    checkLabel.setAttribute("for", "isChecked");
    checkLabel.setAttribute("class", "todoLabel");
    checkLabel.textContent = "Elkészült -e?";
    const todoCheck = document.createElement("img");
    todoCheck.setAttribute("class", "isChecked");
    if (todo.isDone) {
      todoCheck.src = "./assets/checkmark.png";
    } else {
      todoCheck.src = "./assets/x.png";
    }
    todoCheck.addEventListener("click", () => {
      checkboxRefresh(card.tabIndex);
    });
    todoCheck.checked = todo.isDone;
    const todoDate = document.createElement("div");
    todoDate.setAttribute("class", "todoDate");
    todoDate.textContent = todo.date;
    const todoDelete = document.createElement("img");
    todoDelete.setAttribute("class", "delete");
    todoDelete.src = "./assets/bin.png";
    todoDelete.textContent = "Törlés";
    todoDelete.addEventListener("click", () => {
      deleteTodo(card.tabIndex);
    });
    cardContent.appendChild(todoDate);
    cardContent.appendChild(todoText);
    cardContent.appendChild(todoCheck);
    cardContent.appendChild(document.createElement("br"));
    cardContent.appendChild(todoDelete);
    card.appendChild(cardContent);
    todoContainer.appendChild(card);
    i++;
  });
};
const checkboxRefresh = (index) => {
  todos[index].isDone = !todos[index].isDone;
  postTodos();
};
const deleteTodo = (index) => {
  todos.splice(index, 1);
  postTodos();
};
