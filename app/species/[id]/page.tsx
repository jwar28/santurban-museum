import ModelViewer from "@/components/species/model-viewer";
import BackButton from "@/components/ui/back-button";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import { notFound } from "next/navigation";

interface SpeciesPageProps {
	params: Promise<{ id: string }>;
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
						{/* Common Name */}
						<div className="mb-4 md:mb-6">
							<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
								NOMBRE COMÚN
							</p>
							<h1 className="text-2xl md:text-4xl font-bold text-white">
								{species.common_name}
							</h1>
							<p className="text-gray-400 italic mt-1 md:mt-2 text-base md:text-lg">
								{species.scientific_name}
							</p>
						</div>

						{/* Type and Conservation Status */}
						<div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
							<div>
								<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
									TIPO
								</p>
								<p className="text-white text-sm md:text-base">
									{species.type || "N/A"}
								</p>
							</div>
							<div>
								<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
									ESTADO DE CONSERVACIÓN
								</p>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-emerald-500"></div>
									<span className="text-emerald-400 text-xs md:text-sm">
										{species.conservation_status || "N/A"}
									</span>
								</div>
							</div>
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
