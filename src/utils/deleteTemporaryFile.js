import fs from "fs";
import APIError from "./APIError.js";

const deleteTemporaryFile = (path) => {
  if (!fs.existsSync(path))
    throw new APIError(500, "File not exist in temporary folder");

  fs.unlinkSync(path);
  return true;
};

export default deleteTemporaryFile;
