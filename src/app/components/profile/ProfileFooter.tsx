interface ProfileFooterProps {
	version?: string;
}

export default function ProfileFooter({
	version = "0.0.1",
}: ProfileFooterProps) {
	return (
		<div className="text-center pt-2 pb-6">
			<p className="text-[11px] text-muted-text font-medium">
				Hungries Dine v{version} • Table ID Sync OK
			</p>
		</div>
	);
}
