import footerContent from "@/data/footer-content.json";
import Link from "next/link";

export default function Footer() {
	const { official, academic } = footerContent.sources;

	return (
		<footer className="on-dark bg-slope-4 text-on-slope">
			<div className="mx-auto max-w-6xl px-4 pb-28 pt-16 md:px-8 md:pb-16">
				<div className="flex flex-col gap-2 border-b border-on-slope/25 pb-10 md:flex-row md:items-end md:justify-between">
					<p className="font-display text-3xl md:text-4xl">Museo Virtual Santurbán</p>
					<p className="font-serif italic text-on-slope-soft">
						Donde el agua nace, la vida florece
					</p>
				</div>

				<div className="grid gap-10 py-10 md:grid-cols-[1fr_1fr_14rem]">
					{[official, academic].map((group) => (
						<div key={group.title}>
							<h2 className="label text-gold">{group.title.replace(/:$/, "")}</h2>
							<ul className="mt-4 space-y-3 text-sm leading-relaxed text-on-slope-soft">
								{group.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					))}
					<nav aria-label="Pie de página">
						<h2 className="label text-gold">Salas</h2>
						<ul className="mt-4 space-y-3 text-sm">
							<li>
								<Link href="/santurban" className="underline-offset-4 hover:underline">
									El descenso
								</Link>
							</li>
							<li>
								<Link href="/explore" className="underline-offset-4 hover:underline">
									La colección
								</Link>
							</li>
							<li>
								<Link href="/about" className="underline-offset-4 hover:underline">
									Créditos
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div className="flex flex-col gap-3 border-t border-on-slope/25 pt-8 text-sm text-on-slope-soft md:flex-row md:justify-between">
					<p className="max-w-2xl">{footerContent.educationalNote}</p>
					<p className="shrink-0">{footerContent.copyright}</p>
				</div>
			</div>
		</footer>
	);
}
