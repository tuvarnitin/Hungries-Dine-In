import { Trash2 } from "lucide-react";

const TrashButton = ({ onClear }: { onClear: () => void }) => {
	return (
		<button
			onClick={onClear}
			className="w-10 h-10 rounded-full bg-white border border-muted-text/20 flex items-center justify-center text-dark-text hover:text-red shadow-2xs hover:bg-red-50 transition-colors"
		>
			<Trash2 className="w-4 h-4" />
		</button>
	);
};

export default TrashButton;
