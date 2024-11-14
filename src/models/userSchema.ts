import { Schema, Types, Document, model } from "mongoose"
import {organizationSchema, IOrganization } from "./organizationSchema"
import { typesMissiles } from "../types/enums"

export interface IUser extends Document {
    username:string
    hashedPassword:string
    organization:IOrganization

}

// export interface ILaunch extends Document {
//     type:typesMissiles
//     status:string
// }

// const launchSchema = new Schema<ILaunch>({
//     type:{
//       type:String,
//       enum:typesMissiles,
//       required:true
//     },
//     status:{
//         type:String,
//         required:true
//       }
//   });


export const userSchema = new Schema<IUser>({
    username:{
        type:String,
        unique:true
    },
    hashedPassword:{
        type:String,
        required:true
    },
    organization:organizationSchema
})

export default model<IUser>('User', userSchema)