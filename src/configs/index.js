import {config} from 'dotenv';
config();

export default {
  BUCKET_NAME: process.env.BUCKET_NAME,
  SERVICE_ACCOUNT_KEY_PATH: process.env.SERVICE_ACCOUNT_KEY_PATH,
  DB_ID: process.env.DB_ID,
  CV_SUMMARIZE_MODEL_URL: process.env.CV_SUMMARIZE_MODEL_URL,
  CV_RANKING_MODEL_URL: process.env.CV_RANKING_MODEL_URL
};
