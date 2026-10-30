"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import PreferencesSection from "@/components/profile/PreferencesSection";
import ProfileFooter from "@/components/profile/ProfileFooter";
import GuestProfileCard from "@/components/profile/GuestProfileCard";
import Link from "next/link";
import LoginModal from "@/components/auth/LoginModal";
import { useState } from "react";
import UserProfile from "@/components/profile/UserProfile";
import ProfileAuthCard from "@/components/profile/ProfileAuthCard";

export default function ProfileScreen() {
	const [showLogin, setShowLogin] = useState(false);
	const isAuthenticated = false;

	return (
		<div className="w-full max-w-md mx-auto space-y-4">
			{isAuthenticated ? (
				<UserProfile />
			) : (
				<>
					<ProfileAuthCard onLogin={() => setShowLogin(true)} />
					<LoginModal
						onClose={() => setShowLogin(false)}
						isOpen={showLogin}
						onEmailLogin={() => {}}
						onGoogleLogin={() => {}}
					/>
				</>
			)}
		</div>
	);
}
