/** biome-ignore-all lint/a11y/noStaticElementInteractions: Allow click events on images grid elements to swap main image */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Allow key events on images grid elements to swap main image */
/** biome-ignore-all lint/suspicious/noExplicitAny: No type */

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Flip from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import { useContext, useRef } from "react";
import { PagePreloaderContext } from "@/providers/page-preloader";

const mainImages = [
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/beautiful-african-woman-monochrome-portrait_23-2151436252.jpg",
	},
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/portrait-beautiful-caucasian-sunbathed-woman-model-with-dark-long-hair-striped-swimsuit-lying-summer-beach-with-white-sand_158538-13374.jpg",
	},
];

const gridImages = [
	{ alt: "", src: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428185.jpg" },
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/beautiful-african-woman-monochrome-portrait_23-2151436254.jpg",
	},
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/medium-shot-man-with-braids-portrait_23-2151428184.jpg",
	},
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/beautiful-african-woman-monochrome-portrait_23-2151436271.jpg",
	},
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/black-white-minimal-portrait_23-2149152612.jpg",
	},
	{
		alt: "",
		src: "https://img.freepik.com/free-photo/beautiful-african-woman-monochrome-portrait_23-2151436140.jpg",
	},
];

const heroDescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut veritatis odit temporibus veniam doloremque unde molestias pariatur.";

const heroFeatures = [
	"Lorem.",
	"Lorem ipsum.",
	"Lorem ipsum dolor.",
];

