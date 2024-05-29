import { Router } from "express";
import JobController from "../controllers/JobController.js";

const router = Router();

router.get("/", JobController.getJobs);
router.get("/:id", JobController.getJobById);

export default router;
