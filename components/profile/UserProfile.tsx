import ProfileCard from "@/components/profile/ProfileCard";
import ProfileFooter from "@/components/profile/ProfileFooter";
import PreferencesSection from "@/components/profile/PreferencesSection";
import Link from "next/link";
import { signOut } from "next-auth/react";

type UserProfileProps = {
	name: string;
	email: string;
	image: string;
};

const UserProfile = ({ name, email, image }: UserProfileProps) => {
        const handleEditProfile = () => {
            console.log("Edit profile");
        };
    
        const handleChat = () => {
            console.log("Open concierge chat");
        };
    
        const handleSecurity = () => {
            console.log("Open security settings");
        };
    
	return (
		<>
			<ProfileCard
				name={name}
				email={email}
				image={image}
				onEdit={handleEditProfile}
			/>
			<PreferencesSection
				onChat={handleChat}
				onSecurity={handleSecurity}
				onSignOut={() => void signOut({ callbackUrl: "/profile" })}
			/>

			<ProfileFooter />
		</>
	);
};

export default UserProfile;
