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

  async getFromLeaderboards(leaderboardId) {
    try {
      const candidates = await this.db.leaderboard.findUnique({
        where: { id: leaderboardId },
        include: {
          candidates: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
              match_percentage: { where: { leaderboardId } },
            },
          },
        },
      });

      return candidates;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default CandidateRepository;
