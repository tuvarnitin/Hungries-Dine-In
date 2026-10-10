import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    throw new Error("Provide mongo uri in the environment variable")
}

export type MongooseCache = {
    conn:typeof mongoose | null;
    promise:Promise<typeof mongoose> | null
} 
const cached : MongooseCache = global.mongooseCache ?? {
    conn:null,
    promise:null
}

export const connectDB = async() => {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI)
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        throw error
    }
    return cached.conn
}