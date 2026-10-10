import {
	Clock3,
	Heart,
	ShoppingCart,
	Star,
	Leaf,
	Minus,
	Plus,
} from "lucide-react";
import type { FoodType } from "@/types/food";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/store/features/cart/cartSlice";
import { RootState } from "@/store/store";
import { useState } from "react";

interface FoodCardProps {
	food: FoodType;
	onAddToCart?: (food: FoodType) => void;
}

export default function FoodCard({ food }: FoodCardProps) {
	const isVeg = food.tags.includes("veg") || food.tags.includes("Veg");

	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart.items);
	const cartItem = cart?.find((item) => item.foodId === food._id);

	const [isFav,setIsFav] = useState(false)

	const toggelIsFav = () => {
		setIsFav(prev => !prev)
	}

	return (
		<article className="group relative flex gap-4 w-full rounded-[28px] bg-cream p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1) items-center relative ">
			<div
				onClick={toggelIsFav}
				className="h-8 w-8 bg-white shadow-sm absolute -top-1 -right-1 flex items-center justify-center rounded-full"
			>
				{isFav ? (
					<Heart
						size={17}
						color="#7F1100"
						fill="#7F1100"
					/>
				) : (
					<Heart size={17} />
				)}
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
					{food.desc}
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
						<span className="text-[12px] text-nowrap">{food.estPreparationTime} min</span>
					</div>
				</div>

				{/* Bottom */}
				<div
					className=" flex items-center justify-between
				 gap-[clamp(1px,3vw,10px)] pt-4"
				>
					<span className="font-(family-name:--font-playfair) text-2xl font-bold text-primary">
						${food.price}
					</span>
					{cartItem && cartItem.quantity > 0 ? (
						<div className="flex items-center space-x-3 bg-white border border-muted-text/10 rounded-full px-1.5 py-0.5 shadow-xs">
							<button
								type="button"
								onClick={() =>
									dispatch(updateQuantity({ foodId: food._id, value: -1 }))
								}
								className="text-neutral-600 hover:text-neutral-900 transition-colors p-0.5"
								aria-label="Decrease quantity"
							>
								<Minus
									size={17}
									strokeWidth={3.5}
								/>
							</button>

							<span className="text-lg font-(family-name:--font-playfair) font-bold leading-1 w-3 text-center mb-1.5">
								{cartItem.quantity}
							</span>

							<Button
								onClick={() =>
									dispatch(updateQuantity({ foodId: food._id, value: 1 }))
								}
								size="xs"
								aria-label="Increase quantity"
							>
								<Plus size={16} />
							</Button>
						</div>
					) : (
						<div className="bg-primary px-3 py-1.5 rounded-full">
							<button
								onClick={() =>
									dispatch(
										addToCart({
											foodId: food._id,
											img: food.img,
											tags: food.tags,
											name: food.name,
											price: food.price,
											quantity: 1,
											desc: food.desc,
										}),
									)
								}
								className="rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-white disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
							>
								<ShoppingCart size={14} />
								<span className="text-xs font-normal">Add to Cart</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</article>
	);
}
