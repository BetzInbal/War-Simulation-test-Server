import { organizationsNames, typesMissiles } from "../types/enums";
import missiles from "./missilesList";
import organizationsList from "./organizationsList";

export const getOrg = (name:organizationsNames)=>{
    try {
        return  organizationsList.filter((o)=> o.name==name)[0]
        
    } catch (error) {
        throw new Error("organization dos`not found")
    }
}


export const getTimeMissiles = (type:typesMissiles)=>{
    try {
        return  missiles.filter((o)=> o.name==type)[0].speed*60
        
    } catch (error) {
        throw new Error("missile dos`not found")
    }
}