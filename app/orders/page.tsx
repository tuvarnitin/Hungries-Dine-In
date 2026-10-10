"use client";

import { useEffect, useState } from "react";
import { OrderHistory, SelectedHistoryItems } from "@/types/order";
import { Tab } from "@/types/shared";
import { ActiveOrderType } from "@/types/cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import Toast from "@/components/Toast";
import CallWaiterModal from "@/components/order/CallWaiterModal";
import ReceiptModal from "@/components/order/ReceiptModal";
import OrdersHeader from "@/components/order/OrderHeader";
import OrderTabs from "@/components/order/OrderTab";
import ActiveOrders from "@/components/order/ActiveOrders";
import OrderHistoryList from "@/components/order/OrderHistoryList";
import { orderHistoryData } from "@/data/orders";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
	const router = useRouter();
	const tableId = useSelector((state: RootState) => state.table.id);
	const currentTableNumber = useSelector(
		(state: RootState) => state.table.tableNumber,
	);

	const [activeTab, setActiveTab] = useState<Tab>("active");
	const [activeOrder, setActiveOrder] = useState<ActiveOrderType | null>(null);
	const [loading, setLoading] = useState(true);

	const [activeReceipt, setActiveReceipt] = useState<OrderHistory | null>(null);
	const [selectedHistoryItems, setSelectedHistoryItems] =
		useState<SelectedHistoryItems>({});

	const [isCallWaiterOpen, setIsCallWaiterOpen] = useState(false);
	const [isReceiptOpen, setIsReceiptOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	const showToast = (message: string) => {
		setToastMessage(message);
		setTimeout(() => {
			setToastMessage(null);
		}, 3000);
	};

	const toggleHistorySelection = (id: string) => {
		setSelectedHistoryItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const openReceiptModal = (order: OrderHistory) => {
		setActiveReceipt(order);
		setIsReceiptOpen(true);
	};

	const closeReceiptModal = () => {
		setIsReceiptOpen(false);
		setActiveReceipt(null);
	};

	const handleReorder = (order: OrderHistory) => {
		closeReceiptModal();
		showToast(`Re-ordering items from ${order.id}`);
	};

	// Fetch current order with status "preparing"
	useEffect(() => {
		let isMounted = true;

		const fetchCurrentOrder = async () => {
			setLoading(true);
			try {
				const queryParams = new URLSearchParams({ status: "preparing" });
				if (tableId) {
					queryParams.append("tableId", tableId);
				}

				const res = await fetch(`/api/orders?${queryParams.toString()}`);
				if (!res.ok) {
					throw new Error("Failed to fetch order");
				}

				const data = await res.json();
				const order = data.order || (data.orders && data.orders[0]) || null;

				if (isMounted) {
					if (order) {
						const activeCount = order.items.reduce(
							(sum: number, it: any) => sum + (it.quantity || 1),
							0,
						);

						const formattedOrder: ActiveOrderType = {
							tableNumber: order.tableNumber
								? `Table #${order.tableNumber}`
								: currentTableNumber
								? `Table #${currentTableNumber}`
								: "Table",
							branch: "Hungries Dine",
							activeCount,
							subtotal: order.subtotal || 0,
							items: order.items.map((it: any) => {
								const food =
									it.foodId && typeof it.foodId === "object"
										? it.foodId
										: null;
								return {
									id: it._id?.toString() || food?._id?.toString() || it.name,
									quantity: it.quantity,
									item: {
										_id: food?._id?.toString() || it.foodId?.toString() || "",
										name: food?.name || it.name,
										img: food?.img || "/placeholder.png",
										desc: food?.desc || "",
										price: it.price || 0,
										rating: food?.rating || 5,
										tags: food?.tags || [],
										estPreparationTime:
											food?.estPreparationTime || "15 mins",
									},
								};
							}),
						};
						setActiveOrder(formattedOrder);
					} else {
						setActiveOrder(null);
					}
				}
			} catch (error) {
				console.error("Error fetching current order:", error);
				if (isMounted) {
					setActiveOrder(null);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchCurrentOrder();

		return () => {
			isMounted = false;
		};
	}, [tableId, currentTableNumber]);

	const displayOrder: ActiveOrderType = activeOrder ?? {
		tableNumber: currentTableNumber
			? `Table #${currentTableNumber}`
			: "Table",
		branch: "Hungries Dine",
		activeCount: 0,
		subtotal: 0,
		items: [],
	};

	return (
		<div className="antialiased flex flex-col gap-4 items-center pb-36 relative select-none">
			<Toast message={toastMessage} />

			<CallWaiterModal
				open={isCallWaiterOpen}
				onClose={() => setIsCallWaiterOpen(false)}
				tableNumber={displayOrder.tableNumber}
			/>

			<ReceiptModal
				open={isReceiptOpen}
				order={activeReceipt}
				onClose={closeReceiptModal}
				onReorder={handleReorder}
			/>

			<OrdersHeader
				activeOrder={displayOrder}
				onBack={() => router.back()}
				onClear={() => showToast("Trash cleared successfully")}
			/>

			<OrderTabs
				activeTab={activeTab}
				onChange={setActiveTab}
			/>

			<main className="w-full max-w-md space-y-4">
				{activeTab === "active" ? (
					loading ? (
						<div className="flex flex-col items-center justify-center py-20 space-y-3">
							<Loader2 className="w-8 h-8 text-primary animate-spin" />
							<p className="text-xs text-muted-text">
								Fetching current order...
							</p>
						</div>
					) : (
						<ActiveOrders
							activeOrder={displayOrder}
							onViewCart={() => router.push("/cart")}
							onCallWaiter={() => setIsCallWaiterOpen(true)}
							onAddDishes={() => router.push("/")}
						/>
					)
				) : (
					<OrderHistoryList
						orders={orderHistoryData}
						selectedItems={selectedHistoryItems}
						onSelect={toggleHistorySelection}
						onViewReceipt={openReceiptModal}
					/>
				)}
			</main>
			{/* <OrderActions
				onReorder={() =>
					showToast("Selected historical items added back to active cart!")
				}
				onGoToActive={() => {
					setActiveTab("active");
					showToast("Switched to Active Table Session");
				}}
			/> */}
		</div>
	);
}
