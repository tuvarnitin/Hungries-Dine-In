"use client";

import { ArrowUpRight } from "lucide-react";
import Button from "@/components/Button";

interface ProfileAuthCardProps {
	onLogin: () => void;
}

export default function ProfileAuthCard({ onLogin }: ProfileAuthCardProps) {
	return (
		<section className="flex items-center justify-center flex-col min-h-[90dvh]">
			<Button
				onClick={onLogin}
				variant="primary"
				size="md"
				icon={
					<ArrowUpRight
						size={17}
						className="ml-2"
					/>
				}
				fullWidth
			>
				Login / Create Account
			</Button>
			<p className="mt-4 text-center text-[11px] text-primary">
				Takes less than a minute · Free to join
			</p>
		</section>
	);
}
