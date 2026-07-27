import { Router } from "express"
import * as carController from "../controllers/carController.js"
import { authenticationMiddleware, adminOnly, staffOrAdmin } from "../middlewares/auth.js"
import { carRules, handleCarValidation } from "../validators/carValidator.js"

const carRouter = Router()

// Public routes
carRouter.get("/", carController.getCars)
carRouter.get("/available", carController.getCars)

// Protected Dashboard route
carRouter.get("/dashboard", authenticationMiddleware, staffOrAdmin, carController.getDashboardStats)

// Protected fleet modification routes
carRouter.post("/", authenticationMiddleware, adminOnly, carRules, handleCarValidation, carController.addCar)
carRouter.put("/:id", authenticationMiddleware, staffOrAdmin, carController.updateCar)
carRouter.delete("/:id", authenticationMiddleware, adminOnly, carController.deleteCar)

export default carRouter