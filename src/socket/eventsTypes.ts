import { ILaunch } from "../models/userSchema"
import { Locations, organizationsNames, typesMissiles } from "../types/enums"

export interface IsocketId {
    userId:string
}

export interface IjoinRoomData extends IsocketId {
    organizationName:organizationsNames
}

export interface ILaunchDTO extends IsocketId {
    location:Locations
    type:typesMissiles
}

export interface IThreatDTO extends ILaunchDTO {
    created_at:string
}


export interface ILocalThreat extends IThreatDTO {
    typeObj:ILaunch
}

