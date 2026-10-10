import { LogOut } from "lucide-react";

interface SignOutButtonProps {
	onClick?: () => void;
}

export default function SignOutButton({ onClick }: SignOutButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl border border-red/20 hover:bg-red/5 text-red transition-colors mt-2"
		>
			<LogOut className="w-4 h-4" />

			<span className="text-sm font-semibold">Sign Out</span>
		</button>
	);
}
