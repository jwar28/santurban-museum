"use client";

import { TextWithTooltips } from "@/components/santurban/text-with-tooltips";
import AudioPlayer from "@/components/ui/audio-player";
import Footer from "@/components/ui/footer";
import { ParamoGallery } from "@/components/ui/paramo-gallery";
import content from "@/data/santurban-content.json";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SanturbanPage() {
	const [heroLoaded, setHeroLoaded] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [pageReady, setPageReady] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		// Asegurar que la página se muestre después de un timeout
		const timer = setTimeout(() => {
			setPageReady(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	// Mostrar loading screen inicial
	if (!pageReady) {
		return (
			<main className="min-h-screen bg-[#0b1210] text-white flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
					<p className="text-emerald-400 text-lg">Cargando...</p>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16 pb-20 md:pb-0">
			{/* Hero Section */}
			<section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-950/30 to-[#0b1210]">
				{/* Loading indicator */}
				{!heroLoaded && (
					<div className="absolute inset-0 flex items-center justify-center bg-[#0b1210]">
						<div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
					</div>
				)}
				{/* Background image with loading state */}
				<div className="absolute inset-0">
					<Image
						src={content.hero.backgroundImage}
						alt="Páramo de Santurbán"
						fill
						priority
						unoptimized
						className={`object-cover transition-opacity duration-700 ${
							heroLoaded ? "opacity-100" : "opacity-0"
						}`}
						onLoad={() => setHeroLoaded(true)}
						sizes="100vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-[#0b1210]/70 to-[#0b1210]/85" />
				</div>
				<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
						{content.hero.title}
					</h1>
					<p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light drop-shadow-md">
						{content.hero.subtitle}
					</p>
				</div>
			</section>
			{/* Introducción */}
			<section className="max-w-4xl mx-auto px-6 py-16">
				<p className="text-xl md:text-2xl text-gray-300 text-center leading-relaxed font-light">
					<TextWithTooltips text={content.introduction.text} />
				</p>
			</section>

			{/* Galería del Páramo */}
			<ParamoGallery />

			{/* Datos Científicos Clave */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-100">
					Datos Científicos Clave
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
					{content.keyStats.map((stat) => (
						<div
							key={stat.id}
							className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all"
						>
							<div className="text-3xl mb-3">{stat.icon}</div>
							<div className="text-2xl font-bold text-emerald-400 mb-2">
								{stat.value}
							</div>
							<p className="text-sm text-gray-400">{stat.description}</p>
						</div>
					))}
				</div>
			</section>
			{/* Información Detallada */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<div className="grid md:grid-cols-2 gap-6">
					{/* Importancia Hídrica */}
					<div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all">
						<div className="flex items-center gap-3 mb-6">
							<div className="text-3xl">
								{content.detailedInfo.waterFactory.icon}
							</div>
							<h3 className="text-xl font-bold text-blue-400">
								{content.detailedInfo.waterFactory.title}
							</h3>
						</div>
						<div className="space-y-3 text-sm text-gray-400">
							{content.detailedInfo.waterFactory.paragraphs.map((para) => (
								<p key={para.substring(0, 50)}>
									<TextWithTooltips text={para} color="blue" />
								</p>
							))}
						</div>
					</div>

					{/* Biodiversidad */}
					<div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all">
						<div className="flex items-center gap-3 mb-6">
							<div className="text-3xl">
								{content.detailedInfo.biodiversity.icon}
							</div>
							<h3 className="text-xl font-bold text-emerald-400">
								{content.detailedInfo.biodiversity.title}
							</h3>
						</div>
						<div className="space-y-3 text-sm text-gray-400">
							{content.detailedInfo.biodiversity.paragraphs.map((para) => (
								<p key={para.substring(0, 50)}>
									<TextWithTooltips text={para} color="emerald" />
								</p>
							))}
						</div>
					</div>
				</div>
			</section>
			{/* Curiosidades */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-100">
					Curiosidades del Páramo
				</h2>
				<div className="grid md:grid-cols-3 gap-4">
					{content.curiosities.map((curiosity) => (
						<div
							key={curiosity.id}
							className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all"
						>
							<div className="text-3xl mb-4">{curiosity.icon}</div>
							<h4 className="text-lg font-bold mb-3 text-emerald-400">
								{curiosity.title}
							</h4>
							<p className="text-sm text-gray-400">
								<TextWithTooltips text={curiosity.description} />
							</p>
						</div>
					))}
				</div>
			</section>
			{/* Clima del Páramo */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-100">
					{content.climate.title}
				</h2>
				<div className="bg-white/5 p-8 rounded-xl border border-white/10">
					<div className="grid md:grid-cols-2 gap-8">
						{content.climate.sections.map((section) => (
							<div key={section.title}>
								<h3 className="text-lg font-bold text-sky-400 mb-4">
									{section.title}
								</h3>
								<div className="space-y-3 text-sm text-gray-400">
									{section.paragraphs.map((para) => (
										<p key={para.substring(0, 40)}>
											<TextWithTooltips text={para} color="sky" />
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Importancia Geológica */}
			<section className="max-w-4xl mx-auto px-6 py-16">
				<div className="bg-white/5 p-8 rounded-xl border border-white/10">
					<div className="flex items-center gap-3 mb-6">
						<div className="text-3xl">{content.geology.icon}</div>
						<h3 className="text-xl font-bold text-amber-400">
							{content.geology.title}
						</h3>
					</div>
					<p className="text-sm text-gray-400 mb-4">
						<TextWithTooltips text={content.geology.intro} />
					</p>
					<ul className="space-y-2 text-sm text-gray-400">
						{content.geology.features.map((feature) => (
							<li key={feature} className="flex items-start gap-2">
								<span className="text-amber-500 mt-1.5 text-xs">●</span>
								<span>
									<TextWithTooltips text={feature} color="amber" />
								</span>
							</li>
						))}
					</ul>
				</div>
			</section>
			{/* Conservación */}
			<section className="max-w-6xl mx-auto px-6 py-16">
				<div className="bg-white/5 p-8 rounded-xl border border-white/10">
					<div className="flex items-center gap-3 mb-6">
						<div className="text-3xl">{content.conservation.icon}</div>
						<h3 className="text-xl font-bold text-red-400">
							{content.conservation.title}
						</h3>
					</div>
					<p className="text-sm text-gray-400 mb-6">
						{content.conservation.intro}
					</p>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="text-base font-semibold text-gray-200 mb-3">
								Principales Amenazas:
							</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								{content.conservation.threats.map((threat) => (
									<li key={threat} className="flex items-start gap-2">
										<span className="text-red-400 mt-1.5 text-xs">●</span>
										<span>
											<TextWithTooltips text={threat} color="red" />
										</span>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h4 className="text-base font-semibold text-gray-200 mb-3">
								Acciones de Protección:
							</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								{content.conservation.protectionActions.map((action) => (
									<li key={action} className="flex items-start gap-2">
										<span className="text-emerald-400 mt-1.5 text-xs">●</span>
										<span>{action}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
			{/* CTA */}
			<section className="max-w-4xl mx-auto px-6 py-16">
				<div className="text-center py-12 px-8 rounded-xl bg-white/5 border border-emerald-500/20">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
						{content.cta.title}
					</h2>
					<p className="text-sm text-gray-400 mb-6 max-w-xl mx-auto">
						{content.cta.description}
					</p>
					<a
						href={content.cta.buttonLink}
						className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105 text-sm"
					>
						<span>{content.cta.buttonText}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<title>Arrow icon</title>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</section>
			{/* Footer */}
			<Footer />
			{/* Audio Player - Fixed Position - Lazy load */}
			{isMounted && (
				<div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40">
					<AudioPlayer audioFileName="conservacion.mp3" autoPlay={false} />
				</div>
			)}
		</main>
	);
}
