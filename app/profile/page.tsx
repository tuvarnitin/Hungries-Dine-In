"use client";

import LoginModal from "@/components/auth/LoginModal";
import { useState } from "react";
import UserProfile from "@/components/profile/UserProfile";
import ProfileAuthCard from "@/components/profile/ProfileAuthCard";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileScreen() {
	const [showLogin, setShowLogin] = useState(false);
	const { data: session, status } = useSession();

	return (
		<div className="w-full max-w-md mx-auto space-y-4">
			{status === "loading" ? (
				<p className="py-20 text-center text-muted-text">Loading profile...</p>
			) : session?.user ? (
				<UserProfile
					name={session.user.name ?? "Google user"}
					email={session.user.email ?? ""}
					image={session.user.image ?? "/assets/GuestAvatar.png"}
				/>
			) : (
				<>
					<ProfileAuthCard onLogin={() => setShowLogin(true)} />
					<p className="text-xs text-muted-text/80 font-medium text-center">
						Your orders and preferences are saved on this device.{" "}
						<Link href={"/auth"}>
							<span className="underline text-sm text-primary/60">
								Create an account
							</span>
						</Link>{" "}
						to access them from anywhere
					</p>
					<LoginModal
						onClose={() => setShowLogin(false)}
						isOpen={showLogin}
						onGoogleLogin={() => {
							setShowLogin(false);
							void signIn("google", {
								callbackUrl: "/auth/google/complete?returnTo=%2Fprofile",
							});
						}}
					/>
				</>
			)}
		</div>
	);
}
