import storage from "../apps/storage.js";
import APIError from "./APIError.js";

class StorageUtil {
  static async uploadToBucket(bucketName, path) {
    try {
      const bucket = storage.bucket(bucketName);
      const [result] = await bucket.upload(path);
      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  static async isUrlValid(url) {
    const response = await fetch(url);

    if (response.status === 404) return false;

    return true;
  }

  static async getSignedUrl(bucketName, filename) {
    try {
      const bucket = storage.bucket(bucketName);
      const [signedUrl] = await bucket.file(filename).getSignedUrl({
        action: "read",
        expires: new Date().setHours(23, 59, 0, 0),
      });

      if (!(await StorageUtil.isUrlValid(signedUrl)))
        throw new APIError(404, "File not found");

      return signedUrl;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default StorageUtil;
