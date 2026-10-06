import CartItem from "@/components/cart/CartItem";
import { CartItemListProps } from "@/types/cart";

export default function CartItemList({
	items,
	onRemove,
	onIncrease,
	onDecrease,
}: CartItemListProps) {
	return (
		<div className="space-y-3.5">
			{items.map((item) => (
				<CartItem
					key={item.id}
					item={item}
					onRemove={onRemove}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
				/>
			))}
		</div>
	);
}
