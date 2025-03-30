import express from "express";
import applicationRouter from "../routes/application.route";
import contactRouter from "../routes/contact.route";
import newsletterRouter from "../routes/newsletter.route";

export const mountedRoutes = function (app: any) {
  app.use(express.json());
  app.use("/api/v1/eep", applicationRouter);
  app.use("/api/v1/eep/contact", contactRouter);
  app.use("/api/v1/eep/newsletter", newsletterRouter)
};
