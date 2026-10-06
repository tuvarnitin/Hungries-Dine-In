type Props = {
	tableNumber: string;
	onClick: () => void;
};

export default function QuickAddCard({ tableNumber, onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full bg-white rounded-3xl p-4 shadow-sm border border-dashed border-muted-text/20 hover:border-primary flex items-center justify-between cursor-pointer transition text-left"
		>
			<div className="flex items-center space-x-3">
				<div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg">
					+
				</div>

				<div>
					<h4 className="font-bold text-sm text-dark-text">
						Add More Dishes or Drinks
					</h4>

					<p className="text-xs text-muted-text">
						Instantly send items to {tableNumber} session
					</p>
				</div>
			</div>

			<span className="text-muted-text text-xl">›</span>
		</button>
	);
}
