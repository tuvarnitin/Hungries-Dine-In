import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Order from "@/models/orderModel";
import Table from "@/models/tableModel";
import Food from "@/models/foodModel";

import {
	createGuestSession,
	findValidGuestSession,
	GUEST_SESSION_COOKIE,
} from "@/lib/guest-session";
import { cookies } from "next/headers";
import { getAuthenticatedUserId } from "@/lib/authenticated-user";
import { transferGuestOrdersToUser } from "@/lib/transfer-guest-orders";

const MAX_ITEMS = 100;
const MAX_QUANTITY = 99;
const DEFAULT_SERVICE_CHARGE = 8.25;
const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

type RequestedItem = {
	foodId: string;
	quantity: number;
};

type CreateOrderBody = {
	tableId: string;
	items: RequestedItem[];
};

function errorResponse(message: string, status: number) {
	console.log(message)
	return NextResponse.json({ success: false, message }, { status });
}

function validateOrderBody(body: unknown): body is CreateOrderBody {
	if (!body || typeof body !== "object") return false;

	const value = body as Record<string, unknown>;

	if (
		typeof value.tableId !== "string" ||
		!mongoose.isValidObjectId(value.tableId)
	) {
		return false;
	}

	if (
		!Array.isArray(value.items) ||
		value.items.length === 0 ||
		value.items.length > MAX_ITEMS
	) {
		return false;
	}

	return value.items.every((item: unknown) => {
		if (!item || typeof item !== "object") return false;

		const value = item as Record<string, unknown>;

		return (
			typeof value.foodId === "string" &&
			mongoose.isValidObjectId(value.foodId) &&
			typeof value.quantity === "number" &&
			Number.isSafeInteger(value.quantity) &&
			value.quantity >= 1 &&
			value.quantity <= MAX_QUANTITY
		);
	});
}

async function resolveGuestSession(token?: string) {
	if (token) {
		const result = await findValidGuestSession(token);
		if (result) {
			return {
				token,
				isNew: false,
			};
		}
		console.log("Result is false")
	}

	const session = await createGuestSession();

	if (!session?.token) {
		throw new Error("Unable to create guest session");
	}

	return {
		token: session.token,
		isNew: true,
	};
}

export async function POST(req: NextRequest) {
	try {
		await connectDB();

		// Validate request body
		let body: unknown;

		try {
			body = await req.json();
		} catch {
			return errorResponse("Invalid JSON payload", 400);
		}

		if (!validateOrderBody(body)) {
			return errorResponse("Invalid table ID or order items", 400);
		}

		const { tableId, items } = body;
		const userId = await getAuthenticatedUserId();

		//Validate table
		const table = await Table.findById(tableId).lean();

		if (!table) {
			return errorResponse("Table not found", 404);
		}

		// Aggregate duplicate food items
		const quantities = new Map<string, number>();

		for (const item of items) {
			const foodId = new mongoose.Types.ObjectId(item.foodId).toString();

			const quantity = (quantities.get(foodId) ?? 0) + item.quantity;

			if (quantity > MAX_QUANTITY) {
				return errorResponse("Maximum quantity per food is 99", 400);
			}

			quantities.set(foodId, quantity);
		}

		const foodIds = [...quantities.keys()];

		// Fetch available foods from database
		const foods = await Food.find({
			_id: { $in: foodIds },
			isAvailable: true,
		}).lean();

		// Ensure every requested food exists and is available
		if (foods.length !== foodIds.length) {
			return errorResponse("One or more food items are unavailable", 400);
		}

		// Calculate order items using database prices
		const orderItems = foods.map((food) => {
			const quantity = quantities.get(food._id.toString())!;

			const price = Math.ceil(Number(food.price));

			if (!Number.isFinite(price) || price < 0) {
				throw new Error("Invalid food price in database");
			}

			return {
				foodId: food._id,
				name: food.name,
				price,
				quantity,
				total: price * quantity,
			};
		});

		// Calculate subtotal and service charges
		const total = orderItems.reduce((sum, item) => sum + item.total, 0);

		const configuredCharge = Number(process.env.SERVICE_CHARGES_PERCENTAGE);

		const serviceChargePercentage =
			process.env.SERVICE_CHARGES_PERCENTAGE?.trim() &&
			Number.isFinite(configuredCharge) &&
			configuredCharge >= 0 &&
			configuredCharge <= 100
				? configuredCharge
				: DEFAULT_SERVICE_CHARGE;

		const serviceCharges = Math.ceil(total * (serviceChargePercentage / 100));

		const subtotal = total + serviceCharges;

		// Resolve guest session
		const cookieStore = await cookies();
		const existingToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

		const orderOwner = userId
			? { userId }
			: {
					guestToken: (await resolveGuestSession(existingToken)).token,
				};

		// Create order
		const order = await Order.create({
			tableId: table._id,
			tableNumber: table.tableNumber,
			items: orderItems,
			subtotal,
			status: "pending",
			...orderOwner,
		});

		const response = NextResponse.json(
			{
				success: true,
				message: "Order created successfully",
				order: {
					id: order._id,
					tableId: order.tableId,
					tableNumber: order.tableNumber,
					items: order.items,
					subtotal: order.subtotal,
					status: order.status,
					createdAt: order.createdAt,
				},
			},
			{ status: 201 },
		);

		return response;
	} catch (error) {
		console.error("Create order error:", error);

		return errorResponse("Failed to create order", 500);
	}
}

export async function GET() {
	try {
		await connectDB();

		const userId = await getAuthenticatedUserId();
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

		if (!userId && !sessionToken) {
			return NextResponse.json({ orders: [] }, { status: 200 });
		}

		if (!userId) {
			const result = await findValidGuestSession(sessionToken);
			if (!result) {
				return NextResponse.json({ orders: [],msg:"no orders" }, { status: 200 });
			}
		}
		if (userId && sessionToken) {
			await transferGuestOrdersToUser(sessionToken, userId);
		}
		const ownerFilter = userId
			? { userId }
			: { guestToken: sessionToken! };
		const filter = {
			...ownerFilter,
			status: {
				$in: ["pending", "accepted", "preparing", "ready"],
			},
		};

		// Fetch orders
		const orders = await Order.find(filter)
			.populate("items.foodId")
			.sort({ createdAt: -1 })
			.lean();

		return NextResponse.json(
			{
				orders,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Fetch guest orders error:", error);
		return errorResponse("Failed to fetch orders", 500);
	}
}
