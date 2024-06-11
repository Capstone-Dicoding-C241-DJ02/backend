import multer from "multer";
import APIError from "../utils/APIError.js";
import configs from "../configs/index.js"

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, configs.TMP_PATH);
  },
  filename: (_, file, cb) => {
    const suffix = +new Date();
    cb(null, `${suffix}_${file.originalname}`);
  },
});
const fileHandler = multer({
  storage,
  limits: {
    fileSize: 2_048_000,
  },
  preservePath: true,
  fileFilter: (_, file, cb) => {
    const allowedMimetypes = ["jpg", "jpeg", "pdf", "png"];
    const fileMimetype = file.mimetype.split("/")[1];
    if (!allowedMimetypes.includes(fileMimetype)) {
      const err = new APIError(400, "File type is not valid");
      cb(err);
    }

    cb(null, true);
  },
});

export default fileHandler;
