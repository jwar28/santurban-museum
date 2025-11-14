import SpeciesContent from "@/components/species/species-content";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import type { Metadata } from "next";
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
		<SpeciesContent
			initialSpecies={species}
			modelUrl={modelUrl}
			audioFileName={audioFileName}
		/>
	);
}
