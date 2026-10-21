import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFood extends Document {
	img: string;
	tags: string[];
	name: string;
	rating?: number;
	estPreparationTime?: string;
	price: number;
	desc: string;
	isAvailable: boolean;
	category?:string;
}

const foodSchema = new Schema<IFood>({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	img: {
		type: String,
		required: true,
		minLength: 1,
	},
	category:{
		type: String,
		default: ""
	},
	tags: [String],
	rating: {
		type: Number,
		required: true,
	},
	estPreparationTime: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	isAvailable: {
		type: Boolean,
		default: true,
	},
},{timestamps:true});

const Food: Model<IFood> =
	mongoose.models.Food ||
	mongoose.model("Food", foodSchema);

export default Food;
