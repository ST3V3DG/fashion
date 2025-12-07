"use client";

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
		<header className="sticky top-0 left-0 right-0 z-50 bg-background font-melodrama focus-within:outline-none **:focus-within:outline-none">
			<div className="size-full flex items-center justify-between bg-background py-4 px-6 border-b">
				<Link href="/" className="text-3xl font-bold px-2">
					Fashion
				</Link>
				<nav className="hidden md:block">
					<ul className="flex *:p-2">
						{headerLinks.map((link, index) => (
							<li className="relative before:absolute before:bottom-1.5 before:left-0 before:h-1 before:bg-foreground/50 before:w-full before:scale-x-0 hover:before:scale-x-90 before:content-[''] before:transition before:duration-300" key={index}>
								<Link href={link.href}>{link.title}</Link>
							</li>
						))}
					</ul>
				</nav>
				<button className="md:hidden" type="button" onClick={() => setOpen(!open)} aria-label="open">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu size-8 text-foreground/50 relative" aria-hidden="true"><path className={`transition duration-300 origin-center ${open ? "-rotate-45 absolute top-1/2 left-1/2 translate-x-1.25 translate-y-1.25" : "rotate-0"}`} d="M4 5h16"></path><path className={`transition duration-300 ${open ? "opacity-0" : "opacity-100"}`} d="M4 12h16"></path><path className={`transition duration-300 origin-center ${open ? "rotate-45 absolute top-1/2 left-1/2 translate-x-1.25 -translate-y-1.25" : "rotate-0"}`} d="M4 19h16"></path></svg>
				</button>
			</div>
			<div
				className={`absolute md:hidden top-0 left-0 right-0 h-dvh -z-1 bg-background/90 flex flex-col gap-16 transition duration-300 px-6 pt-16 focus-within:outline-none ${open ? "translate-y-0" : "-translate-y-full"}`}
			>
				<nav>
					<ul className="flex flex-col gap-2 p-2 *:p-2 *:border-b">
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
