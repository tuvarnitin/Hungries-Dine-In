"use client";

import React, { useState } from "react";
import {
	ArrowLeft,
	Trash2,
	X,
	Plus,
	Minus,
	ChevronUp,
	ChevronDown,
	Info,
	Star,
	Send,
	Split,
	Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AddonOption {
	id: string;
	name: string;
	price?: number;
	checked: boolean;
}

interface CartItem {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: string;
	addonsOpen?: boolean;
	addons?: AddonOption[];
}

export default function TableCartScreen() {
	const [activeTab, setActiveTab] = useState<"my" | "table">("my");
  const router = useRouter()

	const [items, setItems] = useState<CartItem[]>([
		{
			id: "1",
			name: "Truffle Smash Burger",
			description: "Medium rare • Brioche • Truffle aioli side • Crispy fries",
			price: 16.5,
			quantity: 1,
			image:
				"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
			addonsOpen: false,
			addons: [
				{ id: "a1", name: "Extra Truffle Aioli", checked: false },
				{ id: "a2", name: "Extra Crispy Bacon", checked: false },
				{ id: "a3", name: "Cheddar Cheese Slice", checked: false },
			],
		},
		{
			id: "2",
			name: "Artisanal Margherita",
			description: "Extra fresh basil • Gluten-free cauliflower crust",
			price: 16.2,
			quantity: 1,
			image:
				"https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=60",
			addonsOpen: true, // Expanded by default to match reference
			addons: [
				{ id: "m1", name: "Greens & Veggies", checked: false },
				{ id: "m2", name: "Mozzarella", checked: false },
				{ id: "m3", name: "Ricotta or Goat Cheese", checked: false },
			],
		},
		{
			id: "3",
			name: "Iced Caramel Macchiato",
			description: "Barista Oat milk • Less sweet • 50% ice",
			price: 13.0,
			quantity: 1,
			image:
				"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60",
			addonsOpen: false,
			addons: [
				{ id: "c1", name: "Extra Caramel Drizzle", checked: false },
				{ id: "c2", name: "Extra Shot of Espresso", checked: false },
			],
		},
	]);

	const updateQuantity = (id: string, delta: number) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id === id) {
					const newQty = Math.max(1, item.quantity + delta);
					return { ...item, quantity: newQty };
				}
				return item;
			}),
		);
	};

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const toggleAddons = (id: string) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id === id) {
					return { ...item, addonsOpen: !item.addonsOpen };
				}
				return item;
			}),
		);
	};

	const toggleAddonCheckbox = (itemId: string, addonId: string) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id === itemId && item.addons) {
					const updatedAddons = item.addons.map((addon) =>
						addon.id === addonId
							? { ...addon, checked: !addon.checked }
							: addon,
					);
					return { ...item, addons: updatedAddons };
				}
				return item;
			}),
		);
	};

	// Calculations
	const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
	const subtotal = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const serviceFee = subtotal * 0.03;
	const estimatedTax = subtotal * 0.0825;
	const totalDue = subtotal + serviceFee + estimatedTax;
	const pointsEarned = Math.round(totalDue * 5);

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pb-28">
			<div className="w-full max-w-md mx-auto sm:p-5 space-y-4">
				{/* Top Header */}
				<div
					onClick={() => router.push("/")}
					className="flex items-center justify-between pt-2 pb-1"
				>
					<button className="w-10 h-10 rounded-full bg-white border border-muted-text/20 flex items-center justify-center text-black shadow-2xs hover:bg-cream transition-colors">
						<ArrowLeft className="w-5 h-5" />
					</button>

					<div className="text-center">
						<h1 className="text-base font-bold">My Table Cart</h1>
						<div className="flex items-center justify-center space-x-1.5 text-xs text-muted-text font-medium mt-0.5">
							<span>Table #14</span>
							<span>•</span>
							<span>Hungries Dine</span>
							<span>•</span>
							<span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-primary">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1 animate-pulse" />
								3 Active
							</span>
						</div>
					</div>

					<button className="w-10 h-10 rounded-full bg-white border border-muted-text/20 flex items-center justify-center text-black shadow-2xs hover:bg-neutral-50 transition-colors">
						<Trash2 className="w-4 h-4" />
					</button>
				</div>

				{/* Cart Items List */}
				<div className="space-y-3.5">
					{items.map((item) => (
						<div
							key={item.id}
							className="bg-cream rounded-3xl p-4 shadow-sm relative space-y-2.5"
						>
							{/* Remove item cross button */}
							<button
								onClick={() => removeItem(item.id)}
								className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 transition-colors"
								aria-label="Remove item"
							>
								<X className="w-4 h-4" />
							</button>

							{/* Item Info Header */}
							<div className="flex space-x-3 items-start pr-6">
								<img
									src={item.image}
									alt={item.name}
									className="w-20 h-20 rounded-2xl object-cover shrink-0"
								/>
								<div className="space-y-1 flex-1">
									<h3 className="font-(family-name:--font-playfair) text-[16px] font-bold leading-tight w-[90%]">
										{item.name}
									</h3>

									{/* Description */}
									<p className="mt-1.5 line-clamp-2 max-w-2xl text-[11px] leading-4 text-muted-text">
										Crispy tofu, fresh vegetables and delicious flavors combined
										with a crunchy coating.
									</p>
									<p className="text-base font-bold text-neutral-900 pt-0.5">
										<span className="font-(family-name:--font-playfair) text-2xl font-bold text-primary">
											${item.price}
										</span>
									</p>
								</div>
							</div>

							{/* Quantity Controls Row */}
							<div className="flex items-center justify-between">
								<span className="text-xs font-medium text-muted-text">
									Quantity
								</span>
								<div className="flex items-center space-x-3 bg-white border border-muted-text/10 rounded-full px-1.5 py-1 shadow-xs">
									<button
										onClick={() => updateQuantity(item.id, -1)}
										className="text-neutral-600 hover:text-neutral-900 transition-colors p-0.5"
									>
										<Minus
											className="w-3.5 h-3.5"
											strokeWidth={3.5}
										/>
									</button>
									<span className="text-lg font-(family-name:--font-playfair) font-bold leading-1 w-3 text-center mb-1.5">
										{item.quantity}
									</span>
									<button
										onClick={() => updateQuantity(item.id, 1)}
										className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-xs"
									>
										<Plus className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>

							{/* Ad Ons Accordion Container */}
							<div className="border border-gold/20 rounded-2xl overflow-hidden transition-all">
								<button
									onClick={() => toggleAddons(item.id)}
									className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100/50 transition-colors"
								>
									<span>Ad Ons</span>
									{item.addonsOpen ? (
										<ChevronUp className="w-4 h-4 text-primary" />
									) : (
										<ChevronDown className="w-4 h-4 text-primary" />
									)}
								</button>

								{item.addonsOpen && item.addons && (
									<div className="px-3 pb-3 space-y-2">
										{item.addons.map((addon) => (
											<div
												key={addon.id}
												onClick={() => toggleAddonCheckbox(item.id, addon.id)}
												className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-md border border-neutral-200/60 cursor-pointer hover:border-neutral-300 transition-colors shadow-2xs"
											>
												<span className="text-xs font-medium text-neutral-800">
													{addon.name}
												</span>
												<div
													className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
														addon.checked
															? "bg-[#0A3622] border-[#0A3622] text-white"
															: "border-neutral-300 bg-white"
													}`}
												>
													{addon.checked && (
														<span className="text-[10px] font-bold">✓</span>
													)}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Add More Dishes Button */}
				<button className="w-full py-3.5 rounded-full border border-dashed border-red/30 hover:border-red/80 bg-white/60 hover:bg-white text-xs font-bold text-red flex items-center justify-center space-x-2 transition-all shadow-2xs">
					<Plus className="w-4 h-4" />
					<span>Add more dishes or beverages</span>
				</button>

				{/* Order Pricing Summary Card */}
				<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-3.5">
					<h3 className="text-sm font-bold">Order Pricing</h3>

					<div className="space-y-2.5 text-xs">
						<div className="flex justify-between text-neutral-600 font-medium">
							<span>Subtotal ({totalItemsCount} items)</span>
							<span className="text-black font-semibold">
								${subtotal.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-between items-center text-neutral-600 font-medium">
							<span className="flex items-center space-x-1">
								<span>Dine-in Service & Tech (3%)</span>
								<Info className="w-3.5 h-3.5 text-neutral-400" />
							</span>
							<span className="text-black font-semibold">
								${serviceFee.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-between text-neutral-600 font-medium">
							<span>Estimated Tax (8.25%)</span>
							<span className="text-black font-semibold">
								${estimatedTax.toFixed(2)}
							</span>
						</div>
					</div>

					<div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
						<span className="text-sm font-bold text-black">Total Due</span>
						<span className="text-xl font-extrabold text-red font-(family-name:--font-playfair)">
							${totalDue.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Sticky Bottom Checkout Actions */}
			<div className="fixed bottom-0 left-0 right-0 bg-cream backdrop-blur-md border-t border-neutral-200/60 p-4 shadow-lg z-50">
				<div className="w-full max-w-md mx-auto space-y-2.5">
					<button className="w-full py-4 rounded-full bg-primary hover:bg-[#072819] text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition-colors">
						<Send className="w-4 h-4" />
						<span>Send Order to Kitchen • ${totalDue.toFixed(2)}</span>
					</button>

					<div className="flex items-center justify-between px-2 text-xs font-semibold text-red pt-0.5">
						<button className="flex items-center space-x-1.5 hover:underline">
							<Split className="w-3.5 h-3.5" />
							<span>Split & Pay Later</span>
						</button>
						<span className="text-neutral-300">•</span>
						<button className="flex items-center space-x-1.5 hover:underline">
							<Clock className="w-3.5 h-3.5" />
							<span>Pay when seated or leaving</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
