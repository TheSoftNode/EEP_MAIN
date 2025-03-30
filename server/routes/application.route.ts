import express from "express";
import { submitApplication, submitBusinessApplication, upload } from "../controllers/application.controller";

const router = express.Router();

router.route("/apply").post(upload, submitApplication);
router.post("/business/apply", submitBusinessApplication);

export default router;


