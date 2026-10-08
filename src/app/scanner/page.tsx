"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import BackButton from "@/components/BackButton";

export default function ScannerPage() {
	const [pause, setPause] = useState(false);

	const handleScan = async (data: string) => {
		setPause(true);
		const token = data.split(",")[0];
		const table = data.split(",")[1];
		alert(token);
		setPause(false);
	};

	return (
		<div className="relative h-[70vh] flex items-center justify-center">
			<BackButton className="absolute inset-2" />
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
				constraints={{ facingMode: "environment" }}
				onScan={(detectedCodes) => {
					handleScan(detectedCodes[0].rawValue);
				}}
				onError={(error) => {
					console.log(`onError: ${error}'`);
				}}
				styles={{
					container: { borderRadius: 20 },
					video: { width: "250px", height: "250px", borderRadius: 20 },
				}}
				components={{
					torch: true,
					finder: false,
				}}
				allowMultiple={false}
				scanDelay={1000}
				paused={pause}
			/>
		</div>
	);
}
