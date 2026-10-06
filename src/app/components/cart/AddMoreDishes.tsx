import { Plus } from "lucide-react";
import Button from "@/components/Button";

interface AddMoreDishesProps {
	onClick?: () => void;
}

export default function AddMoreDishes({ onClick }: AddMoreDishesProps) {
	return (
		<Button
			icon={<Plus size={16} />}
			variant="outline"
			fullWidth
			size="lg"
			onClick={onClick}
			className="border-dashed border-red/30 hover:border-red/80 bg-white/60 hover:bg-white text-red text-xs transition-colors"
		>
			Add more dishes or beverages
		</Button>
	);
}
