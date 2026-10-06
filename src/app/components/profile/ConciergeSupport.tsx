"use client";

import { Headphones } from "lucide-react";

interface ConciergeSupportProps {
	onChat?: () => void;
}

export default function ConciergeSupport({ onChat }: ConciergeSupportProps) {
	return (
		<div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-muted-text/15">
			<div className="flex items-center space-x-3.5 min-w-0">
				<div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
					<Headphones className="w-5 h-5" />
				</div>

				<div className="min-w-0">
					<h4 className="text-sm font-bold text-dark-text">
						Live Concierge & Host Support
					</h4>

					<p className="text-xs text-muted-text">Avg reply: under 2 minutes</p>
				</div>
			</div>

			<button
				type="button"
				onClick={onChat}
				className="px-4 py-1.5 rounded-full border border-muted-text/20 hover:border-primary/40 text-xs font-semibold text-primary bg-white transition-colors shadow-2xs shrink-0"
			>
				Chat
			</button>
		</div>
	);
}
