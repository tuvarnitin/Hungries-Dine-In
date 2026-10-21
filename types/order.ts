import { ICartItem } from "@/types/cart";


export type OrderHistory = {
  id: string;
  date: string;
  restaurant?: string;
  total: string;
  rating: number;
  items: {
    name: string;
  }[];
};


export interface OrderPricingProps {
	totalItems: number;
	subtotal: number;
	serviceFee: number;
	estimatedTax: number;
	totalDue: number;
}

export type SelectedHistoryItems = Record<string, boolean>;
