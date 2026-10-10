import { Edit3 } from "lucide-react";

interface EditProfileButtonProps {
	onClick?: () => void;
}

export default function EditProfileButton({ onClick }: EditProfileButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-cream hover:bg-background transition-colors text-xs font-semibold text-dark-text"
		>
			<Edit3 className="w-3.5 h-3.5" />
			<span>Edit</span>
		</button>
	);
}
