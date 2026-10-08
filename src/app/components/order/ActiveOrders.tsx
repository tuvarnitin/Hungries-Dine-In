import ActiveOrderCard from "@/components/order/ActiveOrderCard";
import QuickAddCard from "@/components/order/QuickAddCard";
import { ActiveOrderType } from "@/types/cart";

type Props = {
	activeOrder: ActiveOrderType;
	onViewCart: () => void;
	onCallWaiter: () => void;
	onAddDishes: () => void;
};

export default function ActiveOrders({
	activeOrder,
	onViewCart,
	onCallWaiter,
	onAddDishes,
}: Props) {
	return (
		<div className="space-y-4">
			{activeOrder.items.length ? (
				<>
					<ActiveOrderCard
						activeOrder={activeOrder}
						onViewCart={onViewCart}
						onCallWaiter={onCallWaiter}
					/>
					<QuickAddCard
						tableNumber={activeOrder.tableNumber}
						onClick={onAddDishes}
					/>
				</>
			) : (
				<div className="pb-20 pt-8 text-center text-muted-text">
					No active order
				</div>
			)}
		</div>
	);
}
