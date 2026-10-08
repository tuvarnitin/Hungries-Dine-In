import FoodCard from "@/components/home/FoodCard";
import { FoodType } from "@/types/food";

const FoodList = ({
	title,
	foods,
}: {
	title: string;
	foods: FoodType[];
}) => {
	return (
		<>
			<div className="flex justify-between pt-6 pb-3">
				<h1 className="text-xl font-bold pl-3">{title}</h1>
				<p className="text-xs text-gold">View All (23)</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{foods.map((food) => (
					<FoodCard
						key={food.id}
						food={food}
					/>
				))}
			</div>
		</>
	);
};

export default FoodList;
