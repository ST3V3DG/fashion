import type { Metadata } from "next";
import 'lenis/dist/lenis.css'
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
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
		<html className="dark" lang="en" suppressHydrationWarning>
			<SmoothScroll>
				<body className={`antialiased`}>
					{children}
					<SpeedInsights />
				</body>
			</SmoothScroll>
		</html>
	);
}
