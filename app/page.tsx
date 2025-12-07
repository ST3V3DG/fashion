import Header from "@/components/header";
import PagePreloader from "@/components/page-preloader";
import FeaturesSection from "@/components/sections/features";
import HeroSection from "@/components/sections/hero";

export default function Home() {
	return (
		<PagePreloader>
			<Header />
			<main className="overflow-x-hidden h-vh w-vw">
				<HeroSection />
				<FeaturesSection />
			</main>
		</PagePreloader>
	);
}
