import Image from "next/image";
import { ActiveOrderType } from "./ActiveOrders";
import { IndianRupee } from "lucide-react";

type Props = {
	activeOrder: ActiveOrderType;
	subtotal: number;
};

const StatusColor: Record<string, string> = {
	pending: "text-green-600  border-green-600 bg-green-600/10",
	preparing: "text-yellow-400 border-yellow-400 bg-yellow-100/10",
};

export default function ActiveOrderCard({ activeOrder, subtotal }: Props) {
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
			</div>
		</div>
	);
}
