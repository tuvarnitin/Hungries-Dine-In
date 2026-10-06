import { CakeSlice, Croissant, Hamburger, Pizza, Salad, Soup, Sparkles, Utensils, Wine } from "lucide-react";

export const FILTERS = [
	{ value: "All", Icon: Sparkles, text: "Featured" },
	{ value: "Burger", Icon: Hamburger, text: "Burgers" },
	{ value: "Pizza", Icon: Pizza, text: "Pizza" },
	{ value: "Bakery", Icon: Croissant, text: "Bakery" },
	{ value: "Drinks", Icon: Wine, text: "Drinks" },
	{ value: "Pasta", Icon: Utensils, text: "Pasta" },
	{ value: "Sushi", Icon: CakeSlice, text: "Sushi" },
	{ value: "Bowls", Icon: Soup, text: "Bowls" },
	{ value: "Salads", Icon: Salad, text: "Salads" },
	{ value: "Mexican", Icon: Salad, text: "Mexican" },
	{ value: "Indian", Icon: Utensils, text: "Indian" },
	{ value: "Ramen", Icon: Soup, text: "Ramen" },
	{ value: "Noodles", Icon: Soup, text: "Noodles" },
];
