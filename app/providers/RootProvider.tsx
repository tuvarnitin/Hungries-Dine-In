"use client";

import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import { SessionProvider } from "next-auth/react";

const RootProvider = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<ReduxProvider>
				<QueryProvider>{children}</QueryProvider>
			</ReduxProvider>
			<ToastContainer
				position="top-center"
				autoClose={2500}
				hideProgressBar
				newestOnTop
				closeOnClick
				pauseOnFocusLoss
				draggable
				theme="light"
				limit={4}
				closeButton
			/>
		</SessionProvider>
	);
};

export default RootProvider;