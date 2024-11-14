import { Schema, Types, Document, model } from "mongoose"
import { typesMissiles } from "../types/enums"

export interface IOrganization extends Document {
    name:string,
    resources:IResource[],
    budget:number

}

interface IResource extends Document {
    name:typesMissiles,
    amount:number
}


const resourceSchema = new Schema<IResource>({
    name:{
      type:String,
      enum:typesMissiles,
      required:true
    },
    amount:{
        type:Number,
        required:true
      }
  });

  export const organizationSchema = new Schema<IOrganization>({
    name:String,
    resources:{
        type:[resourceSchema]
    },
    budget:{type:Number, default:0}

})

