import { Router } from "express";
import authController from "./controllers/authController";



const router = Router()

router.use('/auth', authController)

router.use('/users', ()=>{})

router.use('/', ()=>{})





export default router