import Joi from "joi";

const summarySchema = Joi.object({
  cv_name: Joi.string()
    .required()
    .messages({ "string.empty": "CV filename should not be empty" }),
  summarized_cv: Joi.string()
    .required()
    .messages({ "string.empty": "summarized CV is should not be empty" }),
});

export default summarySchema;
