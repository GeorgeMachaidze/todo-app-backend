import Todo from "../models/Todo.js";
import addTodoSchema from "../schemas/add-todo-schema.js";
import { v4 as uuidv4 } from "uuid";

export const getAllTodos = async (req, res) => {
  const data = await Todo.find();

  return res.status(200).json(data);
};

export const addTodo = async (req, res) => {
  const { body } = req;

  const validator = await addTodoSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { text, active } = value;

  const id = uuidv4();

  await Todo.create({
    text,
    id,
    active,
  });

  return res.status(201).json({ message: "Todo created successfully" });
};

//put request
//delete request 2
