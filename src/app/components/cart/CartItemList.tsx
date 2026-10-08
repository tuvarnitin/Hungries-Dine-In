import CartItem from "@/components/cart/CartItem";
import { removeItem, updateQuantity } from "@/store/features/cart/cartSlice";
import { RootState } from "@/store/store";
import { ICartItem } from "@/types/cart";
import { useDispatch, useSelector } from "react-redux";


export default function CartItemList() {
	const dispatch = useDispatch()
	const cart : ICartItem[] = useSelector((state:RootState) => state.cart.items);
	return (
		<div className="space-y-3.5">
			{cart.map((cartItem) => (
				<CartItem
					key={cartItem.id}
					cartItem={cartItem}
					onRemove={()=>dispatch(removeItem(cartItem.id))}
					onIncrease={() =>
						dispatch(updateQuantity({ id: cartItem.id, value: 1 }))
					}
					onDecrease={() =>
						dispatch(updateQuantity({ id: cartItem.id, value: -1 }))
					}
				/>
			))}
		</div>
	);
}
