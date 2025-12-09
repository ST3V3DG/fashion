"use client";

import { type LenisRef, ReactLenis } from 'lenis/react'
import { useRef } from "react";
import Header from "@/components/header";
import FeaturesSection from "@/components/sections/features";
import HeroSection from "@/components/sections/hero";
import PagePreloader from "@/providers/page-preloader";

export default function Home() {
	const lenisRef = useRef<LenisRef>(null);

	return (
		<>
			<ReactLenis root ref={lenisRef} />
			<PagePreloader>
				<Header />
				<main className="overflow-x-hidden">
					<HeroSection />
					<FeaturesSection />
				</main>
			</PagePreloader>
		</>
	);
}
