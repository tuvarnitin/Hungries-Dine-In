"use client";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import HomeBanner from "./components/HomeBanner";
import { useState } from "react";
import Filters from "./components/Filters";
import FoodList from "./components/FoodList";
import { FOODS } from "./data/food";
import NoResults from "./components/NoResults";

export default function Home() {
	const [selectedFilter, setSelectedFilter] = useState("All");

	const filteredFoods =
		selectedFilter === "All"
			? FOODS
			: FOODS.filter((food) =>
					food.tags.some((tag) =>
						tag.toLowerCase().includes(selectedFilter.toLowerCase()),
					),
				);

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

			<div className="pb-30 -mt-2">
				{filteredFoods.length > 0 ? (
					<>
						<FoodList
							title="Popular at Hungries Dine"
							foods={filteredFoods}
						/>

						<FoodList
							title="Chef's Picks"
							foods={filteredFoods}
						/>

						<FoodList
							title="New on the Menu"
							foods={filteredFoods}
						/>

						<FoodList
							title="Fresh & Healthy"
							foods={filteredFoods}
						/>

						<FoodList
							title="Something Sweet"
							foods={filteredFoods}
						/>
					</>
				) : (
					<NoResults />
				)}
			</div>
		</div>
	);
}
