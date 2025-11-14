import SpeciesList from "@/components/species/species-list";
import SpeciesStoreInitializer from "@/components/species/species-store-initializer";
import AudioPlayer from "@/components/ui/audio-player";
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
			<main className="min-h-screen bg-[#0b1210] text-white p-10">
				<p>Ups, no pude cargar las especies.</p>
			</main>
		);
	}

	const rows = (data ?? []) as SpeciesRow[];

	// Compute a poster URL for each row on the server so the client component
	// doesn't need to re-derive it or access env vars.
	const rowsWithPoster = rows.map((r) => ({ ...r, poster: posterUrl(r) }));

	// Contar fauna y flora
	const faunaCount = rows.filter(
		(r) => r.type?.toLowerCase() === "fauna",
	).length;
	const floraCount = rows.filter(
		(r) => r.type?.toLowerCase() === "flora",
	).length;

	return (
		<main className="min-h-screen bg-[#0b1210] text-white pb-20 md:pb-0">
			{/* Initialize Zustand store with all species data */}
			<SpeciesStoreInitializer species={rows} />

			<section className="mx-auto max-w-7xl px-6 py-16 mt-12">
				<h1 className="text-2xl md:text-3xl font-bold text-gray-100">
					Explorar Especies Endémicas
				</h1>
				<p className="mt-4 max-w-3xl text-sm text-gray-400">
					Sumérgete en la biodiversidad única del Páramo de Santurbán. Haz clic
					en cualquier especie para descubrir su modelo 3D interactivo y conocer
					sus fascinantes características y estado de conservación.
				</p>

				{/* Información sobre especies endémicas */}
				<div className="mt-8 p-8 bg-white/5 rounded-xl border border-white/10">
					<h2 className="text-xl font-bold mb-4 text-gray-100">
						¿Qué es una especie endémica?
					</h2>
					<p className="text-sm text-gray-400 mb-6">
						Las especies endémicas son aquellas que solo se encuentran en una
						región geográfica específica y no existen naturalmente en ningún
						otro lugar del mundo. El Páramo de Santurbán alberga una riqueza
						única de biodiversidad.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-white/5 p-6 rounded-xl border border-white/10">
							<div className="text-emerald-400 font-semibold text-xs mb-2 uppercase tracking-wide">
								Fauna
							</div>
							<div className="text-2xl font-bold text-gray-100">
								{faunaCount}/293
							</div>
							<div className="text-gray-400 text-xs mt-1">
								especies documentadas
							</div>
						</div>
						<div className="bg-white/5 p-6 rounded-xl border border-white/10">
							<div className="text-emerald-400 font-semibold text-xs mb-2 uppercase tracking-wide">
								Flora
							</div>
							<div className="text-2xl font-bold text-gray-100">
								{floraCount}/457
							</div>
							<div className="text-gray-400 text-xs mt-1">
								variedades de plantas
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12">
					<SpeciesList rows={rowsWithPoster} />
				</div>
			</section>

			{/* Audio Player - Fixed Position, centered on mobile */}
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40">
				<AudioPlayer audioFileName="explora.mp3" autoPlay={false} />
			</div>
		</main>
	);
}
