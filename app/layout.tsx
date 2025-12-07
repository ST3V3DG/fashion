import type { Metadata } from "next";
import "./globals.css";

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
			<body className={`overflow-x-hidden antialiased`}>{children}</body>
		</html>
	);
}
