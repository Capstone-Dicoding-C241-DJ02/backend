import APIError from "../utils/APIError.js";

class JobService {
  constructor(repository) {
    this.repository = repository;
  }

  async getJobs(search = "") {
    try {
      const jobs = await this.repository.getMany(search);

      return jobs;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getJobById(id) {
    try {
      const job = await this.repository.getById(id);

      return job;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboard(jobId) {
    try {
      const data = await this.repository.getLeaderboard(jobId);

      return data;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default JobService;
