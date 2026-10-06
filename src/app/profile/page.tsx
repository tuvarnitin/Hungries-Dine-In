"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import PreferencesSection from "@/components/profile/PreferencesSection";
import ProfileFooter from "@/components/profile/ProfileFooter";

export default function ProfileScreen() {
	const handleEditProfile = () => {
		console.log("Edit profile");
	};

	const handleChat = () => {
		console.log("Open concierge chat");
	};

	const handleSecurity = () => {
		console.log("Open security settings");
	};

	const handleSignOut = () => {
		console.log("Sign out");
	};

	return (
		<div className="w-full max-w-md mx-auto space-y-4">
			<ProfileCard
				name="Nitin Tuvar"
				email="nitintuvar2003@gmail.com"
				phone="+918053445590"
				image="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60"
				onEdit={handleEditProfile}
			/>

			<PreferencesSection
				onChat={handleChat}
				onSecurity={handleSecurity}
				onSignOut={handleSignOut}
			/>

			<ProfileFooter />
		</div>
	);
}
