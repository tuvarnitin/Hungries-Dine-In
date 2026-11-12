"use client";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import BackButton from "@/components/BackButton";
import { useDispatch } from "react-redux";
import { addTable } from "@/store/features/table/tableSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { notifyError } from "@/lib/toast-notifications";
import { toast } from "react-toastify";

export default function ScannerPage() {
	const [pause, setPause] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleScan = async (data: string) => {
		setPause(true);
		const tableId = data.split("table/")[1]?.split(/[?#]/)[0];
		if (!tableId) {
			notifyError(new Error("QR code does not contain a table ID."), "Invalid table QR code.");
			setPause(false);
			return;
		}

		try {
			const { data: response } = await axios.get(`/api/table/${tableId}`);
			dispatch(
				addTable({
					tableNumber: response.table.tableNumber,
					saveAt: Date.now(),
					id: response.table.id,
				}),
			);
			toast.success(`Table ${response.table.tableNumber} selected.`);
			router.replace("/");
		} catch (error: unknown) {
			notifyError(error, "Unable to load the table from this QR code.");
		} finally {
			setPause(false);
		}
	};

	return (
		<div className="relative h-[70vh] flex items-center justify-center">
			<BackButton className="absolute inset-2 z-10" />
			<Scanner
				formats={[
					"qr_code",
					"micro_qr_code",
					"rm_qr_code",
					"maxi_code",
					"pdf417",
					"aztec",
					"data_matrix",
					"matrix_codes",
					"dx_film_edge",
					"databar",
					"databar_expanded",
					"codabar",
					"code_39",
					"code_93",
					"code_128",
					"ean_8",
					"ean_13",
					"itf",
					"linear_codes",
					"upc_a",
					"upc_e",
				]}
				constraints={{ facingMode: "environment"}}
				onScan={(detectedCodes) => {
					handleScan(detectedCodes[0].rawValue);
				}}
				onError={(error) => notifyError(error, "Unable to access the camera.")}
				styles={{
					container: { borderRadius: 20 },
					video: { width: "250px", height: "250px", borderRadius: 20 },
				}}
				components={{
					torch: true,
					finder: false
				}}
				sound={false}
				allowMultiple={false}
				scanDelay={1000}
				paused={pause}
			/>
		</div>
	);
}
