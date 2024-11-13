import {connect} from 'mongoose'

export const connectToMogo = async ( ) => {

    try {
        await connect(process.env.MONGO_URL || 'mongodb+srv://eladharel:RNkv6MAlGRDiWVs3@cluster0.menv7.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0/war-simulation')
        console.log(`connected to mongo ${process.env.MONGO_URL}`);
        
    } catch (error) {
        console.log(error);
        
    }
}