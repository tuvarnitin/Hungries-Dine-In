"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function KitchenStatusAlert() {
	const [enabled, setEnabled] = useState(true);

	return (
		<div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-muted-text/15">
			<div className="flex items-center space-x-3.5 min-w-0">
				<div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center text-gold shrink-0">
					<Bell className="w-5 h-5" />
				</div>

				<div className="min-w-0">
					<h4 className="text-sm font-bold text-dark-text">
						Kitchen Status Alerts
					</h4>

					<p className="text-xs text-muted-text">
						Real-time dish plating updates
					</p>
				</div>
			</div>

			<button
				type="button"
				onClick={() => setEnabled((prev) => !prev)}
				aria-label="Toggle Kitchen Status Alerts"
				aria-pressed={enabled}
				className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
					enabled ? "bg-primary" : "bg-muted-text"
				}`}
			>
				<div
					className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${
						enabled ? "translate-x-5" : "translate-x-0"
					}`}
				/>
			</button>
		</div>
	);
}
