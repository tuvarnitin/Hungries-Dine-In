import { OrderHistory } from "@/types/order";
import Button from "@/components/Button";

type Props = {
	order: OrderHistory | null;
	open: boolean;
	onClose: () => void;
	onReorder: (order: OrderHistory) => void;
};

export default function ReceiptModal({
	order,
	open,
	onClose,
	onReorder,
}: Props) {
	if (!open || !order) return null;

	return (
		<div className="fixed inset-0 z-50 bg-dark-text/60 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-cream w-full max-w-md rounded-3xl p-6 shadow-2xl border border-muted-text/15 space-y-4">
				<div className="flex items-center justify-between border-b border-muted-text/15 pb-3">
					<div>
						<h3 className="text-lg font-bold text-dark-text">
							Digital Receipt
						</h3>

						<p className="text-xs text-muted-text">
							{order.id} • {order.date}
						</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						aria-label="Close receipt"
						className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-text hover:bg-muted-text/10 hover:text-dark-text transition-colors"
					>
						✕
					</button>
				</div>

				<p className="text-xs font-semibold text-muted-text uppercase">
					Location: {order.restaurant}
				</p>

				<div className="bg-white p-3 rounded-xl border border-muted-text/15 space-y-2">
					{order.items.map((item, index) => (
						<div
							key={`${order.id}-${index}`}
							className="flex justify-between text-sm text-dark-text"
						>
							<span>{item}</span>

							<span className="font-medium text-primary">✓</span>
						</div>
					))}
				</div>

				<div className="pt-2 border-t border-muted-text/15 flex justify-between items-center">
					<span className="font-bold text-dark-text">Total Paid</span>

					<span className="font-extrabold text-xl text-red">{order.total}</span>
				</div>

				<Button
					onClick={() => onReorder(order)}
					fullWidth
				>
					Reorder Entire Meal
				</Button>
			</div>
		</div>
	);
}
