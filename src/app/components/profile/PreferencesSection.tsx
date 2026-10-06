import KitchenStatusAlert from "./KitchenStatusAlert";
import ConciergeSupport from "./ConciergeSupport";
import SecurityBiometrics from "./SecurityBiometrics";
import SignOutButton from "./SignOutButton";

interface PreferencesSectionProps {
	onChat?: () => void;
	onSecurity?: () => void;
	onSignOut?: () => void;
}

export default function PreferencesSection({
	onChat,
	onSecurity,
	onSignOut,
}: PreferencesSectionProps) {
	return (
		<div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-muted-text/15 space-y-4">
			<h3 className="text-lg font-bold text-dark-text px-1">
				Preferences & Support
			</h3>

			<KitchenStatusAlert />

			<ConciergeSupport onChat={onChat} />

			<SecurityBiometrics onClick={onSecurity} />

			<SignOutButton onClick={onSignOut} />
		</div>
	);
}
