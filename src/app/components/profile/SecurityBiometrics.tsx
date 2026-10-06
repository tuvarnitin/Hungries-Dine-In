"use client";

import { ChevronRight, ScanFace } from "lucide-react";

interface SecurityBiometricsProps {
	onClick?: () => void;
}

export default function SecurityBiometrics({
	onClick,
}: SecurityBiometricsProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-muted-text/15 hover:bg-background transition-colors text-left"
		>
			<div className="flex items-center space-x-3.5 min-w-0">
				<div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
					<ScanFace className="w-5 h-5" />
				</div>

				<div className="min-w-0">
					<h4 className="text-sm font-bold text-dark-text">
						Security & Biometrics
					</h4>

					<p className="text-xs text-muted-text">
						Face ID active for table pay
					</p>
				</div>
			</div>

			<ChevronRight className="w-4 h-4 text-muted-text shrink-0" />
		</button>
	);
}
