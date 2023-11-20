import { Router } from "express";
import serviceController from "../controllers/service.controller.js";

const router = Router();

router.post("/", serviceController.create);
router.get("/", serviceController.findAllServices);
export default router;
