import { AddOnsType } from "./cart";

export interface FoodType {
	id: string;
	img: string;
	tags: string[];
	name: string;
	rating: number;
	estTime: string;
	price: number;
	desc?:string;
	addons:AddOnsType[];
};

export interface FoodPropsType {
	id: string;
	img: string;
	tags: string[];
	name: string;
	rating: number;
	estTime: string;
	price: number;
	addons:AddOnsType[]
};
