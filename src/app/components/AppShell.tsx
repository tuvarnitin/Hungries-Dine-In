import { ReactNode } from "react";
import BottomTabBar from "./BottomTabBar";


const AppShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="px-4 py-2">
			{children}
			<BottomTabBar />
		</div>
	);
};

export default AppShell;
