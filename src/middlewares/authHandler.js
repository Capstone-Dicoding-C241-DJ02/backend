import configs from "../configs/index.js";
import APIError from "../utils/APIError.js";
import Cryptographer from "../utils/Cryptographer.js";

const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new APIError(403, "No Authorization provided");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new APIError(403, "No token provided");

    const { email } = await Cryptographer.verifyToken(token, configs.AT_SECRET);

    req.email = email;

    next();
  } catch (error) {
    let statusCode = 403;
    if (error instanceof APIError) statusCode = error.status;

    res.status(statusCode).json({
      message: error.message,
    });
  }
};

export default authHandler;
