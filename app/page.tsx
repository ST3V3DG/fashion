import Header from "@/components/header";
import HeroSection from "@/components/sections/hero";
import PagePreloader from "@/components/page-preloader";
import FeaturesSection from "@/components/sections/features";

export default function Home() {
	return (
		<PagePreloader>
			<Header />
			<main className="overflow-x-hidden h-dvh w-dvw">
				<HeroSection />
				<FeaturesSection />
			</main>
		</PagePreloader>
	);
}
