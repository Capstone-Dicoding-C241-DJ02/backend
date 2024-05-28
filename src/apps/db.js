import {Firestore} from '@google-cloud/firestore';
import configs from '../configs/index.js';

const db = new Firestore({
  keyFilename: configs.SERVICE_ACCOUNT_KEY_PATH,
  databaseId: configs.DB_ID,
});

export default db;
