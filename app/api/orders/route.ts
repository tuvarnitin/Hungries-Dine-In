import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import {connectDB} from "@/lib/db";
import Order from "@/models/orderModel";
import Table from "@/models/tableModel";
import Food from "@/models/foodModel";

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		const body = await req.json();
		const { tableId, items } = body;
		console.log(tableId,items)

		if (
			typeof tableId !== "string" ||
			!mongoose.isValidObjectId(tableId) ||
			!Array.isArray(items) ||
			items.length === 0 ||
			items.length > 100
		) {
			console.log({ message: "Invalid table or order items" });
			return NextResponse.json(
				{ message: "Invalid table or order items" },
				{ status: 400 },
			);
		}

		const validItems = items.every((item: unknown) => {
			if (!item || typeof item !== "object") return false;

			const value = item as {
				foodId?: unknown;
				quantity?: unknown;
			};

			console.log(
				typeof value.foodId === "string" ,
					mongoose.isValidObjectId(value.foodId) ,
					typeof value.quantity === "number" ,
					Number.isSafeInteger(value.quantity) ,
					value.quantity,
			);

			return (
				typeof value.foodId === "string" &&
				mongoose.isValidObjectId(value.foodId) &&
				typeof value.quantity === "number" &&
				Number.isSafeInteger(value.quantity) &&
				value.quantity >= 1 &&
				value.quantity <= 99
			);
		});

		if (!validItems) {
			console.log({ message: "Invalid food IDs or quantities" });
			return NextResponse.json(
				{ message: "Invalid food IDs or quantities" },
				{ status: 400 },
			);
		}

		const table = await Table.findById(tableId).lean();

		if (!table) {
			console.log({ message: "Table not found" });
			return NextResponse.json({ message: "Table not found" }, { status: 404 });
		}

		const quantities = new Map<string, number>();

		for (const item of items as {
			foodId: string;
			quantity: number;
		}[]) {
			const id = new mongoose.Types.ObjectId(item.foodId).toString();
			const quantity = (quantities.get(id) ?? 0) + item.quantity;

			if (quantity > 99) {
				console.log({ message: "Maximum quantity per food is 99" });
				return NextResponse.json(
					{ message: "Maximum quantity per food is 99" },
					{ status: 400 },
				);
			}

			quantities.set(id, quantity);
		}

		const foodIds = [...quantities.keys()];

		const foods = await Food.find({
			_id: { $in: foodIds },
			isAvailable: true,
		}).lean();

		if (foods.length !== foodIds.length) {
			console.log({ message: "Some food items are unavailable" });
			return NextResponse.json(
				{ message: "Some food items are unavailable" },
				{ status: 409 },
			);
		}

		// 6. Calculate prices on the server
		const orderItems = foods.map((food) => {
			const quantity = quantities.get(food._id.toString())!;

			const price = food.price;

			if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
				throw new Error("Invalid menu price");
			}

			return {
				foodId: food._id,
				name: food.name,
				price,
				quantity,
				total: price * quantity,
			};
		});

		const subtotal = orderItems.reduce(
			(total, item) => total + item.total,
			0,
		);

		const order = await Order.create({
			tableId: table._id,
			tableNumber: table.tableNumber,
			items: orderItems,
			subtotal,
			status: "pending",
		});

		return NextResponse.json(
			{
				message: "Order created successfully",
				order: {
					id: order._id,
					tableNumber: order.tableNumber,
					items: order.items,
					subtotal: order.subtotal,
					status: order.status,
					createdAt: order.createdAt,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Create order error:", error);
		return NextResponse.json(
			{ message: "Failed to create order" },
			{ status: 500 },
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		await connectDB();
		const { searchParams } = new URL(req.url);
		const tableId = searchParams.get("tableId");
		const status = searchParams.get("status");

		const filter: Record<string, any> = {};

		if (tableId) {
			if (!mongoose.isValidObjectId(tableId)) {
				return NextResponse.json(
					{ message: "Invalid table ID" },
					{ status: 400 },
				);
			}
			filter.tableId = tableId;
		}

		if (status) {
			filter.status = status;
		}

		const orders = await Order.find(filter)
			.populate("items.foodId")
			.sort({ createdAt: -1 })
			.lean();

		return NextResponse.json(
			{
				orders,
				order: orders.length > 0 ? orders[0] : null,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Fetch orders error:", error);
		return NextResponse.json(
			{ message: "Failed to fetch orders" },
			{ status: 500 },
		);
	}
}

