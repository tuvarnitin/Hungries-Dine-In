'use client'
import { ReactNode } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const AppShell = ({ children }: { children: ReactNode }) => {
	return (
		<div className="p-4">
			<Provider store={store}>
				{children}
				<BottomTabBar />
			</Provider>
		</div>
	);
};

export default AppShell;
