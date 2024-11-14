import { request, response, Router } from "express";
import verifyUser from "../middlewares/verifyToken";
import { getArry } from "../routes/launchesRouter";


const router = Router()

router.get('/', verifyUser,getArry)





export default router