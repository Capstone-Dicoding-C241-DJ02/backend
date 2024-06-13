import JobRepository from "../repositories/JobRepository.js";
import APIError from "../utils/APIError.js";
import StorageUtil from "../utils/StorageUtil.js";
import configs from "../configs/index.js";
import deleteTemporaryFile from "../utils/deleteTemporaryFile.js";

const jobRepository = new JobRepository();

class JobService {
  async getJobs(page, search) {
    try {
      const result = await jobRepository.getMany({ page, search });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async createJob(data) {
    try {
      const { logo_path, ...rest } = data;
      const file = await StorageUtil.uploadToBucket(
        configs.LOGO_BUCKET_NAME,
        logo_path
      );
      const publicUrl = file.publicUrl();

      const result = await jobRepository.createJob({
        ...rest,
        logo: publicUrl,
      });

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    } finally {
      deleteTemporaryFile(data.logo_path);
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
      // const candidates = ca
      data.candidates = await Promise.all(
        data.candidates.map(async (candidate) => ({
          ...candidate,
          passphoto: await StorageUtil.getSignedUrl(
            configs.PASSPHOTO_BUCKET_NAME,
            candidate.passphoto
          ),
        }))
      );

      return data;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default JobService;
