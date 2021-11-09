const todos = require("./todos.json");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static(__dirname));
app.use(express.json());

app.get("/todos", (req, res) => {
  res.json(todos);
  console.log(todos);
  res.end();
});
app.post("/todos", (req, res) => {
  fs.writeFile("todos.json", JSON.stringify(req.body, null, "\t"), (err) => {
    if (err) console.err(err);
  });
  res.end();
});
const PORT = process.env.PORT || 8080;
app.listen(PORT);
