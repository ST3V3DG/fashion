import type { Metadata } from "next";
import 'lenis/dist/lenis.css'
import "./globals.css";
import SmoothScroll from "@/providers/smooth-scroll";

export const metadata: Metadata = {
	title: "Fashion",
	description: "Fashion",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="dark" lang="en">
			<SmoothScroll>
				<body className={`antialiased`}>
					{children}
				</body>
			</SmoothScroll>
		</html>
	);
}
