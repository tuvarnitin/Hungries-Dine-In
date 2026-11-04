import { authOptions } from "@/lib/auth-options";
import { connectDB } from "@/lib/db";
import { normalizeEmail } from "@/lib/auth-validation";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function getAuthenticatedUserId() {
	const session = await getServerSession(authOptions);
	if (!session?.user) return null;

	const sessionUserId = session?.user?.id;
	if (sessionUserId && mongoose.isValidObjectId(sessionUserId)) {
		return new mongoose.Types.ObjectId(sessionUserId);
	}

	const email = normalizeEmail(session?.user?.email);
	if (!email) {
		throw new Error("Authenticated session has no valid user identity");
	}

	await connectDB();
	const user = await User.findOne({ email }).select("_id").lean();
	if (!user?._id) {
		throw new Error("Authenticated user account was not found");
	}

	return user._id;
}
