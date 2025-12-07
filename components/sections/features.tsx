import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
	{
		title: "Feat 1",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
	},
	{
		title: "Feat 2",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
	},
	{
		title: "Feat 3",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
	},
	{
		title: "Feat 4",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
	},
];

export default function FeaturesSection() {
	return (
		<section id="features" className="p-6 flex flex-col justify-center items-center gap-16">
			<div className="flex flex-col gap-2 items-center justify-center">
				<h2 className="text-7xl font-bold">Features</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-4 max-md:[&>div:nth-child(even)>div:first-child]:order-2 max-md:[&>div:nth-child(odd)>div:first-child]:scale-[-1] max-md:[&>div:nth-child(odd)>div:last-child>p]:text-end max-md:[&>div:nth-child(odd)>div:last-child>a]:ml-auto max-md:[&>div:nth-child(even)>div:last-child]:order-1">
				{features.map((feature, index) => (
					<div className="grid grid-cols-3 gap-2" key={index}>
						<div className="overflow-hidden">
							<h3 className="text-8xl font-bold text-foreground/50 writing-mode-vertical-lr md:scale-[-1] border-l">
								{feature.title}
							</h3>
						</div>
						<div className="col-span-2 flex flex-col justify-between">
							<p>{feature.description}</p>
							<Link href="#" className="flex items-center gap-2 font-thin font-melodrama group">
								<span>Read More</span>
								<ArrowRight className="size-4 stroke-2 group-hover:translate-x-1 transition duration-300" />
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
