import ModelViewer from "@/components/species/model-viewer";
import BackButton from "@/components/ui/back-button";
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

	return (
		<main className="min-h-screen lg:h-screen bg-[#0b1210] text-white pt-16 lg:overflow-hidden">
			<div className="max-w-[1600px] mx-auto p-4 md:p-6 h-full flex flex-col">
				{/* Back Button - Mobile Only */}
				<BackButton />

				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6 w-full flex-1 items-center">
					{/* Left Panel - 3D Model */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-4 md:p-8 overflow-hidden h-[30vh] lg:h-[85vh]">
						<div className="w-full h-full flex items-center justify-center">
							<ModelViewer modelUrl={modelUrl} />
						</div>
					</div>

					{/* Right Panel - Species Information */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-4 md:p-8 lg:overflow-y-auto lg:h-[85vh]">
						{/* Header Section - Name, Type, and Conservation Status */}
						<div className="mb-6 md:mb-8">
							<div className="flex flex-wrap items-center gap-4 md:gap-6 mb-2">
								<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
									NOMBRE COMÚN
								</p>
								<div className="flex items-center gap-2 text-xs">
									<span className="text-emerald-400 font-semibold uppercase tracking-wider">
										TIPO:
									</span>
									<span className="text-white">{species.type || "N/A"}</span>
								</div>
								<div className="flex items-center gap-2 text-xs">
									<span className="text-emerald-400 font-semibold uppercase tracking-wider">
										ESTADO:
									</span>
									<div className="flex items-center gap-2">
										<div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
										<span className="text-white">
											{species.conservation_status || "N/A"}
										</span>
									</div>
								</div>
							</div>
							<h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
								{species.common_name}
							</h1>
							<p className="text-gray-400 italic mb-4 text-base md:text-lg">
								{species.scientific_name}
							</p>
						</div>

						{/* Description */}
						{species.description && (
							<div className="mb-4 md:mb-6">
								<h2 className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
									Descripción
								</h2>
								<p className="text-gray-300 leading-relaxed text-sm md:text-base">
									{species.description}
								</p>
							</div>
						)}

						{/* Ecological Importance */}
						{species.ecological_importance && (
							<div className="mb-4 md:mb-6">
								<h2 className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
									Importancia Ecológica
								</h2>
								<p className="text-gray-300 leading-relaxed text-sm md:text-base">
									{species.ecological_importance}
								</p>
							</div>
						)}

						{/* Threats */}
						{species.threats && (
							<div className="mb-4 md:mb-6">
								<h2 className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
									Amenazas
								</h2>
								<p className="text-gray-300 leading-relaxed text-sm md:text-base">
									{species.threats}
								</p>
							</div>
						)}

						{/* Adaptations */}
						{species.adaptations && (
							<div className="mb-4 md:mb-6">
								<h2 className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
									Adaptaciones y Características
								</h2>
								<p className="text-gray-300 leading-relaxed text-sm md:text-base">
									{species.adaptations}
								</p>
							</div>
						)}

						{/* Characteristics */}
						{species.characteristics && (
							<div className="mb-4 md:mb-6">
								<h2 className="text-emerald-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3">
									Características
								</h2>
								<p className="text-gray-300 leading-relaxed text-sm md:text-base">
									{species.characteristics}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
