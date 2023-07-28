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

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!uuidv4.isUUID(id)) {
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    const todo = await Todo.findOne({ id });
    console.log(todo);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.deleteOne();

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

//delete request 2
