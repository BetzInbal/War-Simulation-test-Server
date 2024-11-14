import jwt from "jsonwebtoken";
import Users, { IUser } from "../../models/userSchema";
import bcrypt from 'bcrypt'
import { Schema } from "mongoose";
import { loginUserDTO, newUserDTO } from "../../types/DTOs/GeneralsDto";
import { getOrg } from "../../data/dataUtils";
import { typesMissiles } from "../../types/enums";
import launchSchema from "../../models/launchSchema";


  export const getLaunchesService = async (user_id:string ) => {
    try {
        const user = await Users.findOne({_id:user_id}).lean()
        if (!user) throw new Error('user not found')
            
        return await user.organization.name.includes("IDF")? 
        getLaunchesIDF(user.organization.name.slice(6))
        :getLaunchThreth(user.id)
    } catch (err) {
      console.log(
        "Error accured while creating initial state of userSchema",
        err
      );
      return err
    }
  };
  
  export const getLaunchThreth =(launcherId:string)=>{
    return launchSchema.find({launcherId:launcherId})
}

export const getLaunchesIDF =(location:string)=>{
    return launchSchema.find({location:location})
}