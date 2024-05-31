import { Router } from "express";
import fileHandler from "../middlewares/fileHandler.js";

const router = Router();

router.post("/apply/jobs/:id", fileHandler.fields(["passphoto", "cv"]));

export default router;
