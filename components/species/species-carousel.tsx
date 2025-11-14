"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ModelViewer from "./model-viewer";

interface SpeciesCarouselProps {
	modelUrl: string;
	imageUrl?: string | null;
	commonName: string;
}

export default function SpeciesCarousel({
	modelUrl,
	imageUrl,
	commonName,
}: SpeciesCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Create slides array based on available content
	const slides = [];
	if (modelUrl) {
		slides.push({ type: "model", content: modelUrl });
	}
	if (imageUrl) {
		slides.push({ type: "image", content: imageUrl });
	}

	const totalSlides = slides.length;

	// Don't show navigation if only one slide
	if (totalSlides <= 1) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				{modelUrl && <ModelViewer modelUrl={modelUrl} />}
			</div>
		);
	}

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
	};

	const currentSlide = slides[currentIndex];

	return (
		<div className="w-full h-full relative flex items-center justify-center">
			{/* Slide Content - Keep both mounted, toggle visibility */}
			<div className="w-full h-full relative">
				{/* Model Slide */}
				{modelUrl && (
					<div
						className={`w-full h-full flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${
							currentSlide.type === "model"
								? "opacity-100 z-10"
								: "opacity-0 z-0 pointer-events-none"
						}`}
					>
						<ModelViewer modelUrl={modelUrl} />
					</div>
				)}

				{/* Image Slide */}
				{imageUrl && (
					<div
						className={`w-full h-full flex items-center justify-center absolute inset-0 transition-opacity duration-300 ${
							currentSlide.type === "image"
								? "opacity-100 z-10"
								: "opacity-0 z-0 pointer-events-none"
						}`}
					>
						<img
							src={imageUrl}
							alt={`${commonName} - Imagen de referencia`}
							className="w-full h-full object-contain"
						/>
					</div>
				)}
			</div>

			{/* Navigation Buttons */}
			<button
				type="button"
				onClick={goToPrevious}
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-500/50 text-white p-2 rounded-full transition-all z-20"
				aria-label="Anterior"
			>
				<ChevronLeft size={20} />
			</button>

			<button
				type="button"
				onClick={goToNext}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-500/50 text-white p-2 rounded-full transition-all z-20"
				aria-label="Siguiente"
			>
				<ChevronRight size={20} />
			</button>

			{/* Indicators */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
				{slides.map((slide, index) => (
					<button
						key={`${slide.type}-${index}`}
						type="button"
						onClick={() => setCurrentIndex(index)}
						className={`h-1.5 rounded-full transition-all ${
							index === currentIndex
								? "w-8 bg-emerald-500"
								: "w-1.5 bg-emerald-500/30 hover:bg-emerald-500/50"
						}`}
						aria-label={`Ir a ${slide.type === "model" ? "modelo 3D" : "imagen"}`}
					/>
				))}
			</div>

			{/* Label */}
			<div className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/60 bg-black/30 px-3 py-1.5 rounded-md backdrop-blur-sm z-20">
				{currentSlide.type === "model" ? "Modelo 3D" : "Imagen de referencia"}
			</div>
		</div>
	);
}
