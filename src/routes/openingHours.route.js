import { Router } from "express";
import openingHoursController from "../controllers/openingHours.controller.js";

const route = Router();

route.post("/", openingHoursController.createHours);
route.get("/", openingHoursController.getAllHours);

export default route;
