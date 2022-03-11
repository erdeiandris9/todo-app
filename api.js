const httpClient = axios.create({
  baseURL: "https://ea-todo-app.herokuapp.com",
});

export default {
  getTodos() {
    return httpClient.get("/todos");
  },
  updateTodos(todos) {
    return httpClient.post("/todos", todos);
  },
};