export default function HeroSection() {
	gsap.registerPlugin(CustomEase, Flip, GSDevTools, SplitText, ScrollTrigger, useGSAP);

	const containerRef = useRef<HTMLDivElement>(null);
	const flip = useRef<gsap.core.Timeline>(null);

	const tl = useContext(PagePreloaderContext);

	function swap([a, b]: Element[]) {
		const c = b.parentNode;
		a.parentNode?.appendChild(b);
		c?.prepend(a);
	}

	useGSAP(
		() => {
			const splitHeader = new SplitText("h1", {
				type: "lines",
				mask: "lines",
				autoSplit: true,
			});

			const scrollTl = gsap.timeline({
				paused: true,
			});

			scrollTl.to("#main-hero-image-box > div > div > div", {
				yPercent: -100 / document.querySelectorAll("#main-hero-image-box > div > div").length,
				// scrollTrigger: {
				// 	trigger: "#hero",
				// 	start: "top 73px",
				// 	end: "bottom bottom",
				// 	pin: "#main-hero-image-box",
				// 	pinSpacing: false,
				// 	pinReparent: true,
				// 	scrub: true,
				// 	invalidateOnRefresh: true,
				// 	markers: true,
				// },
				// onComplete: () => {
				// 	document.querySelector("body")?.classList.add("overflow-y-auto");
				// },
			});

			tl?.fromTo(
				"#main-hero-image-box > div > div > img:last-child",
				{
					delay: 0.05,
					scale: 5,
				},
				{
					delay: 0.3,
					scale: 1,
					ease: "power1.in",
					display: "none",
					onComplete: () => {
						document.querySelector("#main-hero-image-box > div > div > img:last-child")?.remove();
					},
				},
			)
				.from(
					splitHeader.lines,
					{
						yPercent: 100,
						opacity: 0,
						duration: 1,
						ease: "power4.inOut",
						stagger: 0.1,
					},
				)
				.from("#hero > div > div:nth-child(3) p", {
					xPercent: 150,
					duration: 1.2,
					stagger: 0.1,
					autoAlpha: 0,
					ease: "power4.out",
				}, "-=0.5")
				.add(scrollTl.play());
			// GSDevTools.create({animation: tl});
		},
		{ dependencies: [tl] },
	);

	const { contextSafe } = useGSAP({ scope: containerRef, revertOnUpdate: true });

	const switchMainImageBox = contextSafe((event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.currentTarget.querySelector("#images-grid > div:hover > div > img");

		if (!target) return;

		const mainImage = document.querySelector("#main-hero-image-box > div > div > div:first-child > img");

		if (!mainImage) return;

		const state = Flip.getState([target, mainImage]);

		swap([target, mainImage]);

		flip.current = Flip.from(state, {
			duration: 0.8,
			absolute: true,
			ease: "power3.inOut",
		});
	});
	return (
		<section id="hero">
			<div
				className="flex flex-col lg:grid col-span-12 grid-cols-12 gap-4 md:*:min-h-[calc(100dvh-7rem)] p-6"
			>
				{/* <div className=""> */}
				<div
					ref={containerRef}
					className="h-full flex flex-col justify-between row-start-1 row-end-2 col-start-1 col-end-12 lg:col-end-5"
				>
					<h1 className="text-7xl font-bold mix-blend-difference">World Wide Fashion Studio</h1>
					<div
						id="images-grid"
						className="hidden lg:grid grid-cols-3 gap-2 w-2/3 *:cursor-pointer"
						onClick={switchMainImageBox}
					>
						{gridImages.map((image, index) => (
							<div key={index}>
								<div className="overflow-hidden size-full">
									<Image
										alt={image.alt}
										className="object-cover size-full pointer-events-none"
										height={1500}
										src={image.src}
										width={1500}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* <div className="flex items-center bg-red-950 relative"> */}
				<div id="main-hero-image-box" className="hover:scale-110 hover:rotate-2 transition duration-500 cursor-pointer w-full col-start-4 col-end-10 -z-1 overflow-hidden row-start-1 row-end-2">
					<div className="size-full flex items-center overflow-hidden">
						<div className="overflow-hidden aspect-video w-full relative">
							{
								mainImages.map((image, index) => (
									<div className="size-full overflow-hidden aspect-video" key={index}>
										<Image
											alt={image.alt}
											className="object-cover size-full pointer-events-none"
											height={1500}
											src={image.src}
											width={1500}
										/>
									</div>
								))
							}
							<Image
								alt={mainImages[0].alt}
								className="object-cover w-full absolute top-0 left-0 aspect-video"
								height={5000}
								src={mainImages[0].src}
								width={5000}
							/>
						</div>
					</div>
				</div>
				{/* </div> */}

				<div className="col-span-4 col-start-10 row-start-1 row-end-2 -col-end-1 h-full flex flex-col justify-between gap-4">
					<div className="flex flex-col gap-4">
						{
							heroFeatures.map((feature, index) => (
								<div className="flex flex-col items-end" key={index}>
									<p className="flex items-center gap-1 text-2xl font-bold text-end mix-blend-difference"><span className="text-foreground/50 text-nowrap">{feature}</span> <span className="text-foreground/50">0{index + 1}</span></p>
									<svg
										width="100%"
										height="1"
										viewBox="0 0 1048 1"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<line y1="0.5" x2="1048" y2="0.5" stroke="white" />
									</svg>
								</div>
							))
						}
					</div>
					<p className="text-lg font-bold lg:text-justify mix-blend-difference">
						{heroDescription}
					</p>
				</div>

				<div
					className="h-full flex flex-col justify-between row-start-2 row-end-3 col-start-1 col-end-12 lg:col-end-5"
				>
					<h1 className="text-7xl font-bold mix-blend-difference">World Wide Fashion Studio</h1>
					<div
						id="images-grid"
						className="hidden lg:grid grid-cols-3 gap-2 w-2/3 *:cursor-pointer"
						onClick={switchMainImageBox}
					>
						{gridImages.map((image, index) => (
							<div key={index}>
								<div className="overflow-hidden size-full">
									<Image
										alt={image.alt}
										className="object-cover size-full pointer-events-none"
										height={1500}
										src={image.src}
										width={1500}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="col-span-4 col-start-10 row-start-2 row-end-3 -col-end-1 h-full flex flex-col justify-between gap-4">
					<div className="flex flex-col gap-4">
						{
							heroFeatures.map((feature, index) => (
								<div className="flex flex-col items-end" key={index}>
									<p className="flex items-center gap-1 text-2xl font-bold text-end mix-blend-difference"><span className="text-foreground/50 text-nowrap">{feature}</span> <span className="text-foreground/50">0{index + 1}</span></p>
									<svg
										width="100%"
										height="1"
										viewBox="0 0 1048 1"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<line y1="0.5" x2="1048" y2="0.5" stroke="white" />
									</svg>
								</div>
							))
						}
					</div>
					<p className="text-lg font-bold lg:text-justify mix-blend-difference">
						{heroDescription}
					</p>
				</div>
				{/* </div> */}
				{/* <div className="col-span-12 grid grid-cols-12 gap-x-4">
					<div
						className="h-full flex flex-col justify-between row-start-1 row-end-2 col-start-1 col-end-12 lg:col-end-5"
					>
						<h1 className="text-7xl font-bold mix-blend-difference">World Wide Fashion Studio</h1>
						<div
							id="images-grid"
							className="hidden lg:grid grid-cols-3 gap-2 w-2/3 *:cursor-pointer"
							onClick={switchMainImageBox}
						>
							{gridImages.map((image, index) => (
								<div key={index}>
									<div className="overflow-hidden size-full">
										<Image
											alt={image.alt}
											className="object-cover size-full pointer-events-none"
											height={1500}
											src={image.src}
											width={1500}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="col-span-4 col-start-10 row-start-1 row-end-2 -col-end-1 h-full flex flex-col justify-between gap-4">
						<div className="flex flex-col gap-4">
							{
								heroFeatures.map((feature, index) => (
									<div className="flex flex-col items-end" key={index}>
										<p className="flex items-center gap-1 text-2xl font-bold text-end mix-blend-difference"><span className="text-foreground/50 text-nowrap">{feature}</span> <span className="text-foreground/50">0{index + 1}</span></p>
										<svg
											width="100%"
											height="1"
											viewBox="0 0 1048 1"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<line y1="0.5" x2="1048" y2="0.5" stroke="white" />
										</svg>
									</div>
								))
							}
						</div>
						<p className="text-lg font-bold lg:text-justify mix-blend-difference">
							{heroDescription}
						</p>
					</div>
				</div> */}
			</div>
		</section>
	);
}
