"use client";

import { useState } from "react";
import PlateImage from "@/components/paramo/plate-image";
import ModelViewer from "./model-viewer";

interface SpeciesCarouselProps {
	modelUrl: string;
	imageUrl?: string | null;
	commonName: string;
	credit?: string | null;
}

type View = "model" | "photo";

/** Vitrina del espécimen: modelo 3D y fotografía de referencia como dos vistas de la misma lámina. */
export default function SpeciesCarousel({
	modelUrl,
	imageUrl,
	commonName,
	credit,
}: SpeciesCarouselProps) {
	const views: { id: View; label: string }[] = [
		{ id: "model", label: "Modelo 3D" },
		...(imageUrl ? [{ id: "photo" as View, label: "Fotografía" }] : []),
	];
	const [view, setView] = useState<View>("model");

	return (
		<div className="flex h-full flex-col">
			{views.length > 1 && (
				<div role="tablist" aria-label="Vista del espécimen" className="flex gap-6 border-b border-ink/30">
					{views.map((v) => (
						<button
							key={v.id}
							type="button"
							role="tab"
							aria-selected={view === v.id}
							onClick={() => setView(v.id)}
							className={`label relative -mb-px py-3 transition-colors duration-300 ${
								view === v.id ? "border-b-2 border-water-deep text-ink" : "text-ink-soft hover:text-ink"
							}`}
						>
							{v.label}
						</button>
					))}
				</div>
			)}

			<div
				className="relative mt-3 min-h-0 flex-1 border border-ink/30"
				style={{
					background:
						"repeating-linear-gradient(0deg, transparent 0 47px, rgba(30,45,41,0.12) 47px 48px), var(--mist-deep)",
				}}
			>
				<div className={`absolute inset-0 ${view === "model" ? "" : "invisible"}`} role="tabpanel">
					<ModelViewer modelUrl={modelUrl} />
				</div>
				{imageUrl && (
					<div className={`absolute inset-0 p-3 ${view === "photo" ? "" : "invisible"}`} role="tabpanel">
						<PlateImage
							src={imageUrl}
							alt={`${commonName}, fotografía de referencia`}
							caption={commonName}
							className="h-full w-full object-contain"
						/>
					</div>
				)}
			</div>
			{credit && view === "photo" && <p className="mt-2 text-xs text-ink-soft">{credit}</p>}
		</div>
	);
}
