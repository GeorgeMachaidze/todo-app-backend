import Project from "../models/Project.js";

export const getAllproject = async (req, res) => {
  const data = await Project.find();

  return res.status(200).json(data);
};
