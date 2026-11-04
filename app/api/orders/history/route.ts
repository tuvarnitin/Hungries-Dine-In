import { connectDB } from "@/lib/db";
import { GUEST_SESSION_COOKIE } from "@/lib/guest-session";
import { getAuthenticatedUserId } from "@/lib/authenticated-user";
import { transferGuestOrdersToUser } from "@/lib/transfer-guest-orders";
import Order, { OrderItem } from "@/models/orderModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;
		const userId = await getAuthenticatedUserId();

		if (!userId && !sessionToken) {
			return NextResponse.json(
				{ orderHistory: [] },
				{ status: 200 },
			);
		}

		if (userId && sessionToken) {
			await transferGuestOrdersToUser(sessionToken, userId);
		}
		const ownerFilter = userId
			? { userId }
			: { guestToken: sessionToken! };
		const filter = {
			...ownerFilter,
			status: { $in: ["delivered", "cancelled"] },
		};

		const orders = await Order.find(filter)
			.populate("items.foodId")
			.sort({ createdAt: -1 })
			.lean();

		const formatedOrders = orders.map((order) => ({
			id: order._id,
			tableNumber: order.tableNumber,
			date: order._id.getTimestamp().toDateString(),
			restaurant: "Hungries Dine • Main Hall",
			total: Math.ceil(order.subtotal),
			rating: 5,
			items: order.items.map((item:OrderItem) => ({
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
