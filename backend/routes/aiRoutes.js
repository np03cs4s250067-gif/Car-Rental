import { Router } from "express"
import { getCarRecommendation } from "../controllers/aiController.js"

const router = Router()

router.post('/recommend', getCarRecommendation)

export default router