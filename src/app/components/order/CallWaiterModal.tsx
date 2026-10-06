import { BellRing } from "lucide-react";
import Button from "@/components/Button";

type Props = {
	open: boolean;
	onClose: () => void;
	tableNumber: string;
};

export default function CallWaiterModal({ open, onClose, tableNumber }: Props) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 bg-dark-text/60 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-cream w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-muted-text/15 text-center space-y-4">
				<div className="w-16 h-16 bg-primary text-gold rounded-full flex items-center justify-center mx-auto shadow-lg">
					<BellRing className="w-7 h-7" />
				</div>

				<h3 className="text-xl font-bold text-dark-text">
					Waiter Called to {tableNumber}
				</h3>

				<p className="text-sm text-muted-text">
					Your floor assistant has been notified and is heading to your table
					right away.
				</p>

				<Button
					onClick={onClose}
					fullWidth
				>
					Okay, Thanks
				</Button>
			</div>
		</div>
	);
}
