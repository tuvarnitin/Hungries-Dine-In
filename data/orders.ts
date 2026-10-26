
import type { OrderHistory } from "@/types/order";

export const orderHistoryData = [
  {
    id: "ORD-8921",
    tableNumber:10,
    date: "Dec 17, 2023",
    restaurant: "Hungries Dine • Main Hall",
    total: "$159.00",
    rating: 5,
    items: [
      { name: "Truffle Smash Burger (x2)" },
      { name: "Artisanal Margherita" },
      { name: "Tiramisu" },
      { name: "House Red Wine" },
    ],
  },
  {
    id: "ORD-8742",
    tableNumber:10,
    date: "Dec 12, 2023",
    restaurant: "Hungries Bistro • Terrace",
    total: "$159.00",
    rating: 4,
    items: [
      { name: "Crispy Calamari" },
      { name: "Ribeye Steak" },
      { name: "Iced Caramel Macchiato" },
    ],
  },
  {
    id: "ORD-8510",
    tableNumber:10,
    date: "Dec 13, 2023",
    restaurant: "Hungries Dine • VIP Lounge",
    total: "$169.00",
    rating: 5,
    items: [
      { name: "Lobster Pasta" },
      { name: "Garlic Bread" },
      { name: "Espresso Martini" },
    ],
  },
  {
    id: "ORD-8209",
    tableNumber:10,
    date: "Nov 28, 2023",
    restaurant: "Hungries Bistro • Downtown",
    total: "$142.50",
    rating: 5,
    items: [
      { name: "Mushroom Risotto" },
      { name: "Caesar Salad" },
      { name: "Lemonade" },
    ],
  },
];
