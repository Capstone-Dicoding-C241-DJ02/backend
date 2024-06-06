import Joi from "joi";

const candidateSchema = Joi.object({
  fullname: Joi.string()
    .required()
    .messages({ "string.empty": "Nama lengkap harus diisi" }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email harus diisi",
    "string.email": "Format email tidak valid",
  }),
  phone: Joi.string()
    .regex(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/)
    .required()
    .messages({
      "string.pattern.base": "Nomor handphone tidak valid",
      "string.empty": "Nomor handphone harus diisi",
    }),
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Title anda harus diisi" }),
  additional_link: Joi.string()
    .optional()
    .uri()
    .messages({ "string.uri": "Link tidak valid" }),
});

export default candidateSchema;
