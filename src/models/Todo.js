import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  text: {
    type: Schema.Types.String,
    required: true,
  },
  id: {
    type: Schema.Types.String,
    required: true,
  },
  active: {
    type: Schema.Types.Boolean,
    required: true,
  },
});

const Todo = model("Todo", todoSchema);

export default Todo;
