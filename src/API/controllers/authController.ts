import { request, response, Router } from "express";
import { login, register} from "../routes/authRouter";
import verifyUser from "../middlewares/verifyToken";


const router = Router()

router.post('/login', login )

router.post('/register', register)

router.post('/', verifyUser,register)





export default router