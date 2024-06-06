import APIError from "../utils/APIError.js";

const validate = (schema, data) => {
  const result = schema.validate(data);

  if (result.error) throw new APIError(400, result.error.message);

  return result.value;
};

export default validate;
