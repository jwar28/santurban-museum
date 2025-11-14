"use client";

import SpeciesCarousel from "@/components/species/species-carousel";
import AudioPlayer from "@/components/ui/audio-player";
import BackButton from "@/components/ui/back-button";
import type { SpeciesRow } from "@/lib/types";

interface SpeciesContentProps {
	initialSpecies: SpeciesRow;
	modelUrl: string;
	audioFileName: string;
}

export default function SpeciesContent({
	initialSpecies,
	modelUrl,
	audioFileName,
}: SpeciesContentProps) {
	const species = initialSpecies;

	return (
		<main className="min-h-screen lg:h-screen bg-[#0b1210] text-white pt-16 lg:overflow-hidden pb-28 lg:pb-0">
			<div className="max-w-[1600px] mx-auto p-4 md:p-6 h-full flex flex-col">
				{/* Back Button */}
				<BackButton />

				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6 w-full flex-1 lg:overflow-hidden">
					{/* Left Panel - Carousel (3D Model & Reference Image) */}
					<div className="bg-[#0f1f1a]/50 rounded-lg border border-emerald-500/10 p-6 overflow-hidden h-[50vh] lg:h-full">
						<SpeciesCarousel
							modelUrl={modelUrl}
							imageUrl={species.image_url}
							commonName={species.common_name}
						/>
					</div>

					{/* Right Panel - Species Information */}
					<div className="bg-[#0f1f1a]/50 rounded-lg border border-emerald-500/10 p-6 overflow-y-auto lg:h-full">
						{/* Header Section - Name, Type, and Conservation Status */}
						<div className="mb-6">
							<div className="flex flex-wrap items-center gap-3 mb-3">
								<span className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider">
									{species.type || "N/A"}
								</span>
								<span className="text-gray-500">•</span>
								<div className="flex items-center gap-1.5">
									<div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
									<span className="text-gray-400 text-[10px] uppercase tracking-wider">
										{species.conservation_status || "N/A"}
									</span>
								</div>
							</div>
							<h1 className="text-3xl md:text-4xl font-light text-white mb-2">
								{species.common_name}
							</h1>
							<p className="text-gray-400 text-sm italic">
								{species.scientific_name}
							</p>
						</div>

						{/* Description */}
						{species.description && (
							<div className="mb-6">
								<h2 className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider mb-2">
									Descripción
								</h2>
								<p className="text-gray-300/90 leading-relaxed text-sm">
									{species.description}
								</p>
							</div>
						)}

						{/* Ecological Importance */}
						{species.ecological_importance && (
							<div className="mb-6">
								<h2 className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider mb-2">
									Importancia Ecológica
								</h2>
								<p className="text-gray-300/90 leading-relaxed text-sm">
									{species.ecological_importance}
								</p>
							</div>
						)}

						{/* Threats */}
						{species.threats && (
							<div className="mb-6">
								<h2 className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider mb-2">
									Amenazas
								</h2>
								<p className="text-gray-300/90 leading-relaxed text-sm">
									{species.threats}
								</p>
							</div>
						)}

						{/* Adaptations */}
						{species.adaptations && (
							<div className="mb-6">
								<h2 className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider mb-2">
									Adaptaciones
								</h2>
								<p className="text-gray-300/90 leading-relaxed text-sm">
									{species.adaptations}
								</p>
							</div>
						)}

						{/* Characteristics */}
						{species.characteristics && (
							<div className="mb-6">
								<h2 className="text-emerald-400/80 text-[10px] font-medium uppercase tracking-wider mb-2">
									Características
								</h2>
								<p className="text-gray-300/90 leading-relaxed text-sm">
									{species.characteristics}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Audio Player - Fixed Position, centered on mobile */}
			{audioFileName && (
				<div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40">
					<AudioPlayer audioFileName={audioFileName} autoPlay={false} />
				</div>
			)}
		</main>
	);
}
