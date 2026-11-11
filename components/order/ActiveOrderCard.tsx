import Image from "next/image";
import { ActiveOrderType } from "./ActiveOrders";
import { Check, IndianRupee, X } from "lucide-react";
import type { OrderStatus } from "@/models/orderModel";

const ORDER_STEPS = ["Processing", "Preparing", "Ready", "Delivered"] as const;

const STATUS_STEP: Partial<Record<OrderStatus, number>> = {
	pending: 0,
	accepted: 0,
	preparing: 1,
	ready: 2,
	delivered: 3,
};

type Props = {
	activeOrder: ActiveOrderType;
	subtotal: number;
};

const StatusColor: Record<string, string> = {
	pending: "text-green-600  border-green-600 bg-green-600/10",
	preparing: "text-yellow-400 border-yellow-400 bg-yellow-100/10",
};

export default function ActiveOrderCard({ activeOrder, subtotal }: Props) {
	const currentStep = STATUS_STEP[activeOrder.status];
	const isTerminal = activeOrder.status === "cancelled" || activeOrder.status === "rejected";

	return (
		<div className="">
			<div className="bg-white rounded-3xl p-5 shadow-sm border border-muted-text/15">
				<div className="flex items-center justify-between pb-2 border-b border-muted-text/10">
					<div className="flex items-center justify-between w-full">
						<span className="font-bold text-dark-text text-sm">
							Table #{activeOrder?.tableNumber}
						</span>
						<span
							className={`${StatusColor[activeOrder.status]} text-[8px] font-semibold inline-block py-0.5 px-1 rounded-full border`}
						>
							{activeOrder.status.toLocaleUpperCase()}
						</span>
					</div>
				</div>
				{activeOrder?.items.map((cart) => (
					<div
						key={cart.foodId._id}
						className="flex items-center justify-between border-b border-muted-text/30 last:border-0 py-2.5"
					>
						<div className="flex flex-col gap-3 w-full">
							<div
								key={cart.foodId._id}
								className="flex items-center space-x-3"
							>
								<div className="w-16 h-16 aspect-square rounded-xl relative">
									<Image
										src={cart.foodId.img}
										alt={cart.name}
										fill
										sizes="64px"
										loading="lazy"
										className="w-fulll h-full aspect-square rounded-xl object-cover shadow-xs shrink-0"
									/>
								</div>

								<div className="min-w-0">
									<h4 className="font-bold text-dark-text text-sm truncate">
										{cart.name}
									</h4>

									<p className="text-xs text-muted-text truncate">
										{cart.foodId.desc}
									</p>
								</div>
								<div className="flex items-end font-semibold h-max gap-1 shrink-0 ml-3 text-dark-text">
									<span className="text-xs leading-0">X</span>
									<span className="text-xl leading-1">{cart.quantity}</span>
								</div>
							</div>
						</div>
					</div>
				))}
				<div className="flex items-center justify-between">
					<span className="text-xs font-semibold text-muted-text">
						Order Subtotal:
					</span>

					<div className="flex items-center">
						<IndianRupee
							size={13}
							strokeWidth={3}
							className="text-red"
						/>
						<span className="font-extrabold text-red text-lg">{subtotal}</span>
					</div>
				</div>
				<div className="mt-5 border-t border-muted-text/15 pt-4">
					{isTerminal ? (
						<div
							role="status"
							className="flex items-center justify-center gap-2 text-sm font-semibold text-red-700"
						>
							<X size={18} />
							Order {activeOrder.status}
						</div>
					) : (
						<>
							<ol
								aria-label={`Order progress: ${activeOrder.status}`}
								className="flex items-start"
							>
								{ORDER_STEPS.map((step, index) => {
									const isComplete = currentStep !== undefined && index < currentStep;
									const isCurrent = currentStep === index;

									return (
										<li
											key={step}
											aria-current={isCurrent ? "step" : undefined}
											className="relative flex flex-1 flex-col items-center text-center"
										>
											{index > 0 && (
												<span
													aria-hidden="true"
													className={`absolute right-1/2 top-3 h-1 w-full ${
														currentStep !== undefined && index <= currentStep
															? "bg-green-600"
															: "bg-gray-200"
													}`}
												/>
											)}
											<span
												className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
													isComplete || isCurrent
														? "border-green-600 bg-green-600 text-white"
														: "border-gray-300 bg-white text-gray-400"
												}`}
											>
												{isComplete ? (
													<Check size={14} aria-hidden="true" />
												) : (
													<span className="text-[10px] font-bold">
														{index + 1}
													</span>
												)}
											</span>
											<span
												className={`mt-2 text-[9px] leading-3 sm:text-[10px] ${
													isComplete || isCurrent
														? "font-semibold text-green-700"
														: "text-muted-text"
												}`}
											>
												{step}
											</span>
										</li>
									);
								})}
							</ol>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
