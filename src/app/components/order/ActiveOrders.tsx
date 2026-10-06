import ActiveOrderCard from "@/components/order/ActiveOrderCard";
import QuickAddCard from "@/components/order/QuickAddCard";
import { ActiveCartData } from "@/types/cart";

type Props = {
	table: ActiveCartData;
	onViewCart: () => void;
	onCallWaiter: () => void;
	onAddDishes: () => void;
};

export default function ActiveOrders({
	table,
	onViewCart,
	onCallWaiter,
	onAddDishes,
}: Props) {
	return (
		<div className="space-y-4">
			<ActiveOrderCard
				table={table}
				onViewCart={onViewCart}
				onCallWaiter={onCallWaiter}
			/>
			<QuickAddCard
				tableNumber={table.tableNumber}
				onClick={onAddDishes}
			/>
		</div>
	);
}
