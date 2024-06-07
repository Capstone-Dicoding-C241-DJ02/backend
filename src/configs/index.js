import { config } from "dotenv";
config();

export default {
  CV_BUCKET_NAME: process.env.CV_BUCKET_NAME,
  PASSPHOTO_BUCKET_NAME: process.env.PASSPHOTO_BUCKET_NAME,
  SERVICE_ACCOUNT_KEY_PATH: process.env.SERVICE_ACCOUNT_KEY_PATH,
  DB_ID: process.env.DB_ID,
  TMP_PATH: process.env.TMP_PATH,
  SCORING_FUNC_URL: process.env.SCORING_FUNC_URL,
  AT_SECRET: process.env.AT_SECRET,
  RT_SECRET: process.env.RT_SECRET,
};
