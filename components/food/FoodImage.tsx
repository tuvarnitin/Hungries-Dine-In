"use client";

import Image from "next/image";
import { useState } from "react";
import { Leaf } from "lucide-react";

type FoodImageProps = {
    food: {
        img: string;
        name: string;
    };
    isVeg: boolean;
};

const FoodImage = ({ food, isVeg }: FoodImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="group/image relative h-[clamp(126px,14vw,120px)] w-[clamp(126px,14vw,120px)] shrink-0 overflow-hidden rounded-[22px] bg-gray-200">
            {/* Skeleton */}
            {isLoaded && !hasError && (
                <div
                    className="absolute inset-0 z-10 animate-pulse bg-linear-to-r from-dark-text/10 via-dark-text/5 to-dark-text/10"
                    aria-hidden="true"
                />
            )}

            {/* Optimized image */}
            {!hasError && (
                <Image
                    src={food.img}
                    alt={food.name}
                    fill
                    sizes="130px"
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={`object-cover transition-[opacity,transform] duration-500 group-hover/image:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}

            {/* Error fallback */}
            {hasError && (
                <div className="flex h-full items-center justify-center text-center text-xs text-gray-500">
                    <Image src={"/food-img-na.jpg"} alt="food image not available" fill loading="lazy"
                        className={`object-cover transition-[opacity,transform] duration-500 group-hover/image:scale-105 opacity-100`} />
                </div>
            )}

            {/* Veg badge */}
            {isVeg && (
                <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-xs font-medium text-white shadow-sm">
                    <Leaf size={10} />
                    <span className="text-[clamp(12px,2vw,14px)]">Veg</span>
                </div>
            )}
        </div>
    );
};

export default FoodImage;
