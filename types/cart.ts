import { FoodType } from "./food";

export interface CartItemProps {
	cartItem: ICartItem;
}

export interface ICartItem {
	foodId: string;
	img: string;
	tags: string[];
	name: string;
	price: number;
	quantity: number;
	desc:string
}

export interface CartItemType {
	id: string;
	item: FoodType;
	quantity: number;
}

export interface CartItemListProps {
	cart: CartItemType[];
	onRemove: (id: string) => void;
	onIncrease: (id: string) => void;
	onDecrease: (id: string) => void;
}

export interface AddOnsType {
	id: string;
	name: string;
	checked: boolean;
}

export type ActiveOrderType = {
	tableNumber: string;
	branch: string;
	activeCount: number;
	subtotal: number;
	items: CartItemType[];
};
