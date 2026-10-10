"use client";

import { Send } from "lucide-react";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

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

	const [isVerifying, setIsVerifying] = useState(false);
	const [isValidTable, setIsValidTable] = useState(false);
	const [internalLoading, setInternalLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const tableId = useSelector((state: RootState) => state.table.id);
	const items = useSelector((state: RootState) => state.cart.items);

	const isLoading = externalLoading || internalLoading;
	const isCartEmpty = !items || items.length === 0;

	// Verify table whenever tableId changes
	useEffect(() => {
		let isMounted = true;

		if (!tableId) {
			setIsValidTable(false);
			return;
		}

		const verifyTable = async () => {
			setIsVerifying(true);
			try {
				const res = await fetch(`/api/table/${tableId}`);
				if (isMounted) {
					setIsValidTable(res.ok);
				}
			} catch (error) {
				console.error("Error verifying table:", error);
				if (isMounted) {
					setIsValidTable(false);
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
		setErrorMessage(null);

		try {
			const orderPayload = {
				tableId,
				items: items.map((item) => ({
					foodId: item.foodId,
					quantity: item.quantity,
				})),
			};

			const res = await axios.post("/api/orders", orderPayload);

			if (res.status === 200 || res.status === 201) {
				dispatch(clearCart());
				onClick?.();
				router.push("/orders");
			}
		} catch (error: any) {
			console.error("Failed to place order:", error);
			const msg =
				error.response?.data?.message ||
				error.response?.data?.msg ||
				"Failed to place order. Please try again.";
			setErrorMessage(msg);
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

			{errorMessage && (
				<p className="text-xs text-center text-red font-medium">
					{errorMessage}
				</p>
			)}
		</div>
	);
}
