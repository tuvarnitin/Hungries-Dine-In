import ActiveOrderCard from "@/components/order/ActiveOrderCard";
import { IndianRupee, Loader2 } from "lucide-react";
import { Dispatch, useEffect } from "react";
import Button from "@/components/Button";
import { useActiveOrders } from "@/store/features/order/query";
import { notifyError } from "@/lib/toast-notifications";

export type { ActiveOrderType } from "@/store/features/order/api";

type Props = {
	onViewCart: () => void;
	onCallWaiter: () => void;
	setAcitveOrdersCount : Dispatch<number>;
};

export default function ActiveOrders({
	onViewCart,
	onCallWaiter,
	setAcitveOrdersCount,
}: Props) {
	const {
		data: activeOrders = [],
		error,
		isPending,
		isError,
		refetch,
	} = useActiveOrders();

	useEffect(() => {
		setAcitveOrdersCount(activeOrders.length);
	}, [activeOrders, setAcitveOrdersCount]);

	useEffect(() => {
		if (isError) {
			notifyError(error, "Couldn't load active orders.");
		}
	}, [error, isError]);

	const activeOrdersTotalAmount = Math.ceil(
		activeOrders.reduce((amount, order) => amount + order.subtotal, 0),
	);

	if (isError) {
		return (
			<div className="mt-10 text-center text-muted-text" role="alert">
				<button type="button" className="mt-2 underline" onClick={() => refetch()}>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="">
			{isPending ? (
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
						<h1 className="text-lg font-bold leading-4">
							Total Order Amount :{" "}
						</h1>
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
					No active orders found.
				</div>
			)}
		</div>
	);
}
