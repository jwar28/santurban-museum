import SpeciesList from "@/components/species/species-list";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import Link from "next/link";

export const metadata = { title: "Explorar — Museo Virtual: Santurbán" };

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
		.select("id, common_name, scientific_name, type, image_url, glb_reference")
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

	return (
		<main className="min-h-screen bg-[#0b1210] text-white">
			{/* Navbar simple */}
			<nav className="sticky top-0 z-20 backdrop-blur bg-white/[0.02] ring-1 ring-white/10">
				<div className="mx-auto max-w-7xl px-6 h-14 flex items-center gap-3">
					<div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/90">
						<span className="h-3 w-3 rotate-45 bg-emerald-900 rounded-[2px]" />
					</div>
					<span className="font-semibold">
						Museo Virtual: Páramo de Santurbán
					</span>
					<div className="ml-auto">
						<Link href="/" className="text-white/80 hover:text-white">
							Inicio
						</Link>
					</div>
				</div>
			</nav>

			<section className="mx-auto max-w-7xl px-6 py-12">
				<h1 className="text-3xl md:text-4xl font-extrabold">
					Explorar Especies Endémicas
				</h1>
				<p className="mt-4 max-w-3xl text-white/70">
					Sumérgete en la biodiversidad única del Páramo de Santurbán. Haz clic
					en cualquier especie para descubrir su modelo 3D interactivo y conocer
					sus fascinantes características y estado de conservación.
				</p>

				<div className="mt-8">
					<SpeciesList rows={rowsWithPoster} />
				</div>
			</section>
		</main>
	);
}
