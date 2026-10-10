import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITable extends Document {
	tableNumber: number;
}

const tableSchema = new Schema<ITable>({
	tableNumber: {
		type: Number,
		required: true,
		validate: {
			validator: (number) => number > 0,
			message: "Table number must be greater than positive",
		},
	}
},{timestamps:true});

const Table =
	mongoose.models.Table || mongoose.model("Table", tableSchema);

export default Table;
