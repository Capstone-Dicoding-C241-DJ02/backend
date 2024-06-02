import { PrismaClient } from "@prisma/client";
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

  async getFromLeaderboard(jobId) {
    try {
      const leaderboard = await this.db.leaderboard.findUnique({
        where: { jobId: jobId },
        include: {
          Job: {
            select: {
              id: true,
              logo: true,
              title: true,
              business_sector: true,
              city: true,
            },
          },
          candidates: {
            select: {
              id: true,
              fullname: true,
              passphoto: true,
              title: true,
            },
            orderBy: { match_percentage: "desc" },
          },
        },
      });

      if (!leaderboard) throw new APIError(404, "Data not found");

      return leaderboard;
    } catch (error) {
      throw APIError.parseError(error);
    }
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

  async addToLeaderboard(jobId, candidateData) {
    try {
      const { leaderboardId } = await this.db.job.findUnique({
        where: { id: jobId },
        select: { leaderboardId: true },
      });

      if (!leaderboardId) throw new APIError(404, "Data not found");

      const newCandidate = await this.db.candidate.create({
        data: { ...candidateData, leaderboardId },
      });

      return newCandidate;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default CandidateRepository;
