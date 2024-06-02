import { Router } from "express";
import fileHandler from "../middlewares/fileHandler.js";
import CandidateController from "../controllers/CandidateController.js";

const router = Router();

router.post(
  "/apply/jobs/:id",
  fileHandler.fields([
    { name: "passphoto", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  CandidateController.addCandidate
);
router.get("/:id", CandidateController.getCandidateDetail);

export default router;
