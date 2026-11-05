import Altimeter from "@/components/paramo/altimeter";
import PlateImage from "@/components/paramo/plate-image";
import { TextWithTooltips } from "@/components/santurban/text-with-tooltips";
import AudioPlayer from "@/components/ui/audio-player";
import Footer from "@/components/ui/footer";
import { ParamoGallery } from "@/components/ui/paramo-gallery";
import content from "@/data/santurban-content.json";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** Encabezado de sala: título en la columna izquierda, contenido a la derecha. */
function Room({
	id,
	title,
	note,
	children,
	className = "",
}: {
	id: string;
	title: string;
	note?: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			aria-labelledby={id}
			className={`px-4 py-20 md:px-12 md:py-28 lg:px-20 ${className}`}
		>
			<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[18rem_1fr] lg:gap-16">
				<div>
					<h2 id={id} className="font-display text-4xl leading-[1.05] md:text-5xl lg:sticky lg:top-24">
						{title}
					</h2>
					{note && <p className="mt-3 font-serif italic opacity-80">{note}</p>}
				</div>
				<div>{children}</div>
			</div>
		</section>
	);
}

const stats = [
	{ label: "Personas abastecidas", value: "2,3 millones", note: "en 48 municipios" },
	{ label: "Extensión", value: "142.000 ha", note: "72 % en Norte de Santander" },
	{ label: "Lagunas de origen glaciar", value: "26 o más", note: "interconectadas" },
	{ label: "Rango térmico diario", value: "0 – 15 °C", note: "mínimas por debajo de 0 °C" },
];

