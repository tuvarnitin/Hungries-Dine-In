import { connectDB } from "@/lib/db";
import { hashSessionToken } from "@/lib/guest-session";
import GuestSession from "@/models/guestSession";
import Order from "@/models/orderModel";
import type { Types } from "mongoose";

export async function transferGuestOrdersToUser(
	token: string | undefined,
	userId: Types.ObjectId,
) {
	if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;

	await connectDB();
	await Order.updateMany(
		{ guestToken: token },
		{
			$set: { userId },
			$unset: { guestToken: 1 },
		},
	);
	await GuestSession.deleteOne({ token: hashSessionToken(token) });

	return true;
}
