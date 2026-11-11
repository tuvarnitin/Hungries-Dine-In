import type { ICartItem } from "@/types/cart";

export type OrderHistory = {
	id: string;
	tableNumber: number;
	date: string;
	restaurant?: string;
	total: string;
	rating: number;
	items: (Pick<
		ICartItem,
		"foodId" | "img" | "tags" | "name" | "price" | "quantity" | "desc" | "category"
	> & {
		displayName: string;
	})[];
	status: string
};


export interface OrderPricingProps {
	totalItems: number;
	subtotal: number;
	estimatedTax: number;
	totalDue: number;
}

export type SelectedHistoryItems = Record<string, boolean>;
