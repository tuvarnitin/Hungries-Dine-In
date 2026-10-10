import BackButton from "@/components/BackButton";
import TrashButton from "@/components/TrashButton";

interface CartHeaderProps {
	onClear: () => void;
}

export default function CartHeader({ onClear }: CartHeaderProps) {
	return (
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

			<TrashButton onClear={onClear} />
		</div>
	);
}