export default function SanturbanPage() {
	const { hero, introduction, detailedInfo, curiosities, climate, geology, conservation, cta } =
		content;

	return (
		<>
			<Altimeter targetId="descenso" />
			<main id="descenso" className="bg-mist pt-[5.75rem] text-ink md:pl-28 md:pt-14">
				{/* Cumbre */}
				<section aria-labelledby="titulo" className="px-4 pb-16 pt-12 md:px-12 md:pt-20 lg:px-20">
					<div className="mx-auto max-w-6xl">
						<h1 id="titulo" className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92]">
							{hero.title}
						</h1>
						<p className="mt-5 max-w-3xl font-serif text-[clamp(1.25rem,2.4vw,1.9rem)] italic leading-snug text-water-deep">
							{hero.subtitle}
						</p>

						<figure className="mt-12">
							<div className="border border-ink/40 bg-mist-deep p-2 md:p-3">
								<PlateImage
									src={hero.backgroundImage}
									alt="Pajonales y frailejones del Páramo de Santurbán bajo la niebla"
									caption="Páramo de Santurbán"
									loading="eager"
									className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
								/>
							</div>
							<figcaption className="mt-3 flex flex-col justify-between gap-1 text-xs text-ink-soft sm:flex-row">
								<span>Páramo de Santurbán, Santander y Norte de Santander.</span>
								<span>Foto: Garciarovira, CC BY-SA 4.0, vía Wikimedia Commons</span>
							</figcaption>
						</figure>

						<p className="mt-14 max-w-[52rem] font-serif text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed">
							<TextWithTooltips text={introduction.text} />
						</p>
					</div>
				</section>

				{/* Ficha */}
				<Room id="ficha" title="Ficha del páramo" note="Las cifras que lo hacen indispensable">
					<dl className="border-t-2 border-ink">
						{stats.map((s) => (
							<div
								key={s.label}
								className="grid gap-1 border-b border-ink/30 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
							>
								<dt className="text-ink-soft">
									{s.label}
									<span className="block text-sm">{s.note}</span>
								</dt>
								<dd className="tabular font-display text-4xl md:text-5xl">{s.value}</dd>
							</div>
						))}
					</dl>
				</Room>

				<ParamoGallery />

				{/* Franja del páramo */}
				<div className="bg-slope-1">
					<Room id="agua" title={detailedInfo.waterFactory.title} note="Cómo nace el agua de millones">
						<div className="max-w-[40rem] space-y-5 text-lg leading-relaxed">
							{detailedInfo.waterFactory.paragraphs.map((para) => (
								<p key={para.slice(0, 40)}>
									<TextWithTooltips text={para} />
								</p>
							))}
						</div>
					</Room>

					<div className="contour mx-4 text-ink/50 md:mx-12 lg:mx-20" />

					<Room id="vida" title={detailedInfo.biodiversity.title} note="293 especies de fauna, 457 de plantas">
						<div className="max-w-[40rem] space-y-5 text-lg leading-relaxed">
							{detailedInfo.biodiversity.paragraphs.map((para) => (
								<p key={para.slice(0, 40)}>
									<TextWithTooltips text={para} />
								</p>
							))}
						</div>
						<Link
							href="/explore"
							className="group mt-10 inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-semibold"
						>
							Ver estas especies en la colección
							<ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
						</Link>
					</Room>

					<div className="contour mx-4 text-ink/50 md:mx-12 lg:mx-20" />

					<Room id="notas" title="Notas de campo" note="Lo que sorprende del páramo">
						<ol className="grid gap-x-10 sm:grid-cols-2 xl:grid-cols-3">
							{curiosities.map((c) => (
								<li key={c.id} className="border-t border-ink/40 py-6">
									<h3 className="font-serif text-xl font-bold">{c.title}</h3>
									<p className="mt-2 leading-relaxed">
										<TextWithTooltips text={c.description} />
									</p>
								</li>
							))}
						</ol>
					</Room>
				</div>

				{/* Franja del bosque altoandino */}
				<div className="on-dark bg-slope-2 text-on-slope">
					<Room id="clima" title={climate.title} note="Frío, húmedo y con dos temporadas de lluvia">
						<div className="grid gap-12 md:grid-cols-2">
							{climate.sections.map((section) => (
								<div key={section.title}>
									<h3 className="border-b border-on-slope/40 pb-3 font-serif text-xl font-bold">
										{section.title}
									</h3>
									<div className="mt-5 space-y-4 leading-relaxed">
										{section.paragraphs.map((para) => (
											<p key={para.slice(0, 40)}>
												<TextWithTooltips text={para} />
											</p>
										))}
									</div>
								</div>
							))}
						</div>
					</Room>

					<div className="contour mx-4 text-on-slope/40 md:mx-12 lg:mx-20" />

					<Room id="suelo" title={geology.title} note="Hace 2 a 3 millones de años">
						<p className="max-w-[40rem] text-lg leading-relaxed">
							<TextWithTooltips text={geology.intro} />
						</p>
						<ul className="mt-8 max-w-[40rem] border-t border-on-slope/40">
							{geology.features.map((f) => (
								<li key={f} className="border-b border-on-slope/40 py-4 leading-relaxed">
									<TextWithTooltips text={f} />
								</li>
							))}
						</ul>
					</Room>
				</div>

				{/* Franja del valle: lo que está en riesgo */}
				<div className="on-dark bg-slope-3 text-on-slope">
					<Room id="riesgo" title={conservation.title} note="Lo que lo amenaza y lo que lo protege">
						<p className="max-w-[40rem] text-lg leading-relaxed">{conservation.intro}</p>
						<div className="mt-12 grid gap-12 md:grid-cols-2">
							<div>
								<h3 className="border-b-2 border-gold pb-3 font-serif text-xl font-bold">Amenazas</h3>
								<ul className="mt-2">
									{conservation.threats.map((t) => (
										<li key={t} className="border-b border-on-slope/30 py-4 leading-relaxed">
											<TextWithTooltips text={t} />
										</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="border-b-2 border-water-pale pb-3 font-serif text-xl font-bold">
									Acciones de protección
								</h3>
								<ul className="mt-2">
									{conservation.protectionActions.map((a) => (
										<li key={a} className="border-b border-on-slope/30 py-4 leading-relaxed">
											{a}
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="mt-12 max-w-[40rem]">
							<h3 className="font-serif text-xl font-bold">{conservation.legalProtection.title}</h3>
							<p className="mt-3 leading-relaxed text-on-slope-soft">
								<TextWithTooltips text={conservation.legalProtection.description} />
							</p>
						</div>
					</Room>
				</div>

				{/* Llegada al valle */}
				<section aria-labelledby="llegada" className="on-dark bg-slope-4 px-4 py-24 text-on-slope md:px-12 md:py-32 lg:px-20">
					<div className="mx-auto max-w-6xl">
						<h2 id="llegada" className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]">
							Llegaste al valle. Si vives aquí, el agua que bebes bajó por este páramo.
						</h2>
						<p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-slope-soft">{cta.description}</p>
						<Link
							href={cta.buttonLink}
							className="group mt-10 inline-flex h-14 items-center gap-3 bg-on-slope px-7 font-semibold text-ink transition-colors duration-300 ease-out hover:bg-water-pale"
						>
							Conocer la colección
							<ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
						</Link>
					</div>
				</section>

				<div className="border-t border-on-slope/15">
					<Footer />
				</div>
			</main>

			<div className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 md:bottom-[5.25rem] md:left-auto md:right-6 md:translate-x-0">
				<AudioPlayer audioFileName="conservacion.mp3" />
			</div>
		</>
	);
}
