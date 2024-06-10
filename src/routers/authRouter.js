import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = Router();

router.post("/login", AuthController.login);
router.get("/tokens", AuthController.getAccessToken);

export default router;