'use client'
import { ConciergeBell, Utensils } from "lucide-react";

const Navbar = () => {
	const handleCallChef = () => {};
	const table = "#14"

	return (
		<nav className="flex justify-between items-center py-2 px-2 pr-3 bg-white rounded-full">
			<div className="flex items-center gap-2">
				<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
					<Utensils size={16} className="text-white" />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="text-md text-primary leading-6 font-semibold font-sans">
						Table {table} ●
					</h1>
					<p className="text-xs text-muted-text leading-3">
						Hungries ● Dine-in
					</p>
				</div>
			</div>
			<button
				onClick={handleCallChef}
				className="bg-background py-1.5 px-3 rounded-full flex items-center gap-2 cursor-pointer"
			>
				<ConciergeBell size={16}/>
				<h1 className="text-sm">Call Chef</h1>
			</button>
		</nav>
	);
};

export default Navbar;
