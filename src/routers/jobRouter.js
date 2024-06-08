import { Router } from "express";
import JobController from "../controllers/JobController.js";
import authHandler from "../middlewares/authHandler.js";
import fileHandler from "../middlewares/fileHandler.js";

const router = Router();

router.post(
  "/",
  authHandler,
  fileHandler.single("logo"),
  JobController.createJob
);
router.get("/", JobController.getJobs);
router.get("/:id", JobController.getJobById);
router.get("/:id/leaderboard", authHandler, JobController.getJobLeaderboard);

export default router;
