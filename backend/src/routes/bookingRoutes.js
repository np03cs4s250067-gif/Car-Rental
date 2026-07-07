import { Router } from "express";
import * as BookingController from "../controllers/bookingController.js";

const router = Router();

router.post("/bookings", BookingController.addBooking);

router.put("/bookings/:id/cancel", BookingController.cancelBooking);

export default router;