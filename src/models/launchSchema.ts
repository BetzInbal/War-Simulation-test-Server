import { Schema, Types, Document, model } from "mongoose"
import { typesMissiles, Locations } from "../types/enums"

export interface ILaunch extends Document {
    type: typesMissiles
    status: string
    launcherId: string
    location: string
    created_at: string
    
}

const launchSchema = new Schema<ILaunch>({
    type: {
        type: String,
        enum: typesMissiles,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    launcherId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        enum: Locations,
        required: true
    },
    created_at: String

});

export default model<ILaunch>('Launch', launchSchema)
