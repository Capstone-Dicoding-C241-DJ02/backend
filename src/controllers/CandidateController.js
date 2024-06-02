import CandidateService from "../services/CandidateService.js";
import prismaClient from "../apps/prismaClient.js";
import CandidateRepository from "../repositories/CandidateRepository.js";
import APIError from "../utils/APIError.js";

const candidateRepository = new CandidateRepository(prismaClient);
const candidateService = new CandidateService(candidateRepository);

class CandidateController {
  static validateMimeType(cv, passphoto) {
    if (cv.mimetype !== "application/pdf")
      throw new APIError(400, "CV should be a pdf");

    if (!passphoto.mimetype.includes("image"))
      throw new APIError(400, "Passphoto should be an image");
  }

  static async addCandidate(req, res, next) {
    try {
      const { cv, passphoto } = req.files;
      const { id } = req.params;

      if (isNaN(id)) throw new APIError(400, "id should be a number");

      CandidateController.validateMimeType(cv[0], passphoto[0]);

      const data = {
        ...req.body,
        cv_name: cv[0].filename,
        cv_path: cv[0].path,
        passphoto: passphoto[0].filename,
        passphoto_path: passphoto[0].path,
      };

      await candidateService.addCandidateToLeaderboard(Number(id), data);

      res.status(201).json({
        message: "Successfully apply the job",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCandidateDetail(req, res, next) {
    try {
      const { id } = req.params;

      if (isNaN(id)) throw new APIError(400, "id should be a number");

      const candidate = await candidateService.getLeaderboardCandidate(
        Number(id)
      );

      res.status(200).json({
        messsage: "Successfully get data",
        data: { candidate },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CandidateController;
