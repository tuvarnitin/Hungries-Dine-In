import { OrderHistory } from "@/types/order";
import OrderHistoryCard from "@/components/order/OrderHistoryCard";

type Props = {
	orders: OrderHistory[];
	selectedItems: Record<string, boolean>;
	onSelect: (id: string) => void;
	onViewReceipt: (order: OrderHistory) => void;
};

export default function OrderHistoryList({
	orders,
	selectedItems,
	onSelect,
	onViewReceipt,
}: Props) {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-sm border border-cream space-y-4">
			<div className="flex items-center justify-between mb-2">
				<h3 className="font-bold text-base text-[#2C221E]">
					Past Dining History
				</h3>

				<span className="text-xs font-semibold text-[#7A7067]">
					Tap to Select
				</span>
			</div>

			{orders.map((order) => (
				<OrderHistoryCard
					key={order.id}
					order={order}
					selected={!!selectedItems[order.id]}
					onSelect={onSelect}
					onViewReceipt={onViewReceipt}
				/>
			))}
		</div>
	);
}
