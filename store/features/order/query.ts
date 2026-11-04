import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getActiveOrders, getOrderHistory } from "./api";

const ORDER_STALE_TIME = 1 * 60 * 1000;

export const orderQueryKeys = {
	active: ["orders", "active"] as const,
	history: ["orders", "history"] as const,
	activeForIdentity: (identity: string) =>
		[...orderQueryKeys.active, identity] as const,
	historyForIdentity: (identity: string) =>
		[...orderQueryKeys.history, identity] as const,
};

function useOrderIdentity() {
	const { data: session, status } = useSession();
	return {
		identity:
			session?.user?.id ??
			session?.user?.email ??
			(status === "loading" ? "loading" : "guest"),
		enabled: status !== "loading",
	};
}

export function useActiveOrders() {
	const { identity, enabled } = useOrderIdentity();

	return useQuery({
		queryKey: orderQueryKeys.activeForIdentity(identity),
		queryFn: getActiveOrders,
		staleTime: ORDER_STALE_TIME,
		enabled,
	});
}

export function useOrderHistory() {
	const { identity, enabled } = useOrderIdentity();

	return useQuery({
		queryKey: orderQueryKeys.historyForIdentity(identity),
		queryFn: getOrderHistory,
		staleTime: ORDER_STALE_TIME,
		enabled,
	});
}
