import { OrderHistory } from "@/types/order";

export const orderHistoryData: OrderHistory[] = [
	{
		id: "ORD-8921",
		date: "Dec 17, 2023",
		restaurant: "Hungries Dine • Main Hall",
		total: "$159.00",
		rating: 5,
		items: [
			"Truffle Smash Burger (x2)",
			"Artisanal Margherita",
			"Tiramisu",
			"House Red Wine",
		],
	},
	{
		id: "ORD-8742",
		date: "Dec 12, 2023",
		restaurant: "Hungries Bistro • Terrace",
		total: "$159.00",
		rating: 4,
		items: ["Crispy Calamari", "Ribeye Steak", "Iced Caramel Macchiato"],
	},
	{
		id: "ORD-8510",
		date: "Dec 13, 2023",
		restaurant: "Hungries Dine • VIP Lounge",
		total: "$169.00",
		rating: 5,
		items: ["Lobster Pasta", "Garlic Bread", "Espresso Martini"],
	},
	{
		id: "ORD-8209",
		date: "Nov 28, 2023",
		restaurant: "Hungries Bistro • Downtown",
		total: "$142.50",
		rating: 5,
		items: ["Mushroom Risotto", "Caesar Salad", "Lemonade"],
	},
];
