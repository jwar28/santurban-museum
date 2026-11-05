"use client";

import SpeciesCarousel from "@/components/species/species-carousel";
import AudioPlayer from "@/components/ui/audio-player";
import type { SpeciesRow } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SpeciesContentProps {
	initialSpecies: SpeciesRow;
	modelUrl: string;
	audioFileName: string;
	previousId: number;
	nextId: number;
	total: number;
}

function Entry({ title, text }: { title: string; text?: string | null }) {
	if (!text) return null;
	return (
		<section className="border-t border-ink/40 pt-4">
			<h2 className="label text-ink-soft">{title}</h2>
			<p className="mt-3 leading-relaxed">{text}</p>
		</section>
	);
}

export default function SpeciesContent({
	initialSpecies: sp,
	modelUrl,
	audioFileName,
	previousId,
	nextId,
	total,
}: SpeciesContentProps) {
	const credit =
		sp.pic_owner && sp.license_type ? `Foto: ${sp.pic_owner}, licencia ${sp.license_type}` : null;
	const number = String(sp.id).padStart(2, "0");

	return (
		<main className="min-h-screen bg-mist pb-32 pt-14 text-ink lg:pb-16">
			{/* Cabecera de la lámina */}
			<nav
				aria-label="Láminas de la colección"
				className="flex items-center justify-between border-b border-ink/25 px-4 py-3 text-sm md:px-8"
			>
				<Link href="/explore" className="inline-flex items-center gap-2 font-semibold hover:text-water-deep">
					<ArrowLeft className="h-4 w-4" />
					La colección
				</Link>
				<span className="tabular hidden text-ink-soft sm:inline">
					Lámina {number} de {String(total).padStart(2, "0")}
				</span>
				<span className="flex items-center gap-1">
					<Link
						href={`/species/${previousId}?direction=prev`}
						className="inline-flex h-10 items-center gap-2 px-3 font-semibold hover:bg-mist-deep"
						aria-label="Lámina anterior"
					>
						<ArrowLeft className="h-4 w-4" />
						<span className="hidden md:inline">Anterior</span>
					</Link>
					<Link
						href={`/species/${nextId}?direction=next`}
						className="inline-flex h-10 items-center gap-2 px-3 font-semibold hover:bg-mist-deep"
						aria-label="Lámina siguiente"
					>
						<span className="hidden md:inline">Siguiente</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
				</span>
			</nav>

			<div className="mx-auto max-w-[1500px] px-4 md:px-8">
				<header className="grid gap-4 pb-8 pt-10 md:grid-cols-[1fr_auto] md:items-end md:pt-14">
					<div>
						<h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95]">{sp.common_name}</h1>
						<p className="mt-3 font-serif text-2xl italic text-water-deep">{sp.scientific_name}</p>
					</div>
					<dl className="flex gap-8 text-sm md:text-right">
						{sp.type && (
							<div>
								<dt className="text-ink-soft">Grupo</dt>
								<dd className="mt-1 font-semibold capitalize">{sp.type}</dd>
							</div>
						)}
						{sp.conservation_status && (
							<div>
								<dt className="text-ink-soft">Estado de conservación</dt>
								<dd className="mt-1 font-semibold">{sp.conservation_status}</dd>
							</div>
						)}
					</dl>
				</header>

				{/* Tableau: columnas de datos a ambos lados del espécimen */}
				<div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_minmax(0,20rem)] lg:gap-10">
					<div className="h-[62vh] min-h-[22rem] lg:order-2 lg:h-[calc(100svh-17rem)] lg:min-h-[32rem]">
						<SpeciesCarousel
							modelUrl={modelUrl}
							imageUrl={sp.image_url}
							commonName={sp.common_name}
							credit={credit}
						/>
					</div>
					<div className="space-y-8 lg:order-1">
						<Entry title="Descripción" text={sp.description} />
						<Entry title="Características" text={sp.characteristics} />
					</div>
					<div className="space-y-8 lg:order-3">
						<Entry title="Importancia ecológica" text={sp.ecological_importance} />
						<Entry title="Adaptaciones" text={sp.adaptations} />
						<Entry title="Amenazas" text={sp.threats} />
					</div>
				</div>
			</div>

			{audioFileName && (
				<div className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 md:bottom-[5.25rem] md:left-auto md:right-6 md:translate-x-0">
					<AudioPlayer audioFileName={audioFileName} />
				</div>
			)}
		</main>
	);
}
