import prismaClient from "../apps/prismaClient.js";
import APIError from "../utils/APIError.js";

class CandidateRepository {
  async getDetails(candidateId) {
    try {
      const candidate = await prismaClient.candidate.findUnique({
        where: { id: candidateId },
      });

      if (!candidate) throw new APIError(404, "Data not found");

      return candidate;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async applyToJob(jobId, candidateData) {
    try {
      const newCandidate = await prismaClient.candidate.create({
        data: { ...candidateData, jobId },
      });

      return newCandidate;
    } catch (error) {
      console.log(error);
      throw APIError.parseError(error);
    }
  }

  async addCvCummarize(cv_name, summarized_cv) {
    try {
      const candidate = await prismaClient.candidate.findFirst({
        where: { cv_name },
      });

      if (!candidate) throw new APIError(404, "candidate not found");

      const result = await prismaClient.candidate.update({
        where: { id: candidate.id },
        data: { cv_summary: summarized_cv },
      });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default CandidateRepository;
