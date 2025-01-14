import { connectToMogo } from "./config/db";
import 'dotenv/config'
import express, { json } from 'express'
import cors from "cors"
import authController from "./API/controllers/authController";
import http from 'http'
import { Server, Socket, } from 'socket.io'
import { hendelSocketConnetion, hendelSocketjoinRoom } from './socket/io'
import launchesController from "./API/controllers/launchesController";
import { hendelInterceptorLaunch } from "./socket/hendelInterceptorLaunch";
import { hendelSocketjLaunch } from "./socket/hendelSocketjLaunch";

const PORT = process.env.PORT || 3000

const app = express()
const httpserver = http.createServer(app)
export const io = new Server(httpserver, {
    cors: {
        origin: '*',
        methods: "*",
    }
})



connectToMogo()
app.use(cors())
app.use(express.json())


app.use('/api/auth', authController)
app.use('/api/launches', launchesController)


io.on('connection', (socket) => {
    socket.on("userId",(ui)=>{
        hendelSocketConnetion(socket, ui)
    })
    socket.emit("yoursId", socket.id)
})
io.on('joinRoom', hendelSocketjoinRoom)
io.on('launch', hendelSocketjLaunch)
io.on('intercept', hendelInterceptorLaunch)

export const sendEmit=(socket:Socket,eventName:string,data?:any)=>{
    socket.emit(eventName,data)
}

export const sendToRoom=(roomName:string,eventName:string,data?:any)=>{
    io.to(roomName).emit(eventName, data)
}
httpserver.listen(PORT, () => {
    console.log(`server $ socket run visit http://localhost:${PORT}`)
});
