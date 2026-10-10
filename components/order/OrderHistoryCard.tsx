import { OrderHistory } from "@/types/order";

type Props = {
	order: OrderHistory;
	selected: boolean;
	onSelect: (id: string) => void;
	onViewReceipt: (order: OrderHistory) => void;
};

export default function OrderHistoryCard({
	order,
	selected,
	onSelect,
	onViewReceipt,
}: Props) {
	return (
		<div
			className={`p-3.5 rounded-2xl border transition-all ${
				selected
					? "bg-emerald-50/60 border-emerald-600 shadow-sm"
					: "bg-[#FAF6F0]/60 border-[#F0EBE1]"
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start space-x-3">
					<input
						type="checkbox"
						checked={selected}
						onChange={() => onSelect(order.id)}
						className="mt-1 w-4 h-4 text-[#062E1B] rounded border-gray-300 focus:ring-[#062E1B]"
					/>

					<div>
						<span className="text-xs text-[#7A7067] font-medium">
							{order.date} • {order.id}
						</span>

						<h4 className="font-bold text-[#2C221E] text-sm">
							{order.restaurant}
						</h4>

						<p className="text-xs text-[#7A7067] mt-0.5 line-clamp-1">
							{order.items.join(", ")}
						</p>

						<div className="flex items-center space-x-1 text-amber-500 pt-1">
							{Array.from({ length: order.rating }, (_, index) => (
								<span key={index}>★</span>
							))}
						</div>
					</div>
				</div>

				<div className="text-right flex flex-col items-end">
					<span className="font-extrabold text-[#8B2613] text-base">
						{order.total}
					</span>

					<a
						onClick={() => onViewReceipt(order)}
						className="mt-2 text-xs text-[#062E1B] font-semibold underline hover:text-dark-text"
					>
						View Receipt
					</a>
				</div>
			</div>
		</div>
	);
}
