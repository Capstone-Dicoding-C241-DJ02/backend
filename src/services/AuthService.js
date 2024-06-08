import APIError from "../utils/APIError.js";
import RecruiterRepository from "../repositories/RecruiterRepository.js";
import Cryptographer from "../utils/Cryptographer.js";
import configs from "../configs/index.js";

const recruiterRepository = new RecruiterRepository();

class AuthService {
  getTokens(email) {
    const accessToken = Cryptographer.createToken(
      { email },
      configs.AT_SECRET,
      "15min"
    );
    const refreshToken = Cryptographer.createToken(
      { email },
      configs.RT_SECRET,
      "15days"
    );

    return { accessToken, refreshToken };
  }

  async getAccessToken(rft) {
    try {
      const { email } = await Cryptographer.verifyToken(rft, configs.RT_SECRET);

      const { accessToken } = this.getTokens(email);

      return accessToken;
    } catch (err) {
      throw APIError.parseError(err);
    }
  }

  async login(data) {
    try {
      const recruiter = await recruiterRepository.getCredentials(data.email);

      if (!(await Cryptographer.compare(data.password, recruiter.password))) {
        throw new APIError(400, "Email or password is not correct");
      }

      const { accessToken, refreshToken } = this.getTokens(recruiter.email);

      return { accessToken, refreshToken };
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default AuthService;
