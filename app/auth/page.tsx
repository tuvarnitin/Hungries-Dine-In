"use client";

import LoginModal from "@/components/auth/LoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
	const router = useRouter();

	return (
		<LoginModal
			isOpen
			onClose={() => router.replace("/")}
			onGoogleLogin={() =>
				void signIn("google", {
					callbackUrl: "/auth/google/complete?returnTo=%2F",
				})
			}
		/>
	);
}
