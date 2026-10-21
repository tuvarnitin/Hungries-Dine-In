"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import SearchBar from "@/components/home/SearchBar";
import HomeBanner from "@/components/home/HomeBanner";
import Filters from "@/components/home/Filters";
import FoodList from "@/components/food/FoodList";
import NoResults from "@/components/home/NoResults";

export default function Home() {
	const [selectedFilter, setSelectedFilter] = useState("All");

	return (
		<div className="flex-1 flex flex-col gap-4">
			<div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
				<Navbar />

				<SearchBar setSelectedFilter={setSelectedFilter} />
			</div>

			<HomeBanner />

			<Filters
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
			/>
			<FoodList selectedFilter={selectedFilter} title="Featured" />
		</div>
	);
}
