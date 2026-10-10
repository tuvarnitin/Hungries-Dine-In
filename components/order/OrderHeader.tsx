"use client";
import BackButton from "@/components/BackButton";
import { ActiveOrderType } from "@/types/cart";

type Props = {
	activeOrder: ActiveOrderType;
	onBack: () => void;
	onClear: () => void;
};

export default function OrdersHeader({ activeOrder }: Props) {
	return (
		<div className="w-full max-w-md relative flex items-center">
			<BackButton />
			<div className="text-center grow">
				<h1 className="text-lg font-bold text-dark-text">My Orders</h1>
				<div className="flex items-center justify-center space-x-1.5 text-xs text-muted-text mt-0.5">
					<span className="font-medium text-dark-text">
						{activeOrder.tableNumber}
					</span>
					<span>•</span>
					<span>{activeOrder.branch}</span>
				</div>
			</div>
		</div>
	);
}
