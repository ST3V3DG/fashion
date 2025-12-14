/** biome-ignore-all lint/style/noNonNullAssertion: Allow non null assertions for refs */
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createContext, useRef, useState } from "react";

export const PagePreloaderContext = createContext<gsap.core.Timeline | undefined>(undefined);

export default function PagePreloader({ children }: { children: React.ReactNode }) {
	const [tl, setTl] = useState<gsap.core.Timeline>();
	const counterElements = useRef<HTMLSpanElement[]>([]);
	const SVGLineElements = useRef<SVGLineElement[]>([]);
	const counterValue = { value: 0 };

	gsap.registerPlugin(useGSAP);

	useGSAP(() => {
		const tl = gsap.timeline();

		tl.to(counterValue, {
			value: 100,
			duration: 10,
			ease: "sine.inOut",
			onUpdate: () => {
				counterElements.current.forEach((element) => {
					element.textContent = `${Math.floor(counterValue.value)}%`;
				});
			},
		}).to(SVGLineElements.current, {
			duration: 1.5,
			xPercent: 110,
			ease: "power4.in",
		}).to("#preloader > div", {
			delay: 0.5,
			duration: 1,
			yPercent: gsap.utils.wrap([-100, 100]),
			ease: "power3.inOut",
		});

		setTl(tl);
	});

	return (
		<PagePreloaderContext.Provider value={tl}>
			<div
				id="preloader"
				className="grid grid-rows-2 fixed top-0 left-0 right-0 z-40 pointer-events-none bg-transparent h-dvh w-dvw *:bg-background *:overflow-hidden"
			>
				<div className="flex items-end justify-center relative">
					<span
						ref={(element) => {
							counterElements.current[0] = element!;
						}}
						className="counter text-[min(30vw,16rem)] font-extrabold translate-y-1/2"
					>
						0%
					</span>
					<svg
						className="absolute left-0 bottom-0 w-[110%] h-16 translate-y-1/2 mix-blend-difference overflow-visible fill-none"
						viewBox="0 0 1048 1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line
							ref={(element) => {
								SVGLineElements.current[0] = element!;
							}}
							className="stroke-foreground stroke-16 -translate-x-[110%]"
							y1="-2"
							x2="1048"
							y2="-2"
						/>
					</svg>
				</div>
				<div className="flex items-start justify-center relative">
					<span
						ref={(element) => {
							counterElements.current[1] = element!;
						}}
						className="counter text-[min(30vw,16rem)] font-extrabold -translate-y-1/2"
					>
						0%
					</span>
					<svg
						className="absolute left-0 top-0 w-[110%] h-16 -translate-y-1/2 mix-blend-difference overflow-visible fill-none"
						viewBox="0 0 1048 1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<line
							ref={(element) => {
								SVGLineElements.current[1] = element!;
							}}
							className="stroke-foreground stroke-16 -translate-x-[110%]"
							y1="2"
							x2="1048"
							y2="2"
						/>
					</svg>
				</div>
			</div>
			{children}
		</PagePreloaderContext.Provider>
	);
}
