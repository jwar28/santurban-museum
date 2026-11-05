"use client";

import { useState } from "react";

/**
 * Fotografía de lámina. Si la imagen no carga, la lámina queda en niebla con su
 * nombre en itálica, en vez del ícono roto del navegador.
 */
export default function PlateImage({
	src,
	alt,
	caption,
	className = "",
	loading = "lazy",
}: {
	src: string;
	alt: string;
	caption?: string;
	className?: string;
	loading?: "lazy" | "eager";
}) {
	const [failed, setFailed] = useState(false);

	if (failed || !src) {
		return (
			<div
				role="img"
				aria-label={alt}
				className={`flex items-center justify-center bg-mist px-6 text-center ${className}`}
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent 0 23px, rgb(var(--ink-rgb) / 0.08) 23px 24px)",
				}}
			>
				<span className="font-serif text-lg italic text-ink-soft">{caption ?? alt}</span>
			</div>
		);
	}

	return (
		// biome-ignore lint/performance/noImgElement: imágenes remotas de Supabase y fotos CC servidas tal cual
		<img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} className={className} />
	);
}
