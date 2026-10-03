import Image from "next/image";

import TableIcon from "@/assets/icons/table.svg";
import BellIcon from "@/assets/icons/bell.svg";
import SearchIcon from "@/assets/icons/search.svg";
import MicIcon from "@/assets/icons/mic.svg";
import Sparkle from "@/assets/icons/sparkle.svg";
import Burger from "@/assets/icons/burger.svg";

import Banner from "@/assets/images/banner.png";
import ItemCard from "./components/ItemCard";
import Link from "next/link";

import HomeIcon from "@/assets/icons/house.svg"
import Orders from "@/assets/icons/orders.svg"
import Scanner from "@/assets/icons/scan.svg"
import Cart from "@/assets/icons/cart.svg"
import User from "@/assets/icons/user.svg"

export default function Home() {
	console.log(TableIcon);
	return (
		<div className="flex-1 p-4 flex flex-col gap-4">
			<nav className="flex justify-between items-center py-2 px-2 pr-3 bg-white rounded-full">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
						<img
							src={TableIcon.src}
							alt="table"
						/>
					</div>
					<div className="flex flex-col justify-center">
						<h1 className="text-md text-primary leading-6 font-semibold font-sans">
							Table #14 ●
						</h1>
						<p className="text-xs text-muted-text leading-3">
							Hungries ● Dine-in
						</p>
					</div>
				</div>
				<div className="bg-background py-1 px-3 rounded-full flex items-center gap-2">
					<img
						src={BellIcon.src}
						alt="bell"
					/>
					<h1 className="text-sm">Call Chef</h1>
				</div>
			</nav>

			<div className=" bg-white py-3 px-4 rounded-full flex justify-between items-center gap-4">
				<div className="flex items-center gap-2 flex-1">
					<img
						src={SearchIcon.src}
						alt="search"
						className="w-5 h-5"
					/>
					<input
						type="text"
						name="search"
						className="outline-none flex-1 text-muted-text"
						placeholder="Search dishes, drinks, or ingredients..."
					/>
				</div>
				<img
					src={MicIcon.src}
					alt="mic"
					className="w-5 h-5"
				/>
			</div>
			<div className="relative w-full rounded-3xl h-44 overflow-hidden flex flex-col gap-3 p-4 text-white">
				<img
					src={Banner.src}
					alt="banner"
					className="w-full h-full object-cover absolute inset-0 -z-10"
				/>
				<div className="flex justify-between">
					<div className="bg-gold px-3 rounded-full">
						<h1 className=" text-[10px] font-semibold leading-6">
							CHEF's TABLE SPECIAL
						</h1>
					</div>
					<h1 className="bg-primary px-3 py-0.5 text-[10px] leading-5 rounded-full tracking-wide">
						Active Now
					</h1>
				</div>
				<h1 className="text-3xl w-[60%] leading-7 text-gold font-sans">
					20% off table orders today
				</h1>
				<p className="text-xs w-[60%] text-white/50 font-bold">
					Try our signature summer harvest specials and pair with the perfect
					drink.
				</p>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex gap-2 items-center bg-primary py-1.5 px-3 rounded-full">
					<img
						src={Sparkle.src}
						alt="SparkleIcon"
						className="w-4 h-4 "
					/>
					<p className="text-white text-md">Featured</p>
				</div>
				<div className="flex gap-2 items-center bg-white py-1.5 px-3 rounded-full border border-dark-text/40">
					<img
						src={Burger.src}
						alt="SparkleIcon"
						className="w-4 h-4 "
					/>
					<p className="text-dark-text text-md">Featured</p>
				</div>
			</div>

			<div>
				<div className="flex justify-between pb-4">
					<h1 className="text-xl font-bold">Popular at Hungries Dine</h1>
					<p className="text-xs text-gold">View All (23)</p>
				</div>
				<div className=" flex flex-col gap-4 pb-30">
					<ItemCard />
					<ItemCard />
					<ItemCard />
					<ItemCard />
					<ItemCard />
				</div>
			</div>
			<div className="fixed bottom-0 left-0 py-5 pt-6 w-full bg-white flex justify-evenly items-baseline">
				<Link
					href={"/"}
					className="flex flex-col items-center gap-1"
				>
					<img
						src={HomeIcon.src}
						alt="homeIcon"
						className="w-7 h-7"
					/>
					<p className="text-xs">Home</p>
				</Link>
				<Link
					href={"/"}
					className="flex flex-col items-center gap-1"
				>
					<img
						src={Orders.src}
						alt="homeIcon"
						className="w-7 h-7"
					/>
					<p className="text-xs">Order</p>
				</Link>
				<Link
					href={"/"}
					className="relative flex flex-col items-center gap-1 "
				>
					<div className="">
						<div className="bg-primary absolute -top-18 -left-1/2 w-16 h-16 flex items-center justify-center rounded-full">
							<img
								src={Scanner.src}
								alt="homeIcon"
								className="w-7 h-7"
							/>
						</div>
					</div>
					<p className="text-xs">Scan</p>
				</Link>
				<Link
					href={"/"}
					className="flex flex-col items-center gap-1"
				>
					<img
						src={Cart.src}
						alt="homeIcon"
						className="w-7 h-7"
					/>
					<p className="text-xs">Cart</p>
				</Link>
				<Link
					href={"/"}
					className="flex flex-col items-center gap-1"
				>
					<img
						src={User.src}
						alt="homeIcon"
						className="w-7 h-7"
					/>
					<p className="text-xs">Profile</p>
				</Link>
			</div>
		</div>
	);
}
