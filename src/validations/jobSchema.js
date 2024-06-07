import Joi from "joi";

const jobSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Judul lowongan harus diisi" }),
  business_sector: Joi.string()
    .required()
    .messages({ "string.empty": "Sektor bisnis harus diisi" }),
  desc: Joi.string()
    .required()
    .messages({ "string.empty": "Deskripsi pekerjaan harus diisi" }),
  city: Joi.string()
    .required()
    .messages({ "string.empty": "Lokasi harus diisi" }),
});

export default jobSchema;
