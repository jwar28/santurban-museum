"use client";

import { Marquee } from "@/components/ui/marquee";
import { ParamoImageCard } from "@/components/ui/paramo-image-card";
import { paramoImages } from "@/data/marquee-data";
import { useEffect, useState } from "react";

export function ParamoGallery() {
	const [isMobile, setIsMobile] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
		setIsLoaded(true);

		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// En móvil mostramos menos imágenes para mejor rendimiento
	const imagesToShow = isMobile ? paramoImages.slice(0, 4) : paramoImages;

	return (
		<section className="w-full py-12 overflow-hidden">
			<div className="mb-8 text-center">
				<h2 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
					Galería del Páramo
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Descubre la belleza natural del Páramo de Santurbán
				</p>
			</div>

			<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
				{!isLoaded ? (
					<div className="flex gap-4 px-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="w-[350px] md:w-[400px] h-64 md:h-72 rounded-2xl bg-white/5 animate-pulse"
							/>
						))}
					</div>
				) : (
					<>
						<Marquee pauseOnHover className="[--duration:80s] [--gap:1rem]">
							{imagesToShow.map((image) => (
								<ParamoImageCard key={image.id} image={image} />
							))}
						</Marquee>
						{/* Gradientes laterales para efecto fade */}
						<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0b1210] to-transparent" />
						<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0b1210] to-transparent" />
					</>
				)}
			</div>
		</section>
	);
}
