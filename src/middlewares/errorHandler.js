import APIError from "../utils/APIError.js";
import { MulterError } from "multer";

const errorHandler = (err, _, res, next) => {
  if (!err) return next();

  if (err instanceof APIError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof MulterError) {
    let message = err.message;
    if (err.message === "File too large") {
      message = "Max cv file is 2MB";
    }
    return res.status(400).json({ message: message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
