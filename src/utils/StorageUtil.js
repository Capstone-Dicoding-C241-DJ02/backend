import storage from "../apps/storage.js";
import APIError from "./APIError.js";

class StorageUtil {
  static async uploadToBucket(bucketName, path) {
    try {
      const bucket = storage.bucket(bucketName);
      await bucket.upload(path);
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  static async getSignedUrl(bucketName, filename) {
    try {
      const bucket = storage.bucket(bucketName);
      const signedUrl = await bucket.file(filename).getSignedUrl({
        action: "read",
        expires: new Date().setHours(0, 0, 0, 0),
      });

      return signedUrl;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default StorageUtil;
