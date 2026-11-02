import {
	createGuestSession,
	findValidGuestSession,
	GUEST_SESSION_COOKIE,
} from "@/lib/guest-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
	maxAge: 7 * 24 * 60 * 60,
};

export interface IGuestSessionResponse {
	guest:boolean;
	expiresAt:Date
}

export async function POST() {
	try {
		const cookieStore = await cookies();
		const existingToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

		const existingSession = await findValidGuestSession(existingToken);

		if (existingSession) {
			return NextResponse.json({
				guest: true,
				expiresAt: existingSession.expiresAt,
			});
		}

		const { token, session } = await createGuestSession();
		const response:NextResponse<IGuestSessionResponse> = NextResponse.json(
			{
				guest: true,
				expiresAt: session.expiresAt,
			},
			{
				status: 201,
			},
		);

		response.cookies.set(GUEST_SESSION_COOKIE, token, cookieOptions);

		return response;
	} catch (error) {
		console.log("Guest session creation failed", error);
		return NextResponse.json(
			{
				mgs: "Unable to create guest session",
			},
			{
				status: 500,
			},
		);
	}
}

export async function GET() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

		const session = await findValidGuestSession(token);

		if (!session) {
			return NextResponse.json(
				{
					guest: false,
				},
				{
					status: 401,
				},
			);
		}

		return NextResponse.json(
			{
				guest: true,
				expiresAt: session.expiresAt,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				msg: "Unable to verify guest session",
			},
			{
				status: 500,
			},
		);
	}
}
