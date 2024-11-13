import { connectToMogo } from "./config/db";
import 'dotenv/config'
import express from 'express'
import cors from "cors"
import authController from "./API/controllers/authController";


const PORT = process.env.PORT || 3000

const app = express()

connectToMogo()
app.use(cors())

app.use(express.json())
app.use('/api/auth', authController)





app.listen(PORT, ()=>{
    console.log(`server run visit http://localhost:${PORT}`)
});


