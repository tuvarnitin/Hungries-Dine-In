import React from 'react'
import Star from "@/assets/icons/star.svg";
import Timer from "@/assets/icons/timer.svg";
import GrilledChicken from "@/assets/images/grilled_chicken.jpg";

const ItemCard = () => {
  return (
		<div className="bg-white py-4 px-4 rounded-2xl flex gap-2 items-center">
			<div className="w-30 h-30 rounded-2xl overflow-hidden">
				<img
					src={GrilledChicken.src}
					alt="grilledChicken"
					className="w-full h-full"
				/>
			</div>
			<div className="grow flex flex-col gap-3">
				<div className="flex gap-2">
					<p className="bg-gold/20 pt-1 px-2 text-[12px] text-gold rounded-full">
						Chef's Special
					</p>
					<p className="bg-primary/20 pt-0.5 px-2 text-[12px] text-primary rounded-full ">
						Meat
					</p>
				</div>
				<div className="flex flex-col gap-1">
					<h1 className="text-lg font-semibold">Truffle Smash Burger</h1>
					<div className=" flex items-center gap-3">
						<div className="flex gap-1 items-center text-gold ">
							<img
								src={Star.src}
								alt="starIcon"
								className="w-4 h-4"
							/>
							<p className="text-[15px] mt-1">4.9</p>
						</div>
						<div className="flex gap-1 items-center text-muted-text">
							<img
								src={Timer.src}
								alt="timerIcon"
								className="w-4 h-4"
							/>
							<p className="text-[15px] mt-0.5">15 - 20 min</p>
						</div>
					</div>
					<div className="flex w-full justify-between pt-2">
						<h1 className="text-2xl font-bold font-mono">$12.23</h1>
						<button className="bg-primary text-white py-1 px-3 rounded-full">
							+ Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ItemCard