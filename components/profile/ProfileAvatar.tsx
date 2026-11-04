import { useState } from "react";
import { Star } from "lucide-react";

interface ProfileAvatarProps {
	src?: string | null;
	alt?: string;
}

const FALLBACK_AVATAR = "/assets/GuestAvatar.png";

export default function ProfileAvatar({
	src,
	alt = "Profile",
}: ProfileAvatarProps) {
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	const imageSrc =
		src && failedSrc !== src ? src : FALLBACK_AVATAR;

	return (
		<div className="relative shrink-0">
			<div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden border-2 border-cream">
				<img
					src={imageSrc}
					alt={alt}
					className="w-full h-full object-cover"
					onError={() => {
						if (imageSrc !== FALLBACK_AVATAR) {
							setFailedSrc(src ?? imageSrc);
						}
					}}
				/>
			</div>

			<div className="absolute bottom-0 right-0 bg-primary text-gold rounded-full p-0.5 border-2 border-white shadow-xs">
				<Star className="w-3.5 h-3.5 fill-gold" />
			</div>
		</div>
	);
}
