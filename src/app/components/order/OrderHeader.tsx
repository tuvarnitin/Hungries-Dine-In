"use client";
import BackButton from "@/components/BackButton";
import TrashButton from "@/components/TrashButton";
import { ActiveCartData } from "@/types/cart";

type Props = {
	table: ActiveCartData;
	onBack: () => void;
	onClear: () => void;
};

export default function OrdersHeader({ table }: Props) {
	return (
		<div className="w-full max-w-md relative flex items-center">
			<BackButton />
			<div className="text-center grow">
				<h1 className="text-lg font-bold text-dark-text">My Orders</h1>
				<div className="flex items-center justify-center space-x-1.5 text-xs text-muted-text mt-0.5">
					<span className="font-medium text-dark-text">
						{table.tableNumber}
					</span>
					<span>•</span>
					<span>{table.branch}</span>
				</div>
			</div>
		</div>
	);
}
