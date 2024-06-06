import JobService from "../services/JobService.js";
import APIError from "../utils/APIError.js";

const jobService = new JobService();

class JobController {
  static async getJobs(req, res, next) {
    try {
      const { search } = req.query;
      const jobs = await jobService.getJobs(search);

      res.status(200).json({
        message: "Successfully retrieved data",
        data: { jobs },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJobById(req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) throw new APIError(400, "id should be a number");

      const job = await jobService.getJobById(Number(id));

      res.status(200).json({
        message: "Successfully retrieved data",
        data: { job },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJobLeaderboard(req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) throw new APIError(400, "id should be a number");

      const data = await jobService.getLeaderboard(Number(id));

      res.status(200).json({
        message: "Successfully retrieved data",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default JobController;
