import { Send } from "lucide-react";
import Button from "@/components/Button";

interface SendOrderButtonProps {
	totalDue: number;
	onClick?: () => void;
	loading?: boolean;
}

export default function SendOrderButton({
	totalDue,
	onClick,
	loading = false,
}: SendOrderButtonProps) {
	return (
		<div className="w-full max-w-md mx-auto space-y-2.5">
			<Button
				icon={<Send className="w-4 h-4" />}
				fullWidth
				size="lg"
				onClick={onClick}
				loading={loading}
			>
				{loading
					? "Sending Order..."
					: `Send Order to Kitchen • $${totalDue.toFixed(2)}`}
			</Button>
		</div>
	);
}
