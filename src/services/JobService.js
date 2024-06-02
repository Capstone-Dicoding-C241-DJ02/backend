import APIError from "../utils/APIError.js";

class JobService {
  constructor(jobRepository, candidateRepository) {
    this.jobRepository = jobRepository;
    this.candidateRepository = candidateRepository;
  }

  async getJobs() {
    try {
      const jobs = await this.jobRepository.getMany();

      return jobs;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getJobById(id) {
    try {
      const job = await this.jobRepository.getById(id);

      return job;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboard(jobId) {
    try {
      const { Job, candidates } =
        await this.candidateRepository.getFromLeaderboard(jobId);
      const data = {
        job: Job,
        candidates,
      };
      return data;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default JobService;
