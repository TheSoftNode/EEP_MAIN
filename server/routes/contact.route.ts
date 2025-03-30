// application.route.ts
import express from "express";
import { submitBusinessContact, submitLearnerContact } from "../controllers/contact.controller";


const router = express.Router();

// Contact form routes
router.post("/learner", submitLearnerContact);
router.post("/business", submitBusinessContact);

export default router;