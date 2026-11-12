"use client";

import { Send } from "lucide-react";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { orderQueryKeys } from "@/store/features/order/query";
import { notifyError } from "@/lib/toast-notifications";
import { toast } from "react-toastify";

interface SendOrderButtonProps {
	totalDue: string;
	onClick?: () => void;
	loading?: boolean;
}

export default function SendOrderButton({
	totalDue,
	onClick,
	loading: externalLoading,
}: SendOrderButtonProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [isVerifying, setIsVerifying] = useState(false);
	const [verifiedTableId, setVerifiedTableId] = useState<string | null>(null);
	const [internalLoading, setInternalLoading] = useState(false);

	const tableId = useSelector((state: RootState) => state.table.id);
	const items = useSelector((state: RootState) => state.cart.items);

	const isValidTable = tableId !== null && verifiedTableId === tableId;
	const isLoading = externalLoading || internalLoading;
	const isCartEmpty = !items || items.length === 0;

	// Verify table whenever tableId changes
	useEffect(() => {
		let isMounted = true;

		if (!tableId) {
			return;
		}

		const verifyTable = async () => {
			setIsVerifying(true);
			try {
				await axios.get(`/api/table/${tableId}`);
				if (isMounted) {
					setVerifiedTableId(tableId);
				}
			} catch (error) {
				console.error("Error verifying table:", error);
				if (isMounted) {
					setVerifiedTableId(null);
					notifyError(error, "Unable to verify this table. Please try again.");
				}
			} finally {
				if (isMounted) {
					setIsVerifying(false);
				}
			}
		};

		verifyTable();

		return () => {
			isMounted = false;
		};
	}, [tableId]);

	const isDisabled = isCartEmpty || !tableId || !isValidTable || isVerifying || isLoading;

	const handleOrder = async () => {
		if (isDisabled || isLoading) return;

		setInternalLoading(true);

		try {
			const orderPayload = {
				tableId,
				items: items.map((item) => ({
					foodId: item.foodId,
					quantity: item.quantity,
				})),
			};

			await axios.post("/api/orders", orderPayload);

			dispatch(clearCart());
			await queryClient.invalidateQueries({
				queryKey: orderQueryKeys.active,
			});
			await queryClient.invalidateQueries({
				queryKey: orderQueryKeys.history,
			});
			toast.success("Order sent to the kitchen.");
			onClick?.();
			router.push("/orders");
		} catch (error: unknown) {
			console.error("Failed to place order:", error);
			notifyError(error, "Failed to place order. Please try again.");
		} finally {
			setInternalLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto space-y-2.5">
			<Button
				icon={<Send className="w-4 h-4" />}
				fullWidth
				size="lg"
				onClick={handleOrder}
				loading={isLoading}
				disabled={isDisabled}
			>
				{isLoading
					? "Sending Order..."
					: isVerifying
					? "Verifying Table..."
					: !tableId
					? "Scan a Table to Order"
					: !isValidTable
					? "Invalid Table • Rescan QR"
					: `Send Order to Kitchen • $${totalDue}`}
			</Button>
		</div>
	);
}
