'use client'
import { SearchX } from "lucide-react";

interface NoResultsProps {
	query?: string;
	title?: string;
	description?: string;
}

export default function NoResults({
	query,
	title = "Nothing taste found",
	description = "We couldn't find anything matching your search. Try a different dish or category.",
}: NoResultsProps) {
	return (
		<div className="flex min-h-100 w-full flex-col items-center justify-center px-6 text-center pt-10">
			{/* Illustration */}
			<div className="relative mb-7 flex h-32 w-32 items-center justify-center">
				{/* Background circle */}
				<div className="absolute inset-0 rounded-full bg-[#e8e3d5]" />

				{/* Decorative dots */}
				<span className="absolute left-1 top-5 h-2 w-2 rounded-full bg-[#bf9961]" />
				<span className="absolute right-1 top-10 h-1.5 w-1.5 rounded-full bg-[#023320]" />
				<span className="absolute bottom-5 left-5 h-1.5 w-1.5 rounded-full bg-[#bf9961]" />

				{/* Plate */}
				<div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#023320] bg-[#f6f3e9] shadow-sm">
					<div className="h-11 w-11 rounded-full border-2 border-[#bf9961]" />

					{/* Search icon */}
					<div className="absolute -right-2 -top-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#023320] text-[#f6f3e9] shadow-md">
						<SearchX
							size={22}
							strokeWidth={1.8}
						/>
					</div>
				</div>
			</div>

			{/* Heading */}
			<h2 className="font-(family-name:--font-playfair) text-3xl font-bold tracking-tight text-[#17211e]">
				{title}
			</h2>

			{/* Search query */}
			{query && (
				<p className="mt-2 text-sm text-[#71837a]">
					No results for{" "}
					<span className="font-semibold text-[#023320]">"{query}"</span>
				</p>
			)}

			{/* Description */}
			<p className="mt-3 max-w-md text-sm leading-6 text-[#71837a]">
				{description}
			</p>

			{/* Action */}
			<button
				type="button"
				className="mt-6 rounded-full bg-[#023320] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#03452c] active:scale-95"
				onClick={() => window.location.reload()}
			>
				Explore the menu
			</button>
		</div>
	);
}
