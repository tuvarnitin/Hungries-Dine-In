"use client";

import { useState } from "react";
import { OrderHistory, SelectedHistoryItems } from "@/types/order";
import { Tab } from "@/types/shared";

import Toast from "@/components/Toast";
import CallWaiterModal from "@/components/order/CallWaiterModal";
import ReceiptModal from "@/components/order/ReceiptModal";
import OrdersHeader from "@/components/order/OrderHeader";
import OrderTabs from "@/components/order/OrderTab";
import ActiveOrders from "@/components/order/ActiveOrders";
import OrderHistoryList from "@/components/order/OrderHistoryList";
import { orderHistoryData } from "@/data/orders";
import { useRouter } from "next/navigation";
import { activeCartData } from "@/data/cart";

export default function OrdersPage() {
	const [activeTab, setActiveTab] = useState<Tab>("active");

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

	const router = useRouter();

	return (
		<div className="antialiased flex flex-col gap-4 items-center pb-36 relative select-none">
			<Toast message={toastMessage} />

			<CallWaiterModal
				open={isCallWaiterOpen}
				onClose={() => setIsCallWaiterOpen(false)}
				tableNumber={activeCartData.tableNumber}
			/>

			<ReceiptModal
				open={isReceiptOpen}
				order={activeReceipt}
				onClose={closeReceiptModal}
				onReorder={handleReorder}
			/>

			<OrdersHeader
				activeOrder={activeCartData}
				onBack={() => router.back()}
				onClear={() => showToast("Trash cleared successfully")}
			/>

			<OrderTabs
				activeTab={activeTab}
				onChange={setActiveTab}
			/>

			<main className="w-full max-w-md space-y-4">
				{activeTab === "active" ? (
					<ActiveOrders
						activeOrder={activeCartData}
						onViewCart={() => router.push("/cart")}
						onCallWaiter={() => setIsCallWaiterOpen(true)}
						onAddDishes={() => router.push("/")}
					/>
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
