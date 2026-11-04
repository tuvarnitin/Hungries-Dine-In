import ProfileActionCard from "./ProfileActionCard";
import { useState } from "react";
import { Bell, ChevronRight, Headphones, ScanFace } from "lucide-react";

interface PreferencesSectionProps {
	onChat?: () => void;
	onSecurity?: () => void;
	onSignOut?: () => void;
}

export default function PreferencesSection({
	onChat,
	onSignOut,
}: PreferencesSectionProps) {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-muted-text/15 space-y-4">
			<h3 className="text-lg font-bold text-dark-text px-1">
				Preferences & Support
			</h3>

			<ProfileActionCard
				Icon={<Bell className="w-5 h-5" />}
				bg="bg-gold/15"
				color="text-gold"
				title="Kitchen Status Alert"
				subTitle="Real-time disg plating updates"
				button={
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
				}
			/>
			<ProfileActionCard
				Icon={<Headphones className="w-5 h-5" />}
				bg="bg-primary/15"
				color="text-primary"
				title="Live Concierge & Host Support"
				subTitle="Avg reply: under 2 minutes"
				button={
					<button
						type="button"
						onClick={onChat}
						className="px-4 py-1.5 rounded-full border border-muted-text/20 hover:border-primary/40 text-xs font-semibold text-primary bg-white transition-colors shadow-2xs shrink-0"
					>
						Chat
					</button>
				}
			/>
			<ProfileActionCard
				Icon={<ScanFace className="w-5 h-5" />}
				bg="bg-gold/15"
				color="text-gold"
				title="Security & Biometrics"
				subTitle="Face ID active for table pay"
				button={<ChevronRight className="w-4 h-4 text-muted-text shrink-0" />}
			/>
			<button
				type="button"
				onClick={onSignOut}
				className="w-full rounded-full border border-muted-text/20 py-2 text-sm font-semibold text-primary"
			>
				Sign out
			</button>
		</div>
	);
}
