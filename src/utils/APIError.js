import jwt from "jsonwebtoken";

class APIError extends Error {
  constructor(status = 500, message = "Internal Server error") {
    super(message);
    this.status = status;
  }

  static parseError(err) {
    console.log(err);
    if (err instanceof jwt.JsonWebTokenError)
      throw new APIError(403, err.message);

    if (err instanceof APIError) throw new APIError(err.status, err.message);

    throw new APIError();
  }
}

export default APIError;
