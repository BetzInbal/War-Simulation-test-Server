import { organizationsNames } from "../types/enums";
import organizationsList from "./organizationsList";

export const getOrg = (name:organizationsNames)=>{
    try {
        return  organizationsList.filter((o)=>{return o.name==name})[0]
        
    } catch (error) {
        throw new Error("organization dos`not found")
    }
}