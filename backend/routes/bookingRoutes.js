import { Router } from "express";
import * as BookingController from "../controllers/bookingController.js";
import { authenticationMiddleware } from "../middlewares/auth.js";

import { bookingRules, handleBookingValidation } from "../validators/bookingValidator.js";

const router = Router();

router.use(authenticationMiddleware);

router.post("/", bookingRules, handleBookingValidation, BookingController.addBooking);
router.get("/", BookingController.getBookings);
router.put("/:id/cancel", BookingController.cancelBooking);

export default router;