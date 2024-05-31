import multer from "multer";
import APIError from "../utils/APIError.js";

const fileHandler = multer({
  limits: {
    fileSize: 2048,
  },
  fileFilter: (_, file, cb) => {
    const allowedMimetypes = ["jpg", "jpeg", "pdf", "png"];
    if (!allowedMimetypes.includes(file.mimetype)) {
      const err = new APIError(400, "File type is not valid");
      cb(err);
    }

    cb(null, true);
  },
});

export default fileHandler;
