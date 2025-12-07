"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const headerLinks = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Products",
		href: "/",
	},
	{
		title: "Services",
		href: "/",
	},
	{
		title: "About",
		href: "/",
	},
	{
		title: "Contact",
		href: "/",
	},
];

export default function Header() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-6 border-b bg-background font-melodrama focus-within:outline-none">
			<Link href="/" className="text-3xl font-bold px-2">
				Fashion
			</Link>
			<nav className="hidden md:block">
				<ul className="flex *:p-2">
					{headerLinks.map((link, index) => (
						<li key={index}>
							<Link href={link.href}>{link.title}</Link>
						</li>
					))}
				</ul>
			</nav>
			<button className="md:hidden" type="button" onClick={() => setOpen(!open)} aria-label="open">
				<Menu className="size-8 text-foreground/50" />
			</button>
			<div
				className={`absolute top-0 left-0 right-0 h-dvh z-99 bg-background/90 flex flex-col gap-16 transition duration-300 p-6 focus-within:outline-none ${open ? "translate-y-0" : "-translate-y-full"}`}
			>
				<div className="flex items-center justify-between">
					<Link href="/" className="text-3xl font-bold px-2">
						Fashion
					</Link>
					<button aria-label="close" type="button" onClick={() => setOpen(!open)}>
						<X className="size-8 text-foreground/50" />
					</button>
				</div>
				<nav>
					<ul className="flex flex-col gap-2 p-2 *:p-2">
						{headerLinks.map((link, index) => (
							<li key={index}>
								<Link href={link.href}>{link.title}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
