import express from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller";

const router = express.Router();


router.post("/subscribe", subscribeToNewsletter);

export default router;