import AuthService from "../services/AuthService.js";
import APIError from "../utils/APIError.js";

const authService = new AuthService();

class AuthController {
  static async login(req, res, next) {
    try {
      const { accessToken, refreshToken } = await authService.login(req.body);
      const tokenMaxAge = 30 * 24 * (60 * 60000);
      res.cookie("rft", refreshToken, {
        httpOnly: true,
        maxAge: tokenMaxAge,
        domain: "34.128.73.230",
      });
      res.status(200).json({
        message: "Successfully logged in",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAccessToken(req, res, next) {
    try {
      if (!req.cookies.rft) throw new APIError(403, "No token provided");

      const accessToken = await authService.getAccessToken(req.cookies.rft);

      res.status(200).json({
        message: "Successfully get access token",
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
