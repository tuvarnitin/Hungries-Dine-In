import { Star } from "lucide-react";

interface ProfileAvatarProps {
	src: string;
	alt?: string;
}

export default function ProfileAvatar({
	src,
	alt = "Profile",
}: ProfileAvatarProps) {
	return (
		<div className="relative shrink-0">
			<div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden border-2 border-cream">
				<img
					src={src}
					alt={alt}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="absolute bottom-0 right-0 bg-primary text-gold rounded-full p-0.5 border-2 border-white shadow-xs">
				<Star className="w-3.5 h-3.5 fill-gold" />
			</div>
		</div>
	);
}
