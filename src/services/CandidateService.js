import axios from "axios";
import APIError from "../utils/APIError.js";
import StorageUtil from "../utils/StorageUtil.js";
import CandidateRepository from "../repositories/CandidateRepository.js";
import JobRepository from "../repositories/JobRepository.js";
import configs from "../configs/index.js";
import deleteTemporaryFile from "../utils/deleteTemporaryFile.js";
import { convert } from "html-to-text";

const candidateRepository = new CandidateRepository();
const jobRepository = new JobRepository();

class CandidateService {
  constructor() {
    this.cvBucketName = configs.CV_BUCKET_NAME;
    this.passphotoBucketName = configs.PASSPHOTO_BUCKET_NAME;
  }

  deleteTemporaryFiles(cv, passphoto) {
    try {
      deleteTemporaryFile(cv);
      deleteTemporaryFile(passphoto);
    } catch (error) {
      throw new APIError(500, error.message);
    }
  }

  async getCVMatchResult(jobDesc, filename) {
    try {
      const { data } = await axios.post(configs.SCORING_FUNC_URL, {
        cv_name: filename,
        jobdesc_text: convert(jobDesc),
      });
      return data.result;
    } catch (err) {
      throw APIError.parseError(err);
    }
  }

  async uploadToStorage(cv_path, passphoto_path) {
    try {
      await Promise.all([
        await StorageUtil.uploadToBucket(this.cvBucketName, cv_path),
        await StorageUtil.uploadToBucket(
          this.passphotoBucketName,
          passphoto_path
        ),
      ]);

      } catch (error) {
        throw APIError(500, error.message);
      } finally {
        this.deleteTemporaryFiles(cv_path, passphoto_path);
      }
  }

  async applyToJob(jobId, candidateData) {
    try {
      const { cv_path, passphoto_path, ...data } = candidateData;

      await this.uploadToStorage(cv_path, passphoto_path);

      const { desc } = await jobRepository.getById(jobId);
      const match_percentage = await this.getCVMatchResult(desc, data.cv_name);

      data.cv_summary = "";
      data.match_percentage = match_percentage;

      const candidate = await candidateRepository.applyToJob(jobId, data);

      return candidate;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async addCandidateCVSummary(data) {
    try {
      const result = await candidateRepository.addCvCummarize(
        data.cv_name,
        data.summarized_cv
      );

      return result;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getCandidateDetails(candidateId) {
    try {
      const candidate = await candidateRepository.getDetails(candidateId);

      const [original_cv_url, passphoto] = await Promise.all([
        await StorageUtil.getSignedUrl("cv-bucket-dj02", candidate.cv_name),
        await StorageUtil.getSignedUrl(
          "passphoto-bucket-dj02",
          candidate.passphoto
        ),
      ]);

      const data = { ...candidate, original_cv_url, passphoto };
      return data;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default CandidateService;
