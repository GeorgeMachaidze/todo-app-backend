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

  const newTodo = new Todo({ text, id, active });

  return res.status(201).json(newTodo);
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.deleteOne();

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteAllComplatedTodos = async (req, res) => {
  try {
    await Todo.deleteMany({ active: false });

    return res
      .status(200)
      .json({ message: "All active todos deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const editTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ id });

    todo.active = !todo.active;
    await todo.save();

    return res.status(204).json({
      message: "Todo status updated successfully",
      active: todo.active,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
