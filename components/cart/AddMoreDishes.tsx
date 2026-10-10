import { Plus } from "lucide-react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function AddMoreDishes() {
	const router = useRouter();

	return (
		<Button
			icon={<Plus size={16} />}
			variant="outline"
			fullWidth
			size="lg"
			onClick={() => router.push("/")}
			className="border-dashed border-red/30 hover:border-red/80 bg-white/60 hover:bg-white text-red text-xs transition-colors"
		>
			Add more dishes or beverages
		</Button>
	);
}
