import { Router } from "express"
import * as carController from "../controllers/carController.js"
import { carRules, handleCarValidation } from "../validators/carValidator.js"

const router = Router()

router.get("/cars", carController.getCars)
router.post("/cars", carRules, handleCarValidation, carController.addCar)
router.put("/cars/:id", carController.updateCar)
router.delete("/cars/:id", carController.deleteCar)

export default router