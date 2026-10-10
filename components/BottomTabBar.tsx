"use client";
import { House, NotebookPen, QrCode, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BOTTOM_TAB_LINKS = [
	{
		id: "home",
		path: "/",
		name: "Home",
		Icon: House,
	},
	{
		id: "orders",
		path: "/orders",
		name: "Orders",
		Icon: NotebookPen,
	},
	{
		id: "cart",
		path: "/cart",
		name: "Cart",
		Icon: ShoppingCart,
	},
	{
		id: "profile",
		path: "/profile",
		name: "Profile",
		Icon: User,
	},
] as const;
function BottomTabBar() {
	const pathname = usePathname();
	return (
		<div className="fixed md:hidden bottom-2 left-1/2 transform -translate-x-1/2 py-2 pt-3.5 px-8 w-fit  bg-cream flex justify-center gap-[14vw] items-baseline rounded-full shadow-md border border-gray-800/10">
			{BOTTOM_TAB_LINKS.map(({ path, name, Icon, id }) => {
				return (
					<Link
						key={id}
						href={path}
						className={`flex flex-col items-center gap-1 ${pathname === path ? "text-primary" : "text-muted-text"}`}
					>
						<Icon size={24} />
						<p className="text-xs">{name}</p>
					</Link>
				);
			})}
		</div>
	);
}

export default BottomTabBar;
