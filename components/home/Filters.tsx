import React, { Dispatch } from "react";
import { FILTERS } from "@/data/filter";

const Filters = ({
	setSelectedFilter,
	selectedFilter,
}: {
	setSelectedFilter: Dispatch<string>;
	selectedFilter: string;
}) => {
	const Filter = ({
		filter: { text, value, Icon },
	}: {
		filter: { value: string; Icon: any; text: string };
	}) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setSelectedFilter(e.target.value);
		};
		return (
			<label
				className={`flex items-center gap-1 rounded-full py-1.5 px-2 sm:px-2 sm:py-1.5 pr-3 sm:pr-3 hover:opacity-90 ${selectedFilter === value ? "bg-primary text-white" : "text-primary bg-[#faf9f4] border border-primary"}`}
				htmlFor={value}
			>
				<input
					type="radio"
					name="filter"
					value={value}
					id={value}
					onChange={handleChange}
				/>
				<Icon
					strokeWidth={1.5}
					size={18}
				/>
				<p className="text-sm">{text}</p>
			</label>
		);
	};

	return (
		<div className="overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
			<div className="flex w-max items-center gap-2">
				{FILTERS.map((filter) => (
					<Filter
						key={filter.value}
						filter={filter}
					/>
				))}
			</div>
		</div>
	);
};

export default Filters;
