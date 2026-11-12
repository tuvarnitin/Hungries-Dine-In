"use client";

import { useState } from "react";
import { OrderHistory, SelectedHistoryItems } from "@/types/order";
import { Tab } from "@/types/shared";

import CallWaiterModal from "@/components/order/CallWaiterModal";
import ReceiptModal from "@/components/order/ReceiptModal";
import OrderTabs from "@/components/order/OrderTab";
import ActiveOrders from "@/components/order/ActiveOrders";
import OrderHistoryList from "@/components/order/OrderHistoryList";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "@/store/features/cart/cartSlice";
import { toast } from "react-toastify";

export default function OrdersPage() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState<Tab>("active");

	const [activeReceipt, setActiveReceipt] = useState<OrderHistory | null>(null);
	const [selectedHistoryItems, setSelectedHistoryItems] =
		useState<SelectedHistoryItems>({});

	const [isCallWaiterOpen, setIsCallWaiterOpen] = useState(false);
	const [isReceiptOpen, setIsReceiptOpen] = useState(false);
	const [acitveOrdersCount, setActiveOrdersCount] = useState(0);
	const [orderHistoryCount, setOrderHistoryCount] = useState(0);
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
		dispatch(addItemsToCart(order.items));
		closeReceiptModal();
		toast.success("Items added to your cart.");
		router.push("/cart");
	};

	return (
		<div className="antialiased flex flex-col gap-4 items-center pb-36 relative select-none">
			<CallWaiterModal
				open={isCallWaiterOpen}
				onClose={() => setIsCallWaiterOpen(false)}
				tableNumber={"90"}
			/>

			<ReceiptModal
				open={isReceiptOpen}
				order={activeReceipt}
				onClose={closeReceiptModal}
				onReorder={handleReorder}
			/>

			<OrderTabs
				activeTab={activeTab}
				onChange={setActiveTab}
				acitveOrdersCount={acitveOrdersCount}
				orderHistoryCount={orderHistoryCount}
			/>

			<main className="w-full max-w-md space-y-4">
				{activeTab === "active" ? (
					<ActiveOrders
						onViewCart={() => router.push("/cart")}
						onCallWaiter={() => setIsCallWaiterOpen(true)}
						setAcitveOrdersCount={setActiveOrdersCount}
					/>
				) : (
					<OrderHistoryList
						selectedItems={selectedHistoryItems}
						onSelect={toggleHistorySelection}
						onViewReceipt={openReceiptModal}
						setOrderHistoryCount={setOrderHistoryCount}
					/>
				)}
			</main>
		</div>
	);
}
