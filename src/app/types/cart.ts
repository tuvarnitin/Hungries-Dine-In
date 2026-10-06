export interface CartItemProps {
	item: CartItem;
	onRemove: (id: string) => void;
	onIncrease: (id: string) => void;
	onDecrease: (id: string) => void;
}

export interface AddonOption {
	id: string;
	name: string;
	price?: number;
	checked: boolean;
}

export interface CartItem {
	id: string;
	name: string;
	desc: string;
	price: number;
	quantity: number;
	img: string;
	addonsOpen?: boolean;
	addons?: AddonOption[];
}

export interface CartItemListProps {
	items: CartItem[];
	onRemove: (id: string) => void;
	onIncrease: (id: string) => void;
	onDecrease: (id: string) => void;
}

export interface AddOnsType {
	id: string;
	name: string;
	checked: boolean;
}

export type ActiveCartData = {
	tableNumber: string;
	branch: string;
	activeCount: number;
	subtotal: number;
	items: CartItem[];
};
