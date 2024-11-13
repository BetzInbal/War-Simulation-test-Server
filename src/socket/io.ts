import { Socket } from "socket.io";
import { io } from "../app";
import { IjoinRoomData } from "./eventsTypes";
import { organizationsNames } from "../types/enums";

const socketsList:Socket[] = []
//const socketsList:Socket[] = import socketsList from "../app" 
export  const  hendelSocketConnetion = (client:Socket)=>{
        console.log(`[socket.io]  new connection ${client.id} `);
        socketsList.push(client)        
}

export  const  hendelSocketjoinRoom = ({organizationName, socketId}:IjoinRoomData) =>{
    const socket = socketsList.find((s)=>s.id==socketId)
    if(!socket)throw new Error("socken not found")
        socket.join(organizationName)

    console.log(`[socket.io]  new new vote `);
    }
    


