import { OrderHistory } from "@/types/order";
import OrderHistoryCard from "@/components/order/OrderHistoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

type Props = {
	selectedItems: Record<string, boolean>;
	onSelect: (id: string) => void;
	onViewReceipt: (order: OrderHistory) => void;
};

export default function OrderHistoryList({
	selectedItems,
	onSelect,
	onViewReceipt,
}: Props) {
	const [orders, setOrders] = useState<OrderHistory[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchHistory = async () => {
			try {
				setLoading(true);
				const res = await axios.get("/api/orders/history");
				const data = res.data.orderHistory || [];
				setOrders(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchHistory()
	}, []);
	return (
		<div className="bg-white rounded-3xl p-5 shadow-sm border border-cream space-y-4 min-h-50">
			{loading ? (
				<div className="min-h-50 flex items-center justify-center">
					<Loader2 className="animate-spin text-muted-text" />
				</div>
			) : (
				<>
					{orders.length > 0 ? (
						<>
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
						</>
					) : (
						<p className="text-center text-muted-text text-sm">No history found</p>
					)}
				</>
			)}
		</div>
	);
}
