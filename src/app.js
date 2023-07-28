import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import {
  getAllTodos,
  addTodo,
  deleteTodo,
  deleteAllComplatedTodos,
  editTodoStatus,
} from "./controllers/todo-controller.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.delete("/api/todos/active", deleteAllComplatedTodos);

app.get("/api/todos", getAllTodos);

app.post("/api/todos", addTodo);

app.delete("/api/todos/:id", deleteTodo);

app.put("/api/todos/:id", editTodoStatus);

app.listen(3000);
