import { ICartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUpdateQuantity {
	foodId: string;
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
		addItemsToCart: (state, actions: PayloadAction<ICartItem[]>) => {
			for (const newItem of actions.payload) {
				const existingItem = state.items.find(
					(item) => item.foodId === newItem.foodId,
				);

				if (existingItem) {
					existingItem.quantity += newItem.quantity;
				} else {
					state.items.push(newItem);
				}
			}
		},
		updateQuantity: (state, actions: PayloadAction<IUpdateQuantity>) => {
			const item = state.items.find(
				(item) => item.foodId === actions.payload.foodId,
			);
			if (!item) return;

			if (item.quantity + actions.payload.value <= 0) {
				state.items = state.items.filter(
					(cartItem) => cartItem.foodId !== actions.payload.foodId,
				);
			} else {
				item.quantity += actions.payload.value;
			}
		},
		removeItem: (state, actions: PayloadAction<string>) => {
			const newCart = state.items.filter(
				(cartItem) => cartItem.foodId !== actions.payload,
			);
			state.items = newCart;
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const {
	addToCart,
	addItemsToCart,
	updateQuantity,
	removeItem,
	clearCart,
} =
	cartSlice.actions;
export default cartSlice.reducer;
