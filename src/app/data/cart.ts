import { ActiveOrderType, CartItemType } from "@/types/cart";

export const dummyCartItems: CartItemType[] = [
];

export const activeCartData: ActiveOrderType = {
	tableNumber: "Table #14",
	branch: "Hungries Dine",
	activeCount: 3,
	subtotal: 32.7,
	items: dummyCartItems,
};
