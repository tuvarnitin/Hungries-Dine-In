import { OrderPricingProps } from "@/types/order";
import { Info } from "lucide-react";

export default function OrderPricing({
	totalItems,
	subtotal,
	serviceFee,
	estimatedTax,
	totalDue,
}: OrderPricingProps) {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-3.5">
			<h3 className="text-sm font-bold">Order Pricing</h3>

			<div className="space-y-2.5 text-xs">
				<div className="flex justify-between text-neutral-600 font-medium">
					<span>Subtotal ({totalItems} items)</span>

					<span className="text-dark-text font-semibold">
						${subtotal.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between items-center text-neutral-600 font-medium">
					<span className="flex items-center space-x-1">
						<span>Dine-in Service & Tech (3%)</span>
						<Info className="w-3.5 h-3.5 text-neutral-400" />
					</span>

					<span className="text-dark-text font-semibold">
						${serviceFee.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between text-neutral-600 font-medium">
					<span>Estimated Tax (8.25%)</span>

					<span className="text-dark-text font-semibold">
						${estimatedTax.toFixed(2)}
					</span>
				</div>
			</div>

			<div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
				<span className="text-sm font-bold text-dark-text">Total Due</span>

				<span className="text-xl font-extrabold text-red font-(family-name:--font-playfair)">
					${totalDue.toFixed(2)}
				</span>
			</div>
		</div>
	);
}
