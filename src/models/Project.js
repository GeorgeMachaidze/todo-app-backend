import { Schema, model } from "mongoose";

const projectSchema = new Schema({
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
const Project = model("project", projectSchema);

export default Project;
