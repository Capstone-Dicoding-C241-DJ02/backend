import APIError from "../utils/APIError.js";

class CandidateRepository {
  /**
   *
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
    this.collection = "candidates";
  }

  async getDetails(candidateId) {
    try {
      const candidate = await this.db.candidate.findUnique({
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
      const newCandidate = await this.db.candidate.create({
        data: { ...candidateData, jobId },
      });

      return newCandidate;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default CandidateRepository;
