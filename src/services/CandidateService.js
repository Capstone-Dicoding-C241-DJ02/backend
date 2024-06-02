import APIError from "../utils/APIError.js";
import StorageUtil from "../utils/StorageUtil.js";
import fs from "fs";

class CandidateService {
  constructor(repository) {
    this.repository = repository;
    this.cvBucketName = "cv-bucket-dj02";
    this.passphotoBucketName = "passphoto-bucket-dj02";
  }

  deleteTemporaryFiles(cv, passphoto) {
    if (fs.existsSync(cv) && fs.existsSync(passphoto)) {
      fs.unlinkSync(cv);
      fs.unlinkSync(passphoto);
      return;
    }

    throw new APIError();
  }

  async addCandidateToLeaderboard(jobId, candidateData) {
    try {
      const { cv_path, passphoto_path, ...data } = candidateData;

      await Promise.all([
        await StorageUtil.uploadToBucket(this.cvBucketName, cv_path),
        await StorageUtil.uploadToBucket(
          this.passphotoBucketName,
          passphoto_path
        ),
      ]);

      this.deleteTemporaryFiles(cv_path, passphoto_path);

      data.match_percentage = 0;
      data.cv_summary = "";
      data.title = "Engineer";

      const candidate = await this.repository.addToLeaderboard(jobId, data);

      return candidate;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async getLeaderboardCandidate(candidateId) {
    try {
      const candidate = await this.repository.getDetails(candidateId);
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
