import { CartItemType, ICartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUpdateQuantity {
	id: string;
	value: number;
}

export type IInitialStateType = {
	items: ICartItem[];
};

const initialState: IInitialStateType = { items: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, actions: PayloadAction<ICartItem>) => {
			state.items.push(actions.payload);
		},
		updateQuantity: (state, actions: PayloadAction<IUpdateQuantity>) => {
			const item = state.items.find((item) => item.id === actions.payload.id)
			if (actions.payload.value === -1 && item?.quantity === 1) {
				state.items = state.items.filter(
					(cartItem) => cartItem.id !== actions.payload.id,
				);
				return;
			}
			const newCart = state.items.map((cartItem) =>
				cartItem.id === actions.payload.id
					? {
							...cartItem,
							quantity: cartItem.quantity + actions.payload.value,
						}
					: cartItem,
			);
			state.items = newCart;
		},
		removeItem: (state, actions: PayloadAction<string>) => {
			const newCart = state.items.filter(
				(cartItem) => cartItem.id !== actions.payload,
			);
			state.items = newCart;
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addToCart, updateQuantity, removeItem, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
