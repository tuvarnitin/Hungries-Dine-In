import { authOptions } from "@/lib/auth-options";
import { connectDB } from "@/lib/db";
import { normalizeEmail, normalizeName } from "@/lib/auth-validation";
import {
	GUEST_SESSION_COOKIE,
} from "@/lib/guest-session";
import { transferGuestOrdersToUser } from "@/lib/transfer-guest-orders";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

async function getGoogleSession() {
	const session = await getServerSession(authOptions);
	if (
		!session?.user ||
		session.user.authProvider !== "google" ||
		!normalizeEmail(session.user.email)
	) {
		return null;
	}

	return session;
}

export async function GET() {
	const session = await getGoogleSession();
	if (!session) {
		return NextResponse.json({ error: "Google sign-in required." }, { status: 401 });
	}

	try {
		await connectDB();
		const email = normalizeEmail(session.user.email)!;
		const user = await User.exists({ email });

		return NextResponse.json({ registered: Boolean(user) });
	} catch (error) {
		console.error("Google account lookup failed", error);
		return NextResponse.json(
			{ error: "Unable to check account status." },
			{ status: 500 },
		);
	}
}

export async function POST() {
	const session = await getGoogleSession();
	if (!session) {
		return NextResponse.json({ error: "Google sign-in required." }, { status: 401 });
	}

	const email = normalizeEmail(session.user.email);
	const name = normalizeName(session.user.name);
	if (!email || !name) {
		return NextResponse.json(
			{ error: "Google did not provide a valid name and email." },
			{ status: 400 },
		);
	}

	try {
		await connectDB();
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ registered: true, alreadyRegistered: true });
		}

		const user = await User.create({
			name,
			email,
			image: session.user.image ?? null,
			emailVerified: new Date(),
		});

		const cookieStore = await cookies();
		const guestToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;
		let guestOrdersTransferred = !guestToken;

		if (guestToken) {
			try {
				guestOrdersTransferred = await transferGuestOrdersToUser(
					guestToken,
					user._id,
				);
			} catch (error) {
				console.error("Google registration guest-order transfer failed", error);
			}
		}

		const response = NextResponse.json(
			{ registered: true, guestOrdersTransferred },
			{ status: 201 },
		);

		if (guestOrdersTransferred && guestToken) {
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
			return NextResponse.json({
				registered: true,
				alreadyRegistered: true,
			});
		}

		console.error("Google account registration failed", error);
		return NextResponse.json(
			{ error: "Unable to register this Google account." },
			{ status: 500 },
		);
	}
}
