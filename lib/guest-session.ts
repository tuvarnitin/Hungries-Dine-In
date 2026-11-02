import { createHash, randomBytes } from "crypto";
import { connectDB } from "@/lib/db";
import GuestSession from "@/models/guestSession";
import { cookies } from "next/headers";

export const GUEST_SESSION_COOKIE = "guest_session";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export function generateSessionToken() {
	return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
	return createHash("sha256").update(token).digest("hex");
}

export async function findValidGuestSession(token: string | undefined) {
	if (!token || !/^[a-f0-9]{64}$/.test(token)) {
		return null;
	}
	await connectDB();

	const guestSession = await GuestSession.findOne({
		token: hashSessionToken(token),
		expiresAt: { $gt: new Date() },
	});

	if (!guestSession) return null;

	return guestSession;
}

export async function createGuestSession() {
	await connectDB();

	const token = generateSessionToken();
	const expiresAt = new Date(Date.now() + SESSION_DURATION);

	const session = await GuestSession.create({
		token: hashSessionToken(token),
		expiresAt,
	});

	return { token, session };
}
