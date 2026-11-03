import { useQuery } from "@tanstack/react-query";
import { getActiveOrders, getOrderHistory } from "./api";

const ORDER_STALE_TIME = 5 * 60 * 1000;

export const orderQueryKeys = {
	active: ["orders", "active"] as const,
	activeForTable: (tableId?: string | null) =>
		[...orderQueryKeys.active, tableId ?? null] as const,
	history: ["orders", "history"] as const,
};

export function useActiveOrders(tableId?: string | null) {
	return useQuery({
		queryKey: orderQueryKeys.activeForTable(tableId),
		queryFn: () => getActiveOrders(tableId),
		staleTime: ORDER_STALE_TIME,
	});
}

export function useOrderHistory() {
	return useQuery({
		queryKey: orderQueryKeys.history,
		queryFn: getOrderHistory,
		staleTime: ORDER_STALE_TIME,
	});
}
