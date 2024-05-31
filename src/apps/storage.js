import { Storage } from "@google-cloud/storage";
import configs from "../configs/index.js";

const storage = new Storage({
  keyFile: configs.SERVICE_ACCOUNT_KEY_PATH,
});

export default storage;
