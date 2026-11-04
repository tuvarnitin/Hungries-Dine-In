import { connectDB } from "@/lib/db";
import {
	normalizeEmail,
	normalizeName,
	isValidPassword,
} from "@/lib/auth-validation";
import { hashPassword } from "@/lib/password";
import { transferGuestOrdersToUser } from "@/lib/transfer-guest-orders";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GUEST_SESSION_COOKIE } from "@/lib/guest-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	if (!body || typeof body !== "object") {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	const values = body as Record<string, unknown>;
	const name = normalizeName(values.name);
	const email = normalizeEmail(values.email);
	const password = values.password;

	if (!name) {
		return NextResponse.json(
			{ error: "Enter a name between 1 and 80 characters." },
			{ status: 400 },
		);
	}
	if (!email) {
		return NextResponse.json(
			{ error: "Enter a valid email address." },
			{ status: 400 },
		);
	}
	if (!isValidPassword(password)) {
		return NextResponse.json(
			{ error: "Password must be between 8 and 128 characters." },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		if (await User.exists({ email })) {
			return NextResponse.json(
				{ error: "An account with this email already exists." },
				{ status: 409 },
			);
		}

		const user = await User.create({
			name,
			email,
			password: await hashPassword(password),
		});

		const cookieStore = await cookies();
		const guestToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;
		let transferred = !guestToken;
		if (guestToken) {
			try {
				transferred = await transferGuestOrdersToUser(guestToken, user._id);
			} catch (error) {
				console.error("Guest order transfer failed", error);
			}
		}
		const response = NextResponse.json(
			{ created: true, guestOrdersTransferred: transferred },
			{ status: 201 },
		);

		if (transferred && guestToken) {
			response.cookies.set(GUEST_SESSION_COOKIE, "", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 0,
			});
		}

		return response;
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === 11000
		) {
			return NextResponse.json(
				{ error: "An account with this email already exists." },
				{ status: 409 },
			);
		}

		console.error("Account registration failed", error);
		return NextResponse.json(
			{ error: "Unable to create your account right now." },
			{ status: 500 },
		);
	}
}
