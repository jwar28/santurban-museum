import SlideTransition from "@/components/animations/slide-transition";
import SpeciesContent from "@/components/species/species-content";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SpeciesPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: SpeciesPageProps): Promise<Metadata> {
	const { id } = await params;
	const supabase = await createClient();

	const { data } = await supabase
		.from("species")
		.select("*")
		.eq("id", id)
		.single();

	if (!data) {
		return {
			title: "Especie no encontrada",
		};
	}

	const species = data as SpeciesRow;
	const description =
		species.description ||
		`Conoce más sobre ${species.common_name} (${species.scientific_name}), una especie del páramo de Santurbán.`;

	return {
		title: `${species.common_name} (${species.scientific_name})`,
		description: description.slice(0, 160),
		keywords: [
			species.common_name,
			species.scientific_name,
			species.type || "",
			"Santurbán",
			"páramo",
			"biodiversidad",
			"Colombia",
		],
		openGraph: {
			title: `${species.common_name} - ${species.scientific_name}`,
			description: description.slice(0, 160),
			type: "article",
			images: species.image_url ? [species.image_url] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: `${species.common_name} - Museo Virtual Santurbán`,
			description: description.slice(0, 160),
			images: species.image_url ? [species.image_url] : [],
		},
	};
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
	const { id } = await params;
	const supabase = await createClient();

	// Fetch species data
	const { data, error } = await supabase
		.from("species")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		notFound();
	}

	const species = data as SpeciesRow;

	// Get total species count for navigation
	const { count } = await supabase
		.from("species")
		.select("*", { count: "exact", head: true });

	const totalSpecies = count || 20;
	const currentId = Number.parseInt(id, 10);

	// Calculate previous and next IDs with circular navigation
	const previousId = currentId === 1 ? totalSpecies : currentId - 1;
	const nextId = currentId === totalSpecies ? 1 : currentId + 1;

	// Generate public URL for the GLB model
	let modelUrl = "";
	if (species.glb_reference) {
		const { data: urlData } = supabase.storage
			.from("objects")
			.getPublicUrl(species.glb_reference);
		modelUrl = urlData.publicUrl;
	}

	// Generate audio filename from GLB reference
	let audioFileName = "";
	if (species.glb_reference) {
		// Replace .glb or .gltf extension with .mp3
		audioFileName = species.glb_reference.replace(/\.(glb|gltf)$/i, ".mp3");
	}

	return (
		<div className="relative overflow-x-hidden">
			{/* Previous Button */}
			<Link
				href={`/species/${previousId}?direction=prev`}
				className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-primary/80 hover:bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
				aria-label="Especie anterior"
			>
				<ChevronLeft className="w-6 h-6" />
			</Link>

			{/* Next Button */}
			<Link
				href={`/species/${nextId}?direction=next`}
				className="fixed right-4 top-1/2 -translate-y-1/2 z-50 bg-primary/80 hover:bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
				aria-label="Siguiente especie"
			>
				<ChevronRight className="w-6 h-6" />
			</Link>

			<SlideTransition>
				<SpeciesContent
					initialSpecies={species}
					modelUrl={modelUrl}
					audioFileName={audioFileName}
				/>
			</SlideTransition>
		</div>
	);
}
