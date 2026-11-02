import mongoose,{model, Schema,models, Model} from "mongoose";

export interface IGuestSession extends Document {
    token : string;
    expiresAt:Date
}

export const guestSchema = new Schema<IGuestSession>({
    token:{
        type:String,
        required:true,
        unique:true,
        select:false
    },
    expiresAt:{
        type:Date,
        required:true,
        expires:0
    }
},{
    timestamps:true
})

const GuestSession =
	models.GuestSession || model<IGuestSession>("GuestSession", guestSchema);

export default GuestSession