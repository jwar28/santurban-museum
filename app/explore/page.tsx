import SpeciesList from "@/components/species/species-list";
import AudioPlayer from "@/components/ui/audio-player";
import Footer from "@/components/ui/footer";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Explorar Especies",
	description:
		"Descubre todas las especies del páramo de Santurbán. Explora nuestra colección de flora y fauna con modelos 3D interactivos, información detallada y datos sobre conservación.",
	openGraph: {
		title: "Explorar Especies - Museo Virtual Santurbán",
		description:
			"Descubre todas las especies del páramo de Santurbán con modelos 3D interactivos.",
	},
};

function posterUrl(row: SpeciesRow) {
	// 1) Prioriza columna image_url si existe
	if (row.image_url) return row.image_url;

	// 2) Deriva de glb_reference => /storage/v1/object/public/species/<nombre>.jpg
	if (row.glb_reference) {
		const base = row.glb_reference.replace(/\.(glb|gltf)$/i, ".jpg");
		return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/species/${base}`;
	}

	// 3) Fallback
	return "/images/placeholder.jpg";
}

export default async function ExplorePage() {
	const supabase = await createClient();

	// Fetch ALL data for each species (not just summary fields)
	const { data, error } = await supabase
		.from("species")
		.select("*")
		.order("common_name", { ascending: true });

	if (error) {
		console.error(error);
		return (
			<main className="min-h-screen bg-mist px-4 pb-24 pt-32 text-ink md:px-12">
				<h1 className="font-display text-5xl">La colección</h1>
				<p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
					No pudimos traer las especies en este momento. Revisa tu conexión y vuelve a
					cargar la página.
				</p>
			</main>
		);
	}

	const rows = (data ?? []) as SpeciesRow[];
	const rowsWithPoster = rows.map((r) => ({ ...r, poster: posterUrl(r) }));

	const faunaCount = rows.filter((r) => r.type?.toLowerCase() === "fauna").length;
	const floraCount = rows.filter((r) => r.type?.toLowerCase() === "flora").length;

	return (
		<main className="min-h-screen bg-mist text-ink">
			<section className="mx-auto max-w-[1500px] px-4 pb-20 pt-28 md:px-8 md:pt-32">
				<div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-end">
					<div>
						<h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92]">La colección</h1>
						<p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
							Especies del Páramo de Santurbán. Entra a cualquier lámina para girar su
							modelo 3D y conocer su estado de conservación.
						</p>
					</div>
					<aside className="border-t-2 border-ink pt-4">
						<h2 className="font-serif text-lg font-bold">¿Qué es una especie endémica?</h2>
						<p className="mt-2 text-sm leading-relaxed text-ink-soft">
							Una especie que solo existe de forma natural en una región del mundo. El
							páramo alberga 293 especies de fauna y 457 de plantas; aquí hay{" "}
							<span className="tabular font-semibold text-ink">{faunaCount}</span> de fauna y{" "}
							<span className="tabular font-semibold text-ink">{floraCount}</span> de flora,
							y la colección sigue creciendo.
						</p>
					</aside>
				</div>

				<div className="mt-16">
					<SpeciesList rows={rowsWithPoster} />
				</div>
			</section>

			<Footer />

			<div className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 md:bottom-[5.25rem] md:left-auto md:right-6 md:translate-x-0">
				<AudioPlayer audioFileName="explora.mp3" />
			</div>
		</main>
	);
}
