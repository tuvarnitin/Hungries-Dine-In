import { OrderHistory } from "@/types/order";
import OrderHistoryCard from "@/components/order/OrderHistoryCard";
import { Dispatch, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useOrderHistory } from "@/store/features/order/query";

type Props = {
	selectedItems: Record<string, boolean>;
	onSelect: (id: string) => void;
	onViewReceipt: (order: OrderHistory) => void;
	setOrderHistoryCount : Dispatch<number>
};

export default function OrderHistoryList({
	selectedItems,
	onSelect,
	onViewReceipt,
	setOrderHistoryCount,
}: Props) {
	const {
		data: orders = [],
		isPending,
		isError,
		refetch,
	} = useOrderHistory();

	useEffect(() => {
		setOrderHistoryCount(orders.length);
	}, [orders, setOrderHistoryCount]);

	if (isError) {
		return (
			<div
				className="bg-white rounded-3xl p-5 shadow-sm border border-cream min-h-50 text-center text-muted-text"
				role="alert"
			>
				<p>Couldn&apos;t load order history.</p>
				<button type="button" className="mt-2 underline" onClick={() => refetch()}>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-3xl p-5 shadow-sm border border-cream space-y-4 min-h-50">
			{isPending ? (
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
						<p className="text-center text-muted-text text-sm">
							No orders found.
						</p>
					)}
				</>
			)}
		</div>
	);
}
