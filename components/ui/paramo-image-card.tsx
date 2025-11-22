"use client";

import type { ParamoImage } from "@/data/marquee-data";
import Image from "next/image";
import { useState } from "react";

interface ParamoImageCardProps {
	image: ParamoImage;
}

export function ParamoImageCard({ image }: ParamoImageCardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	return (
		<div className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 transition-all hover:ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,.45)] w-[350px] md:w-[400px]">
			{/* Image Container */}
			<div className="relative h-64 md:h-72 bg-gradient-to-br from-emerald-900/20 to-emerald-950/20">
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
					</div>
				)}
				{!hasError ? (
					<Image
						src={image.imageUrl}
						alt={image.alt}
						fill
						unoptimized
						className={`object-cover filter transition-all duration-300 ${
							isLoading ? "opacity-0" : "opacity-100"
						}`}
						sizes="(max-width: 768px) 350px, 400px"
						onLoad={() => setIsLoading(false)}
						onError={() => {
							setIsLoading(false);
							setHasError(true);
						}}
						loading="lazy"
					/>
				) : (
					<div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
						Error al cargar imagen
					</div>
				)}
			</div>

			{/* Photo Credits */}
			<div className="absolute top-0 right-0 bg-black/70 px-3 py-1 text-[10px] text-gray-200/90 backdrop-blur-sm z-10 rounded-bl-lg">
				{image.credits}
			</div>

			{/* Location Name at bottom */}
			<div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
				<h3 className="text-white font-extrabold text-xl md:text-2xl drop-shadow-lg">
					{image.locationName}
				</h3>
			</div>
		</div>
	);
}
