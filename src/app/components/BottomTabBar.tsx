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
		id: "scanner",
		path: "/scanner",
		name: "Scan",
		Icon: QrCode,
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
		<div className="fixed md:hidden bottom-0 left-0 py-5 pt-6 w-full bg-white flex justify-evenly items-baseline">
			{BOTTOM_TAB_LINKS.map(({ path, name, Icon, id }) => {
				return (
					<Link
						key={id}
						href={path}
						className={`relative flex flex-col items-center gap-1 ${pathname === path ? "text-primary" : "text-muted-text"}`}
					>
						{path === "/scanner" ? (
							<>
								<div className="">
									<div className="bg-primary absolute -top-18 -left-1/2 w-16 h-16 flex items-center justify-center rounded-full text-white">
										<Icon size={pathname === path ? 28 : 24} />
									</div>
								</div>
								<p className="text-xs">{name}</p>
							</>
						) : (
							<>
								<Icon size={24} />
								<p className="text-xs">{name}</p>
							</>
						)}
					</Link>
				);
			})}
		</div>
	);
}

export default BottomTabBar;
