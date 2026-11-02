import { OrderHistory } from "@/types/order";
import { IndianRupee } from "lucide-react";

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
			<div className="flex items-start justify-between w-full">
				<div className="flex items-start space-x-3">
					<input
						type="checkbox"
						checked={selected}
						onChange={() => onSelect(order.id)}
						className="mt-1 w-4 h-4 text-[#062E1B] rounded border-gray-300 focus:ring-[#062E1B]"
					/>

					<div>
						<span className="text-xs text-[#7A7067] font-medium">
							{order.date} • Table #{order.tableNumber}
						</span>

						<h4 className="font-bold text-[#2C221E] text-sm">
							{order.restaurant}
						</h4>

						<p className="text-xs text-[#7A7067] mt-0.5 line-clamp-1">
							{order.items.map(({ name }) => `${name}, `)}
						</p>

						<div className="flex items-center space-x-1 text-amber-500 pt-1">
							{Array.from({ length: order.rating }, (_, index) => (
								<span key={index}>★</span>
							))}
						</div>
					</div>
				</div>
				<div className="text-right flex flex-col items-end">
					<div>
						<span
							className={`text-[10px] py-0.5 px-1 rounded-full ${order.status === "delivered" ? "text-green-500 bg-green-100 border border-green-500" : "text-red-500 bg-red-100 border border-red-500"}`}
						>
							{order.status}
						</span>
					</div>
					<div className="flex items-end text-red font-(family-name:--font-playfair)">
						<IndianRupee
							size={15}
							className="h-fit"
							strokeWidth={3}
						/>
						<span className="font-extrabold text-xl leading-6">
							{order.total}
						</span>
					</div>

					<a
						onClick={() => onViewReceipt(order)}
						className="mt-2 text-xs text-primary text-nowrap font-semibold underline hover:text-dark-text"
					>
						View Receipt
					</a>
				</div>
			</div>
		</div>
	);
}
