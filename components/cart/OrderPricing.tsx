import { OrderPricingProps } from "@/types/order";
import { IndianRupee, Info } from "lucide-react";

export default function OrderPricing({
	totalItems,
	subtotal,
	estimatedTax,
	totalDue,
}: OrderPricingProps) {
	return (
		<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-3.5">
			<h3 className="text-sm font-bold">Order Pricing</h3>

			<div className="space-y-2.5 text-xs">
				<div className="flex justify-between text-neutral-600 font-medium">
					<span>Subtotal ({totalItems} items)</span>

					<div className="flex items-end">
						<IndianRupee
							size={11}
							className="h-fit"
							strokeWidth={3}
						/>
						<span className="text-dark-text text-sm font-semibold leading-3">
							{subtotal}
						</span>
					</div>
				</div>

				<div className="flex justify-between text-neutral-600 font-medium">
					<span>Estimated Tax (8.25%)</span>
					<div className="flex items-end">
						<IndianRupee
							size={11}
							className="h-fit"
							strokeWidth={3}
						/>
						<span className="text-dark-text text-sm font-semibold leading-3">
							{estimatedTax}
						</span>
					</div>
				</div>
			</div>

			<div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
				<span className="text-sm font-bold text-dark-text">Total Due</span>

				<div className="text-red font-(family-name:--font-playfair) flex items-end">
					<IndianRupee
						size={16}
						className="h-fit"
						strokeWidth={3}
					/>
					<span className="text-xl font-extrabold leading-6">{Math.ceil(Number(totalDue))}</span>
				</div>
			</div>
		</div>
	);
}
