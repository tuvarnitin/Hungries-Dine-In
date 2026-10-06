import { ActiveCartData, CartItem } from "@/types/cart";

export const dummyCartItems: CartItem[] = [
	{
		id: "1",
		name: "Truffle Smash Burger",
		desc: "Medium rare • Brioche • Truffle aioli side • Crispy fries",
		price: 16.5,
		quantity: 1,
		img:
			"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
		addons: [
			{ id: "a1", name: "Extra Truffle Aioli", checked: false },
			{ id: "a2", name: "Extra Crispy Bacon", checked: false },
			{ id: "a3", name: "Cheddar Cheese Slice", checked: false },
		],
	},
	{
		id: "2",
		name: "Artisanal Margherita",
		desc: "Extra fresh basil • Gluten-free cauliflower crust",
		price: 16.2,
		quantity: 1,
		img:
			"https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=60",
		addons: [
			{ id: "m1", name: "Greens & Veggies", checked: false },
			{ id: "m2", name: "Mozzarella", checked: false },
			{ id: "m3", name: "Ricotta or Goat Cheese", checked: false },
		],
	},
	{
		id: "3",
		name: "Iced Caramel Macchiato",
		desc: "Barista Oat milk • Less sweet • 50% ice",
		price: 13.0,
		quantity: 1,
		img:
			"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60",
		addons: [
			{ id: "c1", name: "Extra Caramel Drizzle", checked: false },
			{ id: "c2", name: "Extra Shot of Espresso", checked: false },
		],
	},
];

export const activeCartData: ActiveCartData = {
	tableNumber: "Table #14",
	branch: "Hungries Dine",
	activeCount: 3,
	subtotal: 32.7,
	items: dummyCartItems,
};
