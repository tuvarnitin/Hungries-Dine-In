"use client";
import EmptyCart from "@/components/cart/EmptyCard";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCart,
	IInitialStateType,
} from "@/store/features/cart/cartSlice";
import AddMoreDishes from "@/components/cart/AddMoreDishes";
import CartItemList from "@/components/cart/CartItemList";
import CartHeader from "@/components/cart/CartHeader";
import OrderPricing from "@/components/cart/OrderPricing";
import SendOrderButton from "@/components/cart/SendOrderButton";

export default function CartScreen() {
	const { items } = useSelector(
		(state: { cart: IInitialStateType }) => state.cart,
	);

	// Calculations
	const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
	const subtotal = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const serviceFee = subtotal * 0.03;
	const estimatedTax = subtotal * 0.0825;
	const totalDue = subtotal + serviceFee + estimatedTax;

	const dispatch = useDispatch();

	const handleSendOrder = () => {}

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pb-28">
			<div className="w-full max-w-md mx-auto sm:p-5 space-y-4">
				{items?.length > 0 ? (
					<>
						<CartHeader onClear={() => dispatch(clearCart())} />

						{/* Cart Items List */}
						<CartItemList />

						{/* Add More Dishes Button */}
						<AddMoreDishes />

						{/* Order Pricing Summary Card */}
						<OrderPricing
							totalItems={totalItemsCount}
							subtotal={subtotal}
							serviceFee={serviceFee}
							estimatedTax={estimatedTax}
							totalDue={totalDue}
						/>
						<SendOrderButton
							totalDue={totalDue.toFixed(2)}
							onClick={handleSendOrder}
						/>
					</>
				) : (
					<EmptyCart />
				)}
			</div>
		</div>
	);
}