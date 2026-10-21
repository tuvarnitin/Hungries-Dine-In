"use client";
import { ReactNode } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import TableExpiryCheck from "@/components/TableExpiryCheck";
import RootProvider from "@/providers/RootProvider";

const AppShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="p-4">
			<RootProvider>
				<TableExpiryCheck />
				{children}
				<BottomTabBar />
			</RootProvider>
		</div>
	);
};

export default AppShell;
