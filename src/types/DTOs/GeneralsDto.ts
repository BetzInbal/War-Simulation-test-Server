import { organizationsNames } from "../enums"

export interface newUserDTO {
    username:string
    password:string
    organization:organizationsNames
}

export interface loginUserDTO {
    username:string
    password:string
}