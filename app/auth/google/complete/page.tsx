"use client";

import Button from "@/components/Button";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RegistrationState = "checking" | "confirm" | "saving" | "error";

function getReturnTo() {
	const returnTo = new URLSearchParams(window.location.search).get("returnTo");
	return returnTo?.startsWith("/") && !returnTo.startsWith("//")
		? returnTo
		: "/";
}

export default function GoogleRegistrationPage() {
	const router = useRouter();
	const { status: sessionStatus } = useSession();
	const [state, setState] = useState<RegistrationState>("checking");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (sessionStatus === "loading") return;
		if (sessionStatus !== "authenticated") {
			router.replace("/auth");
			return;
		}

		let cancelled = false;
		const checkAccount = async () => {
			try {
				const { data } = await axios.get<{ registered: boolean }>(
					"/api/auth/google-registration",
				);
				if (cancelled) return;
				if (data.registered) {
					router.replace(getReturnTo());
				} else {
					setState("confirm");
				}
			} catch (error: unknown) {
				if (cancelled) return;
				setMessage(
					axios.isAxiosError<{ error?: string }>(error)
						? error.response?.data?.error ?? "Unable to check your account."
						: error instanceof Error
							? error.message
							: "Unable to check your account.",
				);
				setState("error");
			}
		};
		void checkAccount();

		return () => {
			cancelled = true;
		};
	}, [router, sessionStatus]);

	const registerAccount = async () => {
		setState("saving");
		setMessage("");

		try {
			const { data } = await axios.post<{ registered: boolean }>(
				"/api/auth/google-registration",
			);
			if (!data.registered) {
				throw new Error("Unable to register your account.");
			}

			router.replace(getReturnTo());
		} catch (error) {
			setMessage(
				axios.isAxiosError<{ error?: string }>(error)
					? error.response?.data?.error ?? "Unable to register your account."
					: error instanceof Error
						? error.message
						: "Unable to register your account.",
			);
			setState("error");
		}
	};

	const declineRegistration = async () => {
		const returnTo = getReturnTo();
		await signOut({ redirect: false });
		router.replace(returnTo);
	};

	return (
		<main className="mx-auto mt-12 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-sm">
			<h1 className="text-xl font-bold text-dark-text">
				{state === "checking"
					? "Checking your account..."
					: "Create an account?"}
			</h1>

			{state === "checking" ? (
				<p className="mt-3 text-sm text-muted-text">
					Please wait while we check whether this Google account is registered.
				</p>
			) : (
				<>
					<p className="mt-3 text-sm text-muted-text">
						This Google account isn&apos;t registered yet. Would you like to
						create an account with it?
					</p>
					{message && (
						<p role="alert" className="mt-3 text-sm text-red-600">
							{message}
						</p>
					)}
					<div className="mt-6 grid grid-cols-2 gap-3">
						<Button
							variant="outline"
							onClick={declineRegistration}
							disabled={state === "saving"}
						>
							No, go back
						</Button>
						<Button
							onClick={registerAccount}
							loading={state === "saving"}
							disabled={state === "saving"}
						>
							Yes, register
						</Button>
					</div>
				</>
			)}
		</main>
	);
}
