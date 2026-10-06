
const HomeBanner = () => {
	return (
		<div className="relative w-full rounded-3xl h-44 overflow-hidden flex flex-col gap-3 px-4 py-3 text-white">
			<img
				src={"https://ik.imagekit.io/nitintuvar/table/banner.png"}
				alt="banner"
				className="w-full h-full object-cover absolute inset-0 -z-10"
			/>
			<div className="flex justify-between items-center">
				<div className="bg-gold px-3 py-1 rounded-full flex items-center">
					<p className=" text-[8px] font-semibold">CHEF's TABLE SPECIAL</p>
				</div>
				<h1 className="bg-primary px-3 py-0.5 text-[10px] leading-5 rounded-full tracking-wide">
					Active Now
				</h1>
			</div>
			<h1 className="text-3xl w-[50%] leading-7 tracking-wide text-gold font-serif">
				20% off table orders today.
			</h1>
			<p className="text-xs w-[60%] text-white/50">
				Try our signature summer harvest specials and pair with the perfect
				drink.
			</p>
		</div>
	);
};

export default HomeBanner;
