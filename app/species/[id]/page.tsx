import ModelViewer from "@/components/species/model-viewer";
import { createClient } from "@/lib/supabase/server";
import type { SpeciesRow } from "@/lib/types";
import Link from "next/link";
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
		<main className="min-h-screen bg-[#0b1210] text-white">
			{/* Header */}
			<header className="sticky top-0 z-20 backdrop-blur bg-[#0b1210]/80 border-b border-emerald-500/20">
				<div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center gap-3">
					<div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/90">
						<span className="text-lg">🏛️</span>
					</div>
					<span className="font-semibold text-sm">
						Virtual Museum: Santurbán Páramo
					</span>

					<Link
						href="/explore"
						className="ml-auto text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-2"
					>
						← Volver al museo
					</Link>
				</div>
			</header>

			<div className="max-w-[1600px] mx-auto p-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
					{/* Left Panel - 3D Model */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8 overflow-hidden">
						<div className="w-full h-full flex items-center justify-center">
							<ModelViewer modelUrl={modelUrl} />
						</div>
					</div>

					{/* Right Panel - Species Information */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8 overflow-y-auto">
						{/* Common Name */}
						<div className="mb-6">
							<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
								NOMBRE COMÚN
							</p>
							<h1 className="text-4xl font-bold text-white">
								{species.common_name}
							</h1>
							<p className="text-gray-400 italic mt-2 text-lg">
								{species.scientific_name}
							</p>
						</div>

						{/* Type and Conservation Status */}
						<div className="grid grid-cols-2 gap-4 mb-8">
							<div>
								<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
									TIPO
								</p>
								<p className="text-white">{species.type || "N/A"}</p>
							</div>
							<div>
								<p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
									ESTADO DE CONSERVACIÓN
								</p>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-emerald-500"></div>
									<span className="text-emerald-400 text-sm">
										{species.conservation_status || "N/A"}
									</span>
								</div>
							</div>
						</div>

						{/* Description */}
						{species.description && (
							<div className="mb-6">
								<h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
									Descripción
								</h2>
								<p className="text-gray-300 leading-relaxed">
									{species.description}
								</p>
							</div>
						)}

						{/* Ecological Importance */}
						{species.ecological_importance && (
							<div className="mb-6">
								<h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
									Importancia Ecológica
								</h2>
								<p className="text-gray-300 leading-relaxed">
									{species.ecological_importance}
								</p>
							</div>
						)}

						{/* Threats */}
						{species.threats && (
							<div className="mb-6">
								<h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
									Amenazas
								</h2>
								<p className="text-gray-300 leading-relaxed">
									{species.threats}
								</p>
							</div>
						)}

						{/* Adaptations */}
						{species.adaptations && (
							<div className="mb-6">
								<h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
									Adaptaciones y Características
								</h2>
								<p className="text-gray-300 leading-relaxed">
									{species.adaptations}
								</p>
							</div>
						)}

						{/* Characteristics */}
						{species.characteristics && (
							<div className="mb-6">
								<h2 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">
									Características
								</h2>
								<p className="text-gray-300 leading-relaxed">
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
