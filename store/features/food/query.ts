import { useInfiniteQuery } from "@tanstack/react-query";
import { getFoods } from "./api";

export function useFood(category?:string) {
	return useInfiniteQuery({
		queryKey: ["foods",{category}],
		initialPageParam: 1,
		queryFn: ({pageParam}) => getFoods({page:pageParam,limit:10,category}),
		getNextPageParam: (lastPage) =>
			lastPage.hasMore ? lastPage.nextPage : undefined,
		staleTime: 5 * 60 * 1000,
	});
}
