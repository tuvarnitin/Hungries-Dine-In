"use client";

import React, { useState } from "react";
import {
	Edit3,
	Bell,
	Headphones,
	ScanFace,
	LogOut,
	ChevronRight,
	Star,
} from "lucide-react";

export default function ProfileScreen() {
	const [kitchenAlerts, setKitchenAlerts] = useState(true);

	return (
		<div className="min-h-svh flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 font-sans text-neutral-800">
			<div className="w-full max-w-md mx-auto space-y-4">
				{/* Top Profile Card */}
				<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 flex items-center justify-between relative">
					<div className="flex items-center space-x-4">
						<div className="relative">
							<div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-white overflow-hidden border-2 border-neutral-100">
								{/* User Avatar Fallback */}
								<img
									src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60"
									alt="profileImage"
                  className="w-full h-full object-cover"
								/>
							</div>
							<div className="absolute bottom-0 right-0 bg-[#0A3622] text-amber-400 rounded-full p-0.5 border-2 border-white shadow-xs">
								<Star className="w-3.5 h-3.5 fill-amber-400" />
							</div>
						</div>
						<div>
							<h2 className="text-lg font-bold text-neutral-900">
								Nitin Tuvar
							</h2>
							<p className="text-xs text-neutral-500 font-medium">
								nitintuvar2003@gmail.com
							</p>
							<p className="text-xs text-neutral-500 font-medium">
								+918053445590
							</p>
						</div>
					</div>

					<button className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-xs font-semibold text-neutral-700">
						<Edit3 className="w-3.5 h-3.5" />
						<span>Edit</span>
					</button>
				</div>

				{/* Preferences & Support Main Container */}
				<div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-neutral-100 space-y-4">
					<h3 className="text-lg font-bold text-neutral-900 px-1">
						Preferences & Support
					</h3>

					{/* Kitchen Status Alerts */}
					<div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-neutral-100/80">
						<div className="flex items-center space-x-3.5">
							<div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
								<Bell className="w-5 h-5" />
							</div>
							<div>
								<h4 className="text-sm font-bold text-neutral-900">
									Kitchen Status Alerts
								</h4>
								<p className="text-xs text-neutral-500">
									Real-time dish plating updates
								</p>
							</div>
						</div>
						<button
							onClick={() => setKitchenAlerts(!kitchenAlerts)}
							className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
								kitchenAlerts ? "bg-primary" : "bg-muted-text"
							}`}
							aria-label="Toggle Kitchen Status Alerts"
						>
							<div
								className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
									kitchenAlerts ? "translate-x-5" : "translate-x-0"
								}`}
							/>
						</button>
					</div>

					{/* Live Concierge & Host Support */}
					<div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-neutral-100/80">
						<div className="flex items-center space-x-3.5">
							<div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800">
								<Headphones className="w-5 h-5" />
							</div>
							<div>
								<h4 className="text-sm font-bold text-neutral-900">
									Live Concierge & Host Support
								</h4>
								<p className="text-xs text-neutral-500">
									Avg reply: under 2 minutes
								</p>
							</div>
						</div>
						<button className="px-4 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 text-xs font-semibold text-neutral-800 bg-white transition-colors shadow-2xs">
							Chat
						</button>
					</div>

					{/* Security & Biometrics */}
					<div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-neutral-100/80 cursor-pointer hover:bg-neutral-100/60 transition-colors">
						<div className="flex items-center space-x-3.5">
							<div className="w-11 h-11 rounded-xl bg-amber-50/70 flex items-center justify-center text-amber-700">
								<ScanFace className="w-5 h-5" />
							</div>
							<div>
								<h4 className="text-sm font-bold text-neutral-900">
									Security & Biometrics
								</h4>
								<p className="text-xs text-neutral-500">
									Face ID active for table pay
								</p>
							</div>
						</div>
						<ChevronRight className="w-4 h-4 text-neutral-400" />
					</div>

					{/* Sign Out Button */}
					<button className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl border border-amber-900/10 hover:bg-amber-50/30 text-amber-800 transition-colors mt-2">
						<LogOut className="w-4 h-4" />
						<span className="text-sm text-red font-semibold">Sign Out of</span>
					</button>
				</div>

				{/* Version Footer */}
				<div className="text-center pt-2 pb-6">
					<p className="text-[11px] text-neutral-400 font-medium">
						Hungries Dine v0.0.1 • Table ID Sync OK
					</p>
				</div>
			</div>
		</div>
	);
}
