import { Clock3, Heart, ShoppingCart, Star, Leaf } from "lucide-react";
import type { FoodType } from "@/types/food";
import Button from "@/components/Button"

interface FoodCardProps {
	food: FoodType;
	onAddToCart?: (food: FoodType) => void;
}

export default function FoodCard({ food, onAddToCart }: FoodCardProps) {
	const isVeg = food.tags.includes("veg") || food.tags.includes("Veg");

	const addToCart = () => {}

	return (
		<article className="group relative flex gap-4 w-full overflow-hidden rounded-[28px] bg-cream p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1) items-center relative rounded-tr-md">
			<div className="h-8 w-8 bg-white shadow-sm absolute top-0 right-0 flex items-center justify-center rounded-bl-xl">
				<Heart size={13} />
			</div>
			{/* Image */}
			<div className="relative h-[clamp(130px,18vw,180px)] w-[clamp(130px,18vw,180px)] shrink-0 overflow-hidden rounded-[22px]">
				<img
					src={food.img}
					alt={food.name}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{/* Veg badge */}
				{isVeg && (
					<div className="absolute left-3 top-3 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white shadow-sm flex gap-1 items-center">
						<Leaf size={10} />
						<span className="text-[clamp(12px,2vw,14px)]">Veg</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex min-w-0 flex-1 flex-col ">
				{/* Name */}
				<h3 className="font-(family-name:--font-playfair) text-[16px] font-bold leading-tight text-[#13231e] w-[90%]">
					{food.name}
				</h3>

				{/* Description */}
				<p className="mt-1.5 line-clamp-2 max-w-2xl text-[11px] leading-4 text-muted-text">
					Crispy tofu, fresh vegetables and delicious flavors combined with a
					crunchy coating.
				</p>

				{/* Rating + Time */}
				<div className="mt-1 flex items-center gap-5 text-sm text-[#68706b]">
					<div className="flex items-center gap-1.5">
						<Star
							size={18}
							fill="currentColor"
							className="text-gold"
						/>
						<span className="font-medium text-gold">{food.rating}</span>
					</div>

					<div className="h-5 w-px bg-gray-400" />

					<div className="flex items-center gap-1.5">
						<Clock3 size={17} />
						<span className="text-[12px] text-nowrap">{food.estTime} min</span>
					</div>
					{/* <div className="h-5 w-px bg-gray-400" /> */}
				</div>

				{/* Bottom */}
				<div
					className=" flex items-center justify-between
				 gap-[clamp(1px,3vw,10px)] pt-4"
				>
					<span className="font-(family-name:--font-playfair) text-2xl font-bold text-primary">
						${food.price}
					</span>
					<Button
						type="button"
						onClick={() => onAddToCart?.(food)}
						icon={<ShoppingCart size={14} />}
						size="sm"
					>
						Add to Cart
					</Button>
				</div>
			</div>
		</article>
	);
}
