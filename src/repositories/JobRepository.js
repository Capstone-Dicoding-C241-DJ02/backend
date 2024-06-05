import APIError from "../utils/APIError.js";

class JobRepository {
  /**
   *
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
    this.collection = "jobs";
  }

  async getMany(search = "") {
    try {
      const jobs = await this.db.job.findMany({
        where: {
          OR: [
            { title: { contains: search } },
            { city: { contains: search } },
            { business_sector: { contains: search } },
          ],
        },
        select: {
          id: true,
          title: true,
          logo: true,
          business_sector: true,
          city: true,
        },
        take: 10,
      });

      return jobs;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getById(id) {
    try {
      const job = await this.db.job.findUnique({ where: { id } });

      if (!job) throw new APIError(404, "Data not found");

      return job;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboard(jobId) {
    try {
      const job = await this.db.job.findUnique({ id: jobId });

      if (!job) throw new APIError(404, "Data not found");

      const candidates = await this.db.candidate.findMany({
        where: { jobId: jobId },
        select: {
          id: true,
          fullname: true,
          passphoto: true,
          title: true,
        },
        orderBy: { match_percentage: "desc" },
      });

      return { job, candidates };
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default JobRepository;
