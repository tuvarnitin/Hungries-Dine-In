import { Tab } from "@/types/shared";

type Props = {
	activeTab: Tab;
	onChange: (tab: Tab) => void;
};

export default function OrderTabs({ activeTab, onChange }: Props) {
	return (
		<div className="w-full max-w-md px-4">
			<div className="bg-muted-text/10 p-1.5 rounded-full flex items-center shadow-inner">
				<button
					type="button"
					onClick={() => onChange("active")}
					className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
						activeTab === "active"
							? "bg-primary text-white shadow-md"
							: "text-muted-text hover:text-dark-text"
					}`}
				>
					Active Orders
				</button>

				<button
					type="button"
					onClick={() => onChange("history")}
					className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
						activeTab === "history"
							? "bg-primary text-white shadow-md"
							: "text-muted-text hover:text-dark-text"
					}`}
				>
					Order History
				</button>
			</div>
		</div>
	);
}
