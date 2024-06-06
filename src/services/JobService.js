import JobRepository from "../repositories/JobRepository.js";
import APIError from "../utils/APIError.js";

const jobRepository = new JobRepository();

class JobService {
  async getJobs(search = "") {
    try {
      const jobs = await jobRepository.getMany(search);

      return jobs;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getJobById(id) {
    try {
      const job = await jobRepository.getById(id);

      return job;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboard(jobId) {
    try {
      const data = await jobRepository.getLeaderboard(jobId);

      return data;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default JobService;
