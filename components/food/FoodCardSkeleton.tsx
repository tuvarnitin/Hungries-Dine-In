const FoodCardSkeleton = () => {
  return (
    <article className="relative flex w-full items-center gap-4 rounded-[28px] bg-cream p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
      </div>

      <div className="relative h-[clamp(130px,18vw,180px)] w-[clamp(130px,18vw,180px)] shrink-0 overflow-hidden rounded-[22px] bg-gray-200">
        <div className="h-full w-full animate-pulse bg-gray-300/70" />

        <div className="absolute left-3 top-3 h-6 w-12 animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-5 w-[75%] animate-pulse rounded-md bg-gray-300" />

        <div className="mt-2 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-[70%] animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mt-3 flex items-center gap-5">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />

          <div className="h-5 w-px bg-gray-300" />

          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex items-center justify-between gap-[clamp(1px,3vw,10px)] pt-4">
          <div className="h-7 w-16 animate-pulse rounded-md bg-gray-300" />

          <div className="h-9 w-28 animate-pulse rounded-full bg-gray-300" />
        </div>
      </div>
    </article>
  );
};

export default FoodCardSkeleton;
