import APIError from "../utils/APIError.js";
import { MulterError } from "multer";

const errorHandler = (err, _, res, next) => {
  if (!err) return next();
  console.log(err);
  if (err instanceof APIError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof MulterError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
