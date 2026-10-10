import mongoose, { Schema, model, models, Types, Model } from "mongoose";

export interface OrderItem {
	foodId: Types.ObjectId;
	name: string;
	price: number;
	quantity: number;
	total: number;
}

export type OrderStatus =
	| "pending"
	| "accepted"
	| "rejected"
	| "preparing"
	| "ready"
	| "delivered"
	| "cancelled";

export interface IOrder extends mongoose.Document {
	tableId: Types.ObjectId;
	tableNumber: number;
	items: OrderItem[];
	subtotal: number;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>(
	{
		foodId: {
			type: Schema.Types.ObjectId,
			ref: "Food",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
			validate: {
				validator: Number.isInteger,
				message: "Quantity must be an integer",
			},
		},
		total: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ _id: false },
);

const orderSchema = new Schema<IOrder>(
	{
		tableId: {
			type: Schema.Types.ObjectId,
			ref: "Table",
			required: true,
			index: true,
		},
		tableNumber: {
			type: Number,
			required: true,
		},
		items: {
			type: [orderItemSchema],
			required: true,
			validate: {
				validator: (items: OrderItem[]) => items.length > 0,
				message: "An order must contain at least one item",
			},
		},
		subtotal: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: [
				"pending",
				"accepted",
				"rejected",
				"preparing",
				"ready",
				"delivered",
				"cancelled",
			],
			default: "pending",
		},
	},
	{ timestamps: true },
);

const Order: Model<IOrder> = models.Order || model("Order", orderSchema);

export default Order;
