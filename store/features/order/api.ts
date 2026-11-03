import { OrderHistory } from "@/types/order";
import axios from "axios";

type ActiveOrderItem = {
	foodId: {
		_id: string;
		img: string;
		desc: string;
		rating: number;
		tags: string[];
		estPreparationTime: string;
	};
	name: string;
	quantity: number;
	price: number;
	subtotal: number;
};

export type ActiveOrderType = {
	_id: string;
	tableNumber: string;
	branch: string;
	activeCount: number;
	subtotal: number;
	items: ActiveOrderItem[];
	status: string;
};

export async function getActiveOrders(
	tableId?: string | null,
): Promise<ActiveOrderType[]> {
	const res = await axios.get<{ orders: ActiveOrderType[] }>("/api/orders", {
		params: {
			status: "pending",
			...(tableId ? { tableId } : {}),
		},
	});

	return res.data.orders;
}

export async function getOrderHistory(): Promise<OrderHistory[]> {
	const res = await axios.get<{
		orderHistory: (Omit<OrderHistory, "total"> & { total: number })[];
	}>("/api/orders/history");

	return res.data.orderHistory.map((order) => ({
		...order,
		total: String(order.total),
	}));
}
