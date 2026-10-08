import { X } from "lucide-react";
// import { CartItemProps } from "@/types/cart";
import QuantityControl from "@/components/cart/QuantityControl";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "@/store/features/cart/cartSlice";
import { ICartItem } from "@/types/cart";
export interface CartItemProps {
	cartItem: ICartItem;
	onRemove: (id: string) => void;
	onIncrease: (id: string) => void;
	onDecrease: (id: string) => void;
}
export default function CartItem({ cartItem }: CartItemProps) {
	const dispatch = useDispatch();
	return (
		<div className="bg-cream rounded-3xl p-4 shadow-sm relative">
			<button
				type="button"
				onClick={() => dispatch(removeItem(cartItem.id))}
				className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
				aria-label={`Remove ${cartItem.name}`}
			>
				<X className="w-4 h-4" />
			</button>

			<div className="flex space-x-3 items-start pr-6">
				<img
					src={cartItem.img}
					alt={cartItem.name}
					className="w-20 h-20 rounded-2xl object-cover shrink-0"
				/>

				<div className="space-y-1.5 flex-1">
					<h3 className="font-(family-name:--font-playfair) text-md font-bold leading-tight w-[90%]">
						{cartItem.name}
					</h3>

					<p className="line-clamp-2 max-w-2xl text-[11px] leading-4 text-muted-text">
						{cartItem.desc}
					</p>

					<p className="text-base font-bold text-neutral-900">
						<span className="font-(family-name:--font-playfair) text-2xl font-bold text-red">
							${cartItem.price.toFixed(2)}
						</span>
					</p>
				</div>
			</div>

			<QuantityControl
				quantity={cartItem.quantity}
				onDecrease={() =>
					dispatch(updateQuantity({ id: cartItem.id, value: -1 }))
				}
				onIncrease={() =>
					dispatch(updateQuantity({ id: cartItem.id, value: 1 }))
				}
			/>
		</div>
	);
}
