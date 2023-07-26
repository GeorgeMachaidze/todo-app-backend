import Joi from "joi";

const addTodoSchema = async (data) => {
  return Joi.object({
    text: Joi.string().min(3).required().messages({
      "string.base": "text should be a string",
      "string.min": "text should include 3 characters",
      "any.required": "text is required",
    }),
    active: Joi.boolean().required(),
  });
};

export default addTodoSchema;
