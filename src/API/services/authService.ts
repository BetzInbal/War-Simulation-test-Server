import jwt from "jsonwebtoken";
import Users, { IUser } from "../../models/userSchema";
import bcrypt from 'bcrypt'
import { Schema } from "mongoose";
import { loginUserDTO, newUserDTO } from "../../types/DTOs/GeneralsDto";
import { getOrg } from "../../data/dataUtils";
import { typesMissiles } from "../../types/enums";

export const createUser = async ({ username, password, organization }: newUserDTO) => {
    try {
        if (!password) throw new Error('paswors mast by provaided')
        const hashed = await bcrypt.hash(password!, 10)
        const org = getOrg(organization!)
        const newUser: IUser = new Users({
            username,
            hashedPassword: hashed,
            organization: org

        });
        await newUser.save();
        return true
    } catch (err) {
        console.log(
            "Error accured while creating initial state of userSchema",
            err
        );
        throw new Error(err as string)
    }
};

export const userLogin = async ({ username, password }: loginUserDTO) => {
    try {
        const user = await Users.findOne({ username: username }).lean() //.populate("organization").populate("launched")

        if (!user) throw new Error('user not found')

        if (!await bcrypt.compare(password!, user.hashedPassword)) throw new Error('maby user not found')

        const token = jwt.sign({
            user_id: user._id,
            username: user.username,
            organization: user.organization.name
        }, process.env.SECRET!,
            { expiresIn: "60m" })
            

        return { ...user, token, hashedPassword: '❌❌❌❌' }
    } catch (err) {
        console.log(
            "Error accured while creating initial state of userSchema",
            err
        );
        throw new Error(err as string)
    }
};

/*
  export const getUserService = async (userId:string ) => {
    try {
        const user = await Users.findOne({_id:userId}).lean()
        if (!user) throw new Error('user not found')
        
        return Users
    } catch (err) {
      console.log(
        "Error accured while creating initial state of userSchema",
        err
      );
      return err
    }
  };
  */