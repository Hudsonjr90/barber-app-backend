import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { authMiddlewares } from "../middlewares/auth.middlewares.js";
import {
  deleteAppointment,
  validHours,
  validId,
} from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", authMiddlewares, validHours, bookingController.create);
router.get("/", bookingController.getAllBooking);
router.delete(
  "/:id",
  validId,
  deleteAppointment,
  bookingController.deleteBooking
);

export default router;
