import FoodCard from "@/components/home/FoodCard";
import { FoodType } from "@/types/food";
import axios from "axios";
import { useEffect, useState } from "react";

const FoodList = ({
	title,
}: {
	title: string;
}) => {
	const [loading, setLoading] = useState(false);
	const [foods, setFoods] = useState<FoodType[]>([]);
	const fetchFoods = async () => {
		try {
			setLoading(true)
			const res = await axios.get("/api/food");
			const foods = res.data.foods;
			setFoods(foods);
		} catch (error) {
			console.log(error);
		}finally{
			setLoading(false)
		}
	}

	useEffect(() => {

		fetchFoods();
	}, []);
	return (
		<>
			<div className="flex justify-between pt-6 pb-3">
				<h1 className="text-xl font-bold pl-3">{title}</h1>
				<p className="text-xs text-gold">View All (23)</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{foods.map((food) => (
					<FoodCard
						key={food._id}
						food={food}
					/>
				))}
			</div>
		</>
	);
};

export default FoodList;
