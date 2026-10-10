"use client";
import { RootState } from "@/store/store";
import { ConciergeBell, QrCode, Utensils } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
	const handleCallChef = () => {};
	const table = useSelector((state: RootState) => state.table);
	const router = useRouter()

	return (
		<nav className="flex justify-between items-center py-2 px-2 pr-5 bg-white rounded-full">
			<div className="flex items-center gap-2">
				<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
					<Utensils
						size={16}
						className="text-white"
					/>
				</div>
				<div className="flex flex-col justify-center">
					{table.tableNumber ? (
						<>
							<h1 className="text-md text-primary leading-6 font-semibold font-sans">
								Table #{table.tableNumber} ●
							</h1>
							<p className="text-xs text-muted-text leading-3">
								Hungries ● Dine-in
							</p>
						</>
					) : (
						<div>
							<p className="text-[10px] text-primary">YOUR TABLE</p>
							<h1 className="text-sm font-medium text-muted-text">No table scaned</h1>
						</div>
					)}
				</div>
			</div>
			{table.tableNumber ? (
				<button
					onClick={handleCallChef}
					className="bg-background py-1.5 px-3 rounded-full flex items-center gap-2 cursor-pointer"
				>
					<ConciergeBell size={16} />
					<h1 className="text-sm">Call Chef</h1>
				</button>
			) : (
				<button onClick={()=> router.push("/scanner")}>
					<QrCode className="animate-pulse" />
				</button>
			)}
		</nav>
	);
};

export default Navbar;
