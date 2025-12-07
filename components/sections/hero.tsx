/** biome-ignore-all lint/a11y/noStaticElementInteractions: Allow click events on images grid elements to swap main image */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Allow key events on images grid elements to swap main image */

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import { useContext, useRef } from "react";
import { PagePreloaderContext } from "../page-preloader";

const mainImage = {
	alt: "",
	src: "https://img.freepik.com/free-photo/beautiful-african-woman-monochrome-portrait_23-2151436252.jpg",
};

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
	gsap.registerPlugin(CustomEase, Flip, SplitText, useGSAP);

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

			tl?.fromTo(
				"#main-hero-image-box > div > img:last-child",
				{
					delay: 0.05,
					scale: 5,
				},
				{
					delay: 0.3,
					scale: 1,
					ease: CustomEase.create("custom", "M0,0 C0.286,0.008 0.412,1 1,1"),
					display: "none",
					onComplete: () => {
						document.querySelector("#main-hero-image-box > div > img:last-child")?.remove();
					},
				},
			)
				.from(
					splitHeader.lines,
					{
						delay: 0.5,
						yPercent: 100,
						opacity: 0,
						duration: 1,
						ease: "power4.inOut",
						stagger: 0.1,
					},
					"-=0.5",
				)
				.from("#hero p", {
					xPercent: 150,
					duration: 1,
					autoAlpha: 0,
					ease: "power4.out",
				});
		},
		{ dependencies: [tl] },
	);

	const { contextSafe } = useGSAP({ scope: containerRef });

	const switchMainImageBox = contextSafe((event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.currentTarget.querySelector("#images-grid > div:hover > div > img");

		if (!target) return;

		const mainImage = document.querySelector("#main-hero-image-box > div > img:first-child");

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
		<section
			id="hero"
			className="flex flex-col lg:grid min-h-[calc(100dvh-5rem)] grid-cols-12 grid-rows-1 gap-4 p-6"
		>
			<div
				ref={containerRef}
				className="h-full flex flex-col justify-between row-start-1 row-end-2 col-start-1 col-end-12 lg:col-end-4"
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

			<div
				id="main-hero-image-box"
				className="col-span-6 hover:scale-110 hover:rotate-2 transition duration-500 cursor-pointer relative col-start-4 col-end-10 row-start-1 row-end-2 -z-1 align-self-center flex items-center"
			>
				<div className="overflow-hidden w-full aspect-video relative">
					<Image
						alt={mainImage.alt}
						className="object-cover size-full pointer-events-none"
						height={1500}
						src={mainImage.src}
						width={1500}
					/>
					<Image
						alt={mainImage.alt}
						className="object-cover size-full absolute top-0 left-0"
						height={5000}
						src={mainImage.src}
						width={5000}
					/>
				</div>
			</div>

			<div className="col-span-4 col-start-10 row-start-1 -col-end-1 row-end-2 h-full flex flex-col justify-between gap-4">
				<div className="flex flex-col gap-4">
					{
						heroFeatures.map((feature, index) => (
							<div className="flex flex-col items-end" key={index}>
								<p className="text-2xl font-bold text-end">{feature + " 0" + (index + 1)}</p>
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
		</section>
	);
}
