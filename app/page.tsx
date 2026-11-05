"use client";

import ParamoProfile from "@/components/paramo/paramo-profile";
import AudioPlayer from "@/components/ui/audio-player";
import Footer from "@/components/ui/footer";
import { ArrowRight, Volume2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const altitudes = [
	{ m: "4.290 m", note: "Cumbre" },
	{ m: "3.800 m", note: "" },
	{ m: "3.200 m", note: "" },
	{ m: "2.400 m", note: "" },
	{ m: "1.600 m", note: "" },
	{ m: "959 m", note: "Bucaramanga" },
];

const salas = [
	{
		href: "/santurban",
		name: "El descenso",
		text: "Baja con el agua desde las lagunas glaciares: clima, suelo, especies y las amenazas que enfrenta el páramo.",
	},
	{
		href: "/explore",
		name: "La colección",
		text: "Especies del páramo en modelos 3D que puedes girar y examinar, con su estado de conservación.",
	},
	{
		href: "/about",
		name: "Créditos",
		text: "Quiénes hicieron este museo, sus reconocimientos y las fuentes que lo respaldan.",
	},
];

export default function Home() {
	const [listening, setListening] = useState(false);

	return (
		<main className="bg-mist text-ink">
			{/* Primera vista: el corte del páramo */}
			<section className="relative flex flex-col overflow-hidden pt-14 md:min-h-[100svh]">
				{/* Regla altimétrica */}
				<ol
					aria-label="Altitud del recorrido"
					className="pointer-events-none absolute left-4 top-24 z-20 hidden w-24 flex-col justify-between border-r-2 border-ink md:flex lg:left-8"
					style={{ bottom: "calc(min(38.9vw, 64svh) * 0.32)" }}
				>
					{altitudes.map((a) => (
						<li key={a.m} className="relative flex justify-end pr-8">
							<span className="absolute -right-[2px] top-1/2 h-[2px] w-5 bg-ink" />
							<span className="tabular -translate-y-0 text-right text-xs font-semibold leading-tight">
								{a.m}
								{a.note && (
									<span className="block font-normal text-ink-soft">{a.note}</span>
								)}
							</span>
						</li>
					))}
				</ol>

				<div className="relative z-10 px-4 pt-10 md:pl-40 md:pt-12 lg:pl-48">
					<h1 className="font-display text-[clamp(3.5rem,11vw,6rem)] leading-[0.9] tracking-[-0.01em]">
						Santurbán
					</h1>
					<p className="mt-4 font-serif text-[clamp(1.35rem,2.6vw,2rem)] italic leading-snug text-water-deep">
						Donde el agua nace, la vida florece
					</p>
					<p className="mt-5 max-w-[34rem] text-base leading-relaxed text-ink-soft md:text-lg">
						Un museo para recorrer el páramo que da agua a 2,3 millones de
						personas en 48 municipios de Santander y Norte de Santander.
					</p>

					<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
						<Link
							href="/santurban"
							className="label group inline-flex h-14 items-center gap-3 bg-ink px-7 text-[0.8rem] text-mist xl:hidden transition-colors duration-300 ease-out hover:bg-water-deep"
						>
							Comenzar el descenso
							<ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
						</Link>
						{!listening ? (
							<button
								type="button"
								onClick={() => setListening(true)}
								className="inline-flex h-14 items-center gap-3 border border-ink/50 px-6 text-[0.95rem] font-semibold tracking-wide text-ink transition-colors duration-300 ease-out hover:border-ink hover:bg-mist-deep"
							>
								<Volume2 className="h-4 w-4" />
								Escuchar al oso guía
							</button>
						) : (
							<AudioPlayer audioFileName="intro.mp3" autoPlay className="w-full max-w-sm" />
						)}
					</div>
				</div>

				{/* Móvil: la cumbre recortada, en el flujo */}
				<div className="relative mt-10 md:hidden">
					<p className="tabular flex items-center gap-3 px-4 text-xs font-semibold" aria-label="Del páramo a la ciudad: de 4.290 a 959 metros">
						<span>4.290 m</span>
						<span className="contour flex-1 text-ink/60" aria-hidden />
						<span>959 m</span>
					</p>
					<div
						className="mt-2"
						style={{ background: "linear-gradient(transparent 92%, var(--slope-3) 92%)" }}
					>
						<ParamoProfile compact className="block h-auto w-full" />
					</div>
					<p className="-mt-[2px] bg-slope-3 px-4 pb-10 pt-3 pr-20 font-serif text-xl italic leading-snug text-on-slope">
						Esta agua llega a Bucaramanga, Cúcuta, Pamplona y 45 municipios más.
					</p>
				</div>

				{/* Escritorio: el corte completo anclado al pie de la primera vista */}
				<div
					aria-hidden={false}
					className="absolute inset-x-0 bottom-0 hidden md:block"
					style={{ height: "min(38.9vw, 64svh)" }}
				>
					<ParamoProfile className="block h-full w-full" />
					<p className="absolute bottom-5 left-40 max-w-[36rem] font-serif text-2xl italic leading-snug text-on-slope lg:left-48">
						Esta agua llega a Bucaramanga, Cúcuta, Pamplona y 45 municipios más.
					</p>
				</div>
			</section>

			{/* Plano del museo */}
			<section className="on-dark bg-slope-3 text-on-slope" aria-labelledby="plano">
				<div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
					<h2 id="plano" className="font-display text-4xl md:text-5xl">
						Plano del museo
					</h2>
					<p className="mt-3 max-w-xl text-on-slope-soft">
						Tres salas. Puedes recorrerlas en orden o entrar directo a la que te
						interese.
					</p>
					<ul className="mt-12 border-t border-on-slope/30">
						{salas.map((s) => (
							<li key={s.href} className="border-b border-on-slope/30">
								<Link
									href={s.href}
									className="group grid gap-2 py-8 md:grid-cols-[minmax(0,22rem)_1fr_auto] md:items-baseline md:gap-10"
								>
									<span className="font-display text-3xl transition-colors duration-300 ease-out group-hover:text-water-pale md:text-4xl">
										{s.name}
									</span>
									<span className="max-w-[38rem] leading-relaxed text-on-slope-soft">
										{s.text}
									</span>
									<ArrowRight className="hidden h-6 w-6 transition-transform duration-300 ease-out group-hover:translate-x-1 md:block" />
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>

			<Footer />
		</main>
	);
}
