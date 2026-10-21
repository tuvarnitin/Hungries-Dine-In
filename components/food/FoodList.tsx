"use client";
import FoodCard from "@/components/food/FoodCard";
import { useEffect, useRef } from "react";
import FoodCardSkeleton from "./FoodCardSkeleton";
import NoResults from "../home/NoResults";
import { useFood } from "@/store/features/food/query";

const FoodList = ({
	title,
	selectedFilter,
}: {
	title: string;
	selectedFilter: string;
}) => {
	const foodListContainerRef = useRef<HTMLDivElement>(null);

	const params = {
		...(selectedFilter !== "All" ? { category: selectedFilter } : {}),
	};

	const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useFood(params.category);

	useEffect(() => {
		const container = foodListContainerRef.current;

		if (!container) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					console.log("Intersected");
					fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: "200px",
				threshold: 0,
			},
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);
	console.log(data);

	const foods = data?.pages.flatMap((page) => page.foods) ?? [];

	if (isPending) {
		return Array.from({ length: 4 }).map((_, index) => (
			<FoodCardSkeleton key={index} />
		));
	}
	if (foods.length === 0) {
		return <NoResults />;
	}

	return (
		<>
			<div className="-mt-2">
				{foods && foods.length > 0 && (
					<>
						<div className="flex justify-between pt-6 pb-3">
							<h1 className="text-xl font-bold pl-3">{title}</h1>
							<p className="text-xs text-gold">View All (23)</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{foods.map((food) => (
								<FoodCard
									key={food._id}
									food={food}
								/>
							))}
						</div>
					</>
				)}
				{hasNextPage && (
					<div
						ref={foodListContainerRef}
						className="h-8"
						aria-hidden="true"
					/>
				)}
				{isFetchingNextPage &&
					Array.from({ length: 4 }).map((_, index) => (
						<FoodCardSkeleton key={index} />
					))}
			</div>
		</>
	);
};

export default FoodList;
