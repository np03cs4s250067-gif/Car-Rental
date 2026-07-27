import { Router } from 'express'
import * as AuthController from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/register', AuthController.registerUser)
authRouter.post('/login', AuthController.loginUser)
authRouter.post('/logout', AuthController.logoutUser)
authRouter.get('/me', AuthController.getMe)

export default authRouter
