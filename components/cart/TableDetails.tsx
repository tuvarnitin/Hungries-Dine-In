import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function TableDetails() {
    const tableNumber = useSelector((state:RootState)=>state.table.tableNumber)
    return (
			<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-3.5">
				<h3 className="text-sm font-bold">Table Details</h3>
				{tableNumber ? (
					<div className="space-y-2.5 text-xs">
						<div className="flex text-neutral-600 font-medium">
							<span>Table Number : #{tableNumber}</span>
						</div>
					</div>
				) : (
					<div className="flex flex-col text-muted-text items-center">
						<h1 className="text-sm">No table scaned</h1>
						<p className="text-[12px]">
							Scane a table before proceed to order &nbsp;
							<Link
								href={"/scanner"}
								className=" underline"
							>
								scan
							</Link>
						</p>
					</div>
				)}
			</div>
		);
}
