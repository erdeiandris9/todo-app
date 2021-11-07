const httpClient = axios.create({
	baseURL: "http://localhost:8080",
});

export default {
	getTodos() {
		return httpClient.get("/todos");
	},
	updateTodos(todos) {
		return httpClient.post("/todos", todos);
	},
};
