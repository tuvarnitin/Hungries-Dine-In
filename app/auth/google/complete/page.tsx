"use client";

import Button from "@/components/Button";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notifyError } from "@/lib/toast-notifications";
import { toast } from "react-toastify";

type RegistrationState = "checking" | "confirm" | "saving" | "check-error";

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
	const [checkAttempt, setCheckAttempt] = useState(0);

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
				notifyError(error, "Unable to check your account.");
				setState("check-error");
			}
		};
		void checkAccount();

		return () => {
			cancelled = true;
		};
	}, [checkAttempt, router, sessionStatus]);

	const registerAccount = async () => {
		setState("saving");

		try {
			const { data } = await axios.post<{
				registered: boolean;
				alreadyRegistered?: boolean;
			}>(
				"/api/auth/google-registration",
			);
			if (!data.registered) {
				throw new Error("Unable to register your account.");
			}

			if (data.alreadyRegistered) {
				toast.info("This Google account is already registered.");
			} else {
				toast.success("Google account registered successfully.");
			}
			router.replace(getReturnTo());
		} catch (error) {
			notifyError(error, "Unable to register your account.");
			setState("confirm");
		}
	};

	const declineRegistration = async () => {
		const returnTo = getReturnTo();
		try {
			await signOut({ redirect: false });
			router.replace(returnTo);
		} catch (error) {
			notifyError(error, "Unable to cancel Google sign-in.");
		}
	};

	return (
		<main className="mx-auto mt-12 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-sm">
			<h1 className="text-xl font-bold text-dark-text">
				{state === "checking"
					? "Checking your account..."
					: state === "check-error"
						? "Unable to check your account"
						: "Create an account?"}
			</h1>

			{state === "checking" ? (
				<p className="mt-3 text-sm text-muted-text">
					Please wait while we check whether this Google account is registered.
				</p>
			) : state === "check-error" ? (
				<>
					<p className="mt-3 text-sm text-muted-text">
						Please try checking your account again.
					</p>
					<Button
						className="mt-6 w-full"
						onClick={() => {
							setState("checking");
							setCheckAttempt((attempt) => attempt + 1);
						}}
					>
						Try again
					</Button>
				</>
			) : (
				<>
					<p className="mt-3 text-sm text-muted-text">
						This Google account isn&apos;t registered yet. Would you like to
						create an account with it?
					</p>
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
