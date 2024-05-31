import APIError from "../utils/APIError.js";

class JobRepository {
  constructor(db) {
    this.db = db;
    this.collection = "jobs";
  }

  async getMany() {
    try {
      const jobs = await this.db.job.findMany({
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
}

export default JobRepository;
