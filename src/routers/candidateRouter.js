import { Router } from "express";
import fileHandler from "../middlewares/fileHandler.js";
import CandidateController from "../controllers/CandidateController.js";

const router = Router();
const fileFields = [
  { name: "passphoto", maxCount: 1 },
  { name: "cv", maxCount: 1 },
];

router.post(
  "/apply/jobs/:id",
  fileHandler.fields(fileFields),
  CandidateController.addCandidate
);
router.get("/:id", CandidateController.getCandidateDetail);
router.patch("/summarize/cv", CandidateController.addCandidateCVSummary);

export default router;
