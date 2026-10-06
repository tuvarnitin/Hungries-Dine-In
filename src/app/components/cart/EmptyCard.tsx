
import BowlIllustraion from "@/components/BowlIllustraion";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
    const router = useRouter()
	return (
		<div className="w-full max-w-md flex flex-col items-center justify-center text-center pt-30">
			{/* Custom Empty Bowl Vector Illustration */}
            <BackButton className="absolute top-4 left-4" />
			<BowlIllustraion />
			{/* Headings */}
			<h2 className="text-2xl font-bold font-serif text-[#062E1B] tracking-tight mb-2">
				Your table bowl is empty.
			</h2>
			<p className="text-xs text-[#7A7067] max-w-xs leading-relaxed mb-8">
				Looks like you haven't added anything to your cart yet.
			</p>

			{/* Add Dishes Button */}
			<button
				onClick={()=>router.push("/")}
				className="mt-4"
			>
				<span className="text-sm underline cursor-pointer">Add dishes or beverages</span>
			</button>
		</div>
	);
}
