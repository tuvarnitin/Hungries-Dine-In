import { connectDB } from "@/lib/db";
import Order from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		await connectDB();
		const { searchParams } = new URL(req.url);

		const filter: Record<string, any> = {};

		filter.status = {
			$in: ["delivered", "cancelled"],
		};

		const orders = await Order.find(filter)
			.populate("items.foodId")
			.sort({ createdAt: -1 })
			.lean();

		if (!orders) {
			return NextResponse.json(
				{
					msg: "No order history found",
				},
				{ status: 400 },
			);
		}

		const formatedOrders = orders.map((order) => ({
			id: order._id,
			tableNumber: order.tableNumber,
			date: order._id.getTimestamp().toDateString(),
			restaurant: "Hungries Dine • Main Hall",
			total: Math.ceil(order.subtotal),
			rating: 5,
			items: order.items.map((item) => ({
				name: `${item.name} ${item.quantity > 1 && `(x${item.quantity})`}`,
				id: item.foodId,
			})),
            status:order.status
		}));

		return NextResponse.json(
			{
				orderHistory: formatedOrders,
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
