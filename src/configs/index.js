import {config} from 'dotenv';
config();

export default {
  BUCKET_NAME: process.env.BUCKET_NAME,
  SERVICE_ACCOUNT_KEY_PATH: process.env.SERVICE_ACCOUNT_KEY_PATH,
  DB_ID: process.env.DB_ID,
};
