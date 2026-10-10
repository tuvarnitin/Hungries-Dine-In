"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ className }: { className?: string }) => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className={`w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cream text-muted-text hover:text-dark-text transition-colors ${className}`}
		>
			<ArrowLeft size={17} />
		</button>
	);
};

export default BackButton;
