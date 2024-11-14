import { Socket } from "socket.io";
import { io } from "../app";
import { IjoinRoomData, ILaunchDTO } from "./eventsTypes";
import { organizationsNames } from "../types/enums";

export const sockets: any = undefined
//const socketsList:Socket[] = import socketsList from "../app" 
export const hendelSocketConnetion = (client: Socket, userId: string) => {
    console.log(`[socket.io]  new connection ${client.id} `);
    sockets.userId = client
}

export const hendelSocketjoinRoom = ({ organizationName, userId }: IjoinRoomData) => {
    const socket = sockets.socketId
    if (!socket) throw new Error("socken not found")
    socket.join(organizationsNames[organizationName])
    console.log(`[socket.io]  new new room `);
}







