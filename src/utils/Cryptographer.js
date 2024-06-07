import jwt from "jsonwebtoken";
import APIError from "./APIError.js";
import bcrypt from "bcrypt";

class Cryptographer {
  static createToken(data, secret, expired) {
    const token = jwt.sign(data, secret, { expiresIn: expired });

    return token;
  }

  static async verifyToken(token, secret) {
    try {
      const payload = await jwt.verify(token, secret);

      return payload;
    } catch (err) {
      throw APIError.parseError(err);
    }
  }

  static async hash(data) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data, salt);

    return hashed;
  }

  static async compare(data, hashed) {
    return await bcrypt.compare(data, hashed);
  }
}

export default Cryptographer;
