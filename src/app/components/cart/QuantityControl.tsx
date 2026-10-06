import { Minus, Plus } from "lucide-react";
import Button from "@/components/Button";

interface QuantityControlProps {
	quantity: number;
	onDecrease: () => void;
	onIncrease: () => void;
}

export default function QuantityControl({
	quantity,
	onDecrease,
	onIncrease,
}: QuantityControlProps) {
	return (
		<div className="flex items-end justify-between">
			<span className="text-xs font-medium text-muted-text">Quantity</span>

			<div className="flex items-center space-x-3 bg-white border border-muted-text/10 rounded-full px-1.5 py-1 shadow-xs">
				<button
					type="button"
					onClick={onDecrease}
					className="text-neutral-600 hover:text-neutral-900 transition-colors p-0.5"
					aria-label="Decrease quantity"
				>
					<Minus
						size={17}
						strokeWidth={3.5}
					/>
				</button>

				<span className="text-lg font-(family-name:--font-playfair) font-bold leading-1 w-3 text-center mb-1.5">
					{quantity}
				</span>

				<Button
					onClick={onIncrease}
					size="xs"
					className="rounded-full"
					aria-label="Increase quantity"
				>
					<Plus size={16} />
				</Button>
			</div>
		</div>
	);
}
