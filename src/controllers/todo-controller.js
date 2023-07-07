import Todo from "../models/Todo.js";
import addTodoSchema from "./models/Todo.js";

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
    //error detalebi ar gamiweria
  }

  const { text, id, active } = value;

  await Todo.create({
    text,
    id,
    active,
  });
};

//post request
//put request
//delete request 2
