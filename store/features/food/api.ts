import { FoodType } from "@/types/food";
import axios from "axios";

export type GetFoodParamsType = {
	page: number;
	category?: string;
	limit: number;
};

export type FoodResponse = {
    foods:FoodType[],
    hasMore:boolean,
    nextPage:number|null
}

export const getFoods = async ({
	page,
	limit,
	category,
}: GetFoodParamsType): Promise<FoodResponse> => {
	const res = await axios.get(`/api/foods`, {
		params: {
			page,
			limit,
			...(category ? { category } : {}),
		},
	});
    return res.data        
};
