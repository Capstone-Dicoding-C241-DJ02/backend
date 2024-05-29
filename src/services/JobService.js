import APIError from "../utils/APIError.js";

class JobService {
  constructor(repository) {
    this.repository = repository;
  }

  async getJobs() {
    try {
      const jobs = await this.repository.getMany();

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
}

export default JobService;
