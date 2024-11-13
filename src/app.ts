import { connectToMogo } from "./config/db";
import 'dotenv/config'
import express from 'express'
import cors from "cors"
import authController from "./API/controllers/authController";
import http from 'http'
import { Server, Socket,} from 'socket.io'
import { hendelSocketConnetion, hendelSocketjoinRoom } from './socket/io'

const PORT = process.env.PORT || 3000

const app = express()
const httpserver = http.createServer(app)
export const io = new Server(httpserver,{
    cors:{
        origin:'*',
        methods:"*",
    }})

    
connectToMogo()
app.use(cors())
app.use(express.json())


app.use('/api/auth', authController)



io.on('connection',(socket) =>{  
    hendelSocketConnetion(socket)
    socket.emit("wo-org", socket.id)  
})
io.on('joinRoom',hendelSocketjoinRoom)
    


httpserver.listen(PORT, ()=>{
    console.log(`server $ socket run visit http://localhost:${PORT}`)
});
