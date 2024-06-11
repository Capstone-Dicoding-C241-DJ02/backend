import prismaClient from "../apps/prismaClient.js";
import APIError from "../utils/APIError.js";

class JobRepository {
  constructor() {
    this.take = 10;
  }

  async getMany({ page = 1, search = "" }) {
    try {
      const jobs = await prismaClient.job.findMany({
        where: {
           title: { contains: search },
        },
        select: {
          id: true,
          title: true,
          logo: true,
          business_sector: true,
          city: true,
        },
        skip: this.take * (page - 1),
        take: this.take,
      });

      const totalData = await prismaClient.job.count({
        where: {
          title: { contains: search },
        },
      });

      return { totalData, jobs };
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getById(id) {
    try {
      const job = await prismaClient.job.findUnique({ where: { id } });

      if (!job) throw new APIError(404, "Data not found");

      return job;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboard(jobId) {
    try {
      const job = await prismaClient.job.findUnique({ where: { id: jobId } });

      if (!job) throw new APIError(404, "Data not found");

      const candidates = await prismaClient.candidate.findMany({
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

  async createJob(data) {
    try {
      const job = await prismaClient.job.create({
        data,
      });

      return job;
    } catch (err) {
      throw APIError.parseError(err);
    }
  }
}

export default JobRepository;
