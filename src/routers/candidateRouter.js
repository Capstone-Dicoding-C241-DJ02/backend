import { Router } from "express";
import fileHandler from "../middlewares/fileHandler.js";
import CandidateController from "../controllers/CandidateController.js";
import authHandler from "../middlewares/authHandler.js";

const router = Router();
const fileFields = [{ name: "passphoto" }, { name: "cv" }];

router.post(
  "/apply/jobs/:id",
  fileHandler.fields(fileFields),
  CandidateController.addCandidate
);
router.get("/:id", authHandler, CandidateController.getCandidateDetail);
router.patch("/summarize/cv", CandidateController.addCandidateCVSummary);

export default router;
