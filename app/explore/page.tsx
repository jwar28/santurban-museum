import SpeciesList from "@/components/species/species-list";
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

	const { data, error } = await supabase
		.from("species")
		.select(
			"id, common_name, scientific_name, type, image_url, glb_reference, pic_owner, license_type",
		)
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
			<section className="mx-auto max-w-7xl px-6 py-12 mt-12">
				<h1 className="text-3xl md:text-4xl font-extrabold">
					Explorar Especies Endémicas
				</h1>
				<p className="mt-4 max-w-3xl text-white/70">
					Sumérgete en la biodiversidad única del Páramo de Santurbán. Haz clic
					en cualquier especie para descubrir su modelo 3D interactivo y conocer
					sus fascinantes características y estado de conservación.
				</p>

				{/* Información sobre especies endémicas */}
				<div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
					<h2 className="text-xl font-bold mb-3">
						¿Qué es una especie endémica?
					</h2>
					<p className="text-white/80 mb-4">
						Las especies endémicas son aquellas que solo se encuentran en una
						región geográfica específica y no existen naturalmente en ningún
						otro lugar del mundo. El Páramo de Santurbán alberga una riqueza
						única de biodiversidad.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-emerald-950/30 p-4 rounded-lg border border-emerald-800/30">
							<div className="text-emerald-400 font-semibold text-sm mb-1">
								Fauna
							</div>
							<div className="text-2xl font-bold">{faunaCount}/293</div>
							<div className="text-white/60 text-sm">especies documentadas</div>
						</div>
						<div className="bg-green-950/30 p-4 rounded-lg border border-green-800/30">
							<div className="text-green-400 font-semibold text-sm mb-1">
								Flora
							</div>
							<div className="text-2xl font-bold">{floraCount}/457</div>
							<div className="text-white/60 text-sm">variedades de plantas</div>
						</div>
					</div>
				</div>

				<div className="mt-8">
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
