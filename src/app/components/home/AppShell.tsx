"use client";
import { ReactNode } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import ReduxProvider from "../ReduxProvider";

const AppShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="p-4">
			<ReduxProvider>
				{children}
				<BottomTabBar />
			</ReduxProvider>
		</div>
	);
};

export default AppShell;
