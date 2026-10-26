import ActiveOrderCard from "@/components/order/ActiveOrderCard";
import { RootState } from "@/store/store";
import { IndianRupee, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Button";

type Props = {
	onViewCart: () => void;
	onCallWaiter: () => void;
};

type OrderItem = {
	foodId: {
		_id: string;
		img: string;
		desc: string;
		rating: number;
		tags: string[];
		estPreparationTime: string;
	};
	name: string;
	quantity: number;
	price: number;
	subtotal: number;
};

export type ActiveOrderType = {
	_id: string;
	tableNumber: string;
	branch: string;
	activeCount: number;
	subtotal: number;
	items: OrderItem[];
	status: string;
};

export default function ActiveOrders({ onViewCart, onCallWaiter }: Props) {
	const [loading, setLoading] = useState(true);
	const [activeOrders, setActiveOrders] = useState<ActiveOrderType[]>([]);
	const tableId = useSelector((state: RootState) => state.table.id);
	const [error,setError] = useState<string | null>(null)
	const currentTableNumber = useSelector(
		(state: RootState) => state.table.tableNumber,
	);
	const activeOrdersTotalAmount = Math.ceil(activeOrders.reduce((amount,order) => amount + order.subtotal,0))
	useEffect(() => {

		const fetchCurrentOrder = async () => {
			setLoading(true);
			try {
				const queryParams = new URLSearchParams({ status: "pending" });
				if (tableId) {
					queryParams.append("tableId", tableId);
				}

				const res = await fetch(`/api/orders?${queryParams.toString()}`);
				if (!res.ok) {
					throw new Error("Failed to fetch order");
				}

				const data = await res.json();
				if (data?.orders?.length > 0) {
					setActiveOrders(data.orders);
				} else {
					setActiveOrders([]);
				}
			} catch (error : any) {
				setError(error)
			} finally {
				setLoading(false)
			}
		};

		fetchCurrentOrder();

		return () => {
			
		};
	}, []);

	if(error){
		return <p className="text-center text-muted-text mt-10">No active orders found</p>
	}

	return (
		<div className="">
			{loading ? (
				<div className="flex flex-col items-center justify-center py-20 space-y-3">
					<Loader2 className="w-8 h-8 text-primary animate-spin" />
					<p className="text-xs text-muted-text">Fetching current order...</p>
				</div>
			) : activeOrders.length ? (
				<div className="space-y-2">
					{activeOrders.map((order) => (
						<ActiveOrderCard
							subtotal={Math.ceil(order?.subtotal)}
							activeOrder={order}
							key={order._id}
						/>
					))}
					<div className="flex justify-between px-3 py-2 items-end">
						<h1 className="text-lg font-bold leading-4">Total Order Amount : </h1>
						<div className="flex items-end">
							<IndianRupee
								size={16}
								strokeWidth={3}
							/>
							<span className="font-(family-name:--font-playfair) text-2xl font-bold leading-6">
								{activeOrdersTotalAmount}
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<Button
							variant="outline"
							size="md"
							onClick={onViewCart}
						>
							View Full Cart
						</Button>

						<Button
							fullWidth
							size="md"
							onClick={onCallWaiter}
						>
							Call Waiter
						</Button>
					</div>
				</div>
			) : (
				<div className="pb-20 pt-8 text-center text-muted-text">
					No active order
				</div>
			)}
		</div>
	);
}
