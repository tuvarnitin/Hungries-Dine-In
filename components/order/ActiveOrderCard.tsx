import Button from "@/components/Button";
import { ActiveOrderType } from "@/types/cart";

type Props = {
	activeOrder: ActiveOrderType;
	onViewCart: () => void;
	onCallWaiter: () => void;
};

export default function ActiveOrderCard({
	activeOrder,
	onViewCart,
	onCallWaiter,
}: Props) {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-sm border border-muted-text/15 space-y-4">
			<div className="flex items-center justify-between pb-3 border-b border-muted-text/10">
				<div className="flex items-center space-x-2">
					<span className="font-bold text-dark-text text-sm">
						{activeOrder.tableNumber}
					</span>
					<span className="text-muted-text text-xs">• {activeOrder.branch}</span>
				</div>

				<span className="inline-flex items-center text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-full text-xs">
					<span className="w-1.5 h-1.5 bg-primary rounded-full mr-1 animate-pulse" />
					{activeOrder.activeCount} Active Items
				</span>
			</div>

			{activeOrder.items.map((cart) => (
				<div
					key={cart.item._id || cart.id}
					className="flex items-center justify-between py-2 border-b border-muted-text/10 last:border-0"
				>
					<div className="flex items-center space-x-3 min-w-0">
						<img
							src={cart.item.img}
							alt={cart.item.name}
							className="w-12 h-12 rounded-xl object-cover shadow-xs shrink-0"
						/>

						<div className="min-w-0">
							<h4 className="font-bold text-dark-text text-sm truncate">
								{cart.item.name}
							</h4>

							<p className="text-xs text-muted-text truncate">{cart.item.desc}</p>
						</div>
					</div>

					<div className="flex items-end font-semibold h-max gap-1 shrink-0 ml-3 text-dark-text">
						<span className="text-xs leading-0">X</span>
						<span className="text-xl leading-1">{cart.quantity}</span>
					</div>
				</div>
			))}

			<div className="pt-3 border-t border-muted-text/10 flex items-center justify-between">
				<span className="text-xs font-semibold text-muted-text">
					Order Subtotal:
				</span>

				<span className="font-extrabold text-red text-base">
					${activeOrder.subtotal.toFixed(2)}
				</span>
			</div>

			<div className="grid grid-cols-2 gap-3 pt-1">
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
	);
}
