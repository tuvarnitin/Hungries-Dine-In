"use client";

import { useState } from "react";
import { X, Plus, Minus, Info, Send } from "lucide-react";
import BackButton from "@/components/BackButton";
import TrashButton from "@/components/TrashButton";
import Button from "@/components/Button";
import EmptyCart from "@/components/cart/EmptyCard";
import { dummyCartItems } from "@/data/cart";
import { CartItem } from "@/types/cart";

export default function TableCartScreen() {
	const [items, setItems] = useState<CartItem[]>(dummyCartItems);

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

	// Calculations
	const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
	const subtotal = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const serviceFee = subtotal * 0.03;
	const estimatedTax = subtotal * 0.0825;
	const totalDue = subtotal + serviceFee + estimatedTax;

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pb-28">
			<div className="w-full max-w-md mx-auto sm:p-5 space-y-4">
				{items?.length > 0 ? (
					<>
						<div className="flex items-center justify-between pt-2 pb-1">
							<BackButton />
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
							<TrashButton onClear={() => {}} />
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
											src={item.img}
											alt={item.name}
											className="w-20 h-20 rounded-2xl object-cover shrink-0"
										/>
										<div className="space-y-1 flex-1">
											<h3 className="font-(family-name:--font-playfair) text-[16px] font-bold leading-tight w-[90%]">
												{item.name}
											</h3>

											{/* Description */}
											<p className="mt-1.5 line-clamp-2 max-w-2xl text-[11px] leading-4 text-muted-text">
												Crispy tofu, fresh vegetables and delicious flavors
												combined with a crunchy coating.
											</p>
											<p className="text-base font-bold text-neutral-900 pt-0.5">
												<span className="font-(family-name:--font-playfair) text-2xl font-bold text-primary">
													${item.price}
												</span>
											</p>
										</div>
									</div>

									{/* Quantity Controls Row */}
									<div className="flex items-end justify-between">
										<span className="text-xs font-medium text-muted-text">
											Quantity
										</span>
										<div className="flex items-center space-x-3 bg-white border border-muted-text/10 rounded-full px-1.5 py-1 shadow-xs">
											<button
												onClick={() => updateQuantity(item.id, -1)}
												className="text-neutral-600 hover:text-neutral-900 transition-colors p-0.5"
											>
												<Minus
													size={17}
													strokeWidth={3.5}
												/>
											</button>
											<span className="text-lg font-(family-name:--font-playfair) font-bold leading-1 w-3 text-center mb-1.5">
												{item.quantity}
											</span>
											<Button
												onClick={() => updateQuantity(item.id, 1)}
												size="xs"
												className="rounded-full"
											>
												<Plus size={16} />
											</Button>
										</div>
									</div>

									{/* Ad Ons Accordion Container */}
									{/* Ad Ons Will be Implemented Later */}
								</div>
							))}
						</div>

						{/* Add More Dishes Button */}
						<Button
							icon={<Plus size={16} />}
							variant="outline"
							className="border-dashed border-red/30 hover:border-red/80 bg-white/60 hover:bg-white text-red text-xs transition-colors"
							fullWidth
							size="lg"
						>
							Add more dishes or beverages
						</Button>

						{/* Order Pricing Summary Card */}
						<div className="bg-white rounded-3xl p-5 shadow-xs border border-neutral-100 space-y-3.5">
							<h3 className="text-sm font-bold">Order Pricing</h3>

							<div className="space-y-2.5 text-xs">
								<div className="flex justify-between text-neutral-600 font-medium">
									<span>Subtotal ({totalItemsCount} items)</span>
									<span className="text-dark-text font-semibold">
										${subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between items-center text-neutral-600 font-medium">
									<span className="flex items-center space-x-1">
										<span>Dine-in Service & Tech (3%)</span>
										<Info className="w-3.5 h-3.5 text-neutral-400" />
									</span>
									<span className="text-dark-text font-semibold">
										${serviceFee.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-neutral-600 font-medium">
									<span>Estimated Tax (8.25%)</span>
									<span className="text-dark-text font-semibold">
										${estimatedTax.toFixed(2)}
									</span>
								</div>
							</div>

							<div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
								<span className="text-sm font-bold text-dark-text">Total Due</span>
								<span className="text-xl font-extrabold text-red font-(family-name:--font-playfair)">
									${totalDue.toFixed(2)}
								</span>
							</div>
						</div>
						<div className="w-full max-w-md mx-auto space-y-2.5">
							<Button
								icon={<Send className="w-4 h-4" />}
								fullWidth
								size="lg"
							>
								Send Order to Kitchen • ${totalDue.toFixed(2)}
							</Button>
						</div>
					</>
				) : (
					<EmptyCart />
				)}
			</div>
		</div>
	);
}

// const toggleAddons = (id: string) => {
// 	setItems((prev) =>
// 		prev.map((item) => {
// 			if (item.id === id) {
// 				return { ...item, addonsOpen: !item.addonsOpen };
// 			}
// 			return item;
// 		}),
// 	);
// };

// const toggleAddonCheckbox = (itemId: string, addonId: string) => {
// 	setItems((prev) =>
// 		prev.map((item) => {
// 			if (item.id === itemId && item.addons) {
// 				const updatedAddons = item.addons.map((addon) =>
// 					addon.id === addonId ? { ...addon, checked: !addon.checked } : addon,
// 				);
// 				return { ...item, addons: updatedAddons };
// 			}
// 			return item;
// 		}),
// 	);
// };



		{
			/* <div className="border border-gold/20 rounded-2xl overflow-hidden transition-all">
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
							</div> */
		}