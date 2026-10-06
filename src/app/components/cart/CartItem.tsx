import { X } from "lucide-react";
import QuantityControl from "@/components/cart/QuantityControl";
import { CartItemProps } from "@/types/cart";

export default function CartItem({
	item,
	onRemove,
	onIncrease,
	onDecrease,
}: CartItemProps) {
	return (
		<div className="bg-cream rounded-3xl p-4 shadow-sm relative space-y-2.5">
			<button
				type="button"
				onClick={() => onRemove(item.id)}
				className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
				aria-label={`Remove ${item.name}`}
			>
				<X className="w-4 h-4" />
			</button>

			<div className="flex space-x-3 items-start pr-6">
				<img
					src={item.img}
					alt={item.name}
					className="w-20 h-20 rounded-2xl object-cover shrink-0"
				/>

				<div className="space-y-1 flex-1">
					<h3 className="font-(family-name:--font-playfair) text-[16px] font-bold leading-tight w-[90%]">
						{item.name}
					</h3>

					<p className="mt-1.5 line-clamp-2 max-w-2xl text-[11px] leading-4 text-muted-text">
						{item.desc}
					</p>

					<p className="text-base font-bold text-neutral-900 pt-0.5">
						<span className="font-(family-name:--font-playfair) text-2xl font-bold text-primary">
							${item.price.toFixed(2)}
						</span>
					</p>
				</div>
			</div>

			<QuantityControl
				quantity={item.quantity}
				onDecrease={() => onDecrease(item.id)}
				onIncrease={() => onIncrease(item.id)}
			/>
		</div>
	);
}
