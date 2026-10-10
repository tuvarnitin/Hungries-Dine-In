import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/home/AppShell";

import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Hungries Dine In",
	description: "Make Order From Your Table",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${playfair.variable} ${inter.variable} h-full antialiased`}
		>
			<body className="min-h-dvh flex flex-col">
				<AppShell>{children}</AppShell>
			</body>
		</html>
	);
}
