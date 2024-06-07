import prismaClient from "../apps/prismaClient.js";
import APIError from "../utils/APIError.js";

class RecruiterRepository {
  async getCredentials(email) {
    try {
      const recruiter = await prismaClient.recruiter.findUnique({
        where: { email },
      });

      if (!recruiter) throw new APIError(404, "recruiter not found");

      return recruiter;
    } catch (error) {
      console.log(error);
      throw APIError.parseError(error);
    }
  }
}

export default RecruiterRepository;
