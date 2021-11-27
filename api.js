const url = window.location.protocol;

const httpClient = axios.create({
  baseURL: url,
});

export default {
  getTodos() {
    return httpClient.get("/todos");
  },
  updateTodos(todos) {
    return httpClient.post("/todos", todos);
  },
};
