import { TextWithTooltips } from "@/components/santurban/text-with-tooltips";
import AudioPlayer from "@/components/ui/audio-player";
import { ParamoGallery } from "@/components/ui/paramo-gallery";
import footerContent from "@/data/footer-content.json";
import content from "@/data/santurban-content.json";
import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
	title: "Páramo de Santurbán",
	description:
		"Descubre el Páramo de Santurbán: una fábrica natural de agua con 26 lagunas, hogar de especies únicas y ecosistema vital para más de 2 millones de personas. Conoce su importancia científica, biodiversidad y curiosidades.",
	openGraph: {
		title: "Páramo de Santurbán - Fábrica Natural de Agua",
		description:
			"Explora el ecosistema de páramo más importante de Colombia. 26 lagunas, biodiversidad única y agua para millones de personas.",
	},
};

export default function SanturbanPage() {
	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16 pb-20 md:pb-0">
			{/* Hero Section */}
			<section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `linear-gradient(rgba(11, 18, 16, 0.7), rgba(11, 18, 16, 0.85)), url('${content.hero.backgroundImage}')`,
					}}
				/>
				<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
						{content.hero.title}
					</h1>
					<p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light">
						{content.hero.subtitle}
					</p>
				</div>
			</section>
			{/* Introducción */}
			<section className="max-w-4xl mx-auto px-6 py-20">
				<p className="text-2xl md:text-3xl text-gray-200 text-center leading-relaxed font-light">
					<TextWithTooltips text={content.introduction.text} />
				</p>
			</section>

			{/* Galería del Páramo */}
			<ParamoGallery />

			{/* Datos Científicos Clave */}
			<section className="max-w-6xl mx-auto px-6 pb-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
					Datos Científicos Clave
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{content.keyStats.map((stat) => (
						<div
							key={stat.id}
							className={`bg-gradient-to-b from-${stat.color}-500/10 to-transparent p-6 rounded-2xl border border-${stat.color}-500/20`}
						>
							<div className="text-4xl mb-3">{stat.icon}</div>
							<div className={`text-3xl font-bold text-${stat.color}-400 mb-2`}>
								{stat.value}
							</div>
							<p className="text-gray-300">{stat.description}</p>
						</div>
					))}
				</div>
			</section>
			{/* Información Detallada */}
			<section className="max-w-6xl mx-auto px-6 pb-16">
				<div className="grid md:grid-cols-2 gap-8">
					{/* Importancia Hídrica */}
					<div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent p-8 rounded-3xl border border-blue-500/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="text-4xl">
								{content.detailedInfo.waterFactory.icon}
							</div>
							<h3 className="text-2xl font-bold text-blue-400">
								{content.detailedInfo.waterFactory.title}
							</h3>
						</div>
						<div className="space-y-3 text-gray-300">
							{content.detailedInfo.waterFactory.paragraphs.map((para) => (
								<p key={para.substring(0, 50)}>
									<TextWithTooltips text={para} color="blue" />
								</p>
							))}
						</div>
					</div>

					{/* Biodiversidad */}
					<div className="bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent p-8 rounded-3xl border border-emerald-500/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="text-4xl">
								{content.detailedInfo.biodiversity.icon}
							</div>
							<h3 className="text-2xl font-bold text-emerald-400">
								{content.detailedInfo.biodiversity.title}
							</h3>
						</div>
						<div className="space-y-3 text-gray-300">
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
			<section className="max-w-6xl mx-auto px-6 pb-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
					Curiosidades del Páramo
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					{content.curiosities.map((curiosity) => (
						<div
							key={curiosity.id}
							className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all"
						>
							<div className="text-4xl mb-4">{curiosity.icon}</div>
							<h4 className="text-xl font-bold mb-3 text-emerald-400">
								{curiosity.title}
							</h4>
							<p className="text-gray-300">
								<TextWithTooltips text={curiosity.description} />
							</p>
						</div>
					))}
				</div>
			</section>
			{/* Clima del Páramo */}
			<section className="max-w-6xl mx-auto px-6 pb-16">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
					{content.climate.title}
				</h2>
				<div className="bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent p-8 rounded-3xl border border-sky-500/20">
					<div className="grid md:grid-cols-2 gap-8">
						{content.climate.sections.map((section) => (
							<div key={section.title}>
								<h3 className="text-xl font-bold text-sky-400 mb-4">
									{section.title}
								</h3>
								<div className="space-y-3 text-gray-300">
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
			<section className="max-w-4xl mx-auto px-6 pb-16">
				<div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent p-8 rounded-3xl border border-amber-500/20">
					<div className="flex items-center gap-3 mb-4">
						<div className="text-4xl">{content.geology.icon}</div>
						<h3 className="text-2xl font-bold text-amber-400">
							{content.geology.title}
						</h3>
					</div>
					<p className="text-gray-300 mb-4">
						<TextWithTooltips text={content.geology.intro} />
					</p>
					<ul className="space-y-2 text-gray-300">
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
			<section className="max-w-6xl mx-auto px-6 pb-24">
				<div className="bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent p-8 rounded-3xl border border-red-500/20">
					<div className="flex items-center gap-3 mb-6">
						<div className="text-4xl">{content.conservation.icon}</div>
						<h3 className="text-2xl font-bold text-red-400">
							{content.conservation.title}
						</h3>
					</div>
					<p className="text-gray-300 mb-6 text-lg">
						{content.conservation.intro}
					</p>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="text-lg font-semibold text-white mb-3">
								Principales Amenazas:
							</h4>
							<ul className="space-y-2 text-gray-300">
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
							<h4 className="text-lg font-semibold text-white mb-3">
								Acciones de Protección:
							</h4>
							<ul className="space-y-2 text-gray-300">
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
			<section className="max-w-4xl mx-auto px-6 pb-24">
				<div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						{content.cta.title}
					</h2>
					<p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
						{content.cta.description}
					</p>
					<a
						href={content.cta.buttonLink}
						className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
					>
						<span>{content.cta.buttonText}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</section>
			{/* Footer con Fuentes */}
			<footer className="border-t border-emerald-500/10 bg-[#0b1210]/50 backdrop-blur-sm">
				<div className="max-w-6xl mx-auto px-6 py-12">
					{/* Fuentes de Información */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold text-emerald-400 mb-4">
							{footerContent.sources.title}
						</h3>
						<div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
							<div>
								<h4 className="text-white font-medium mb-2">
									{footerContent.sources.official.title}
								</h4>
								<ul className="space-y-1.5">
									{footerContent.sources.official.items.map((item) => (
										<li key={item} className="flex items-start gap-2">
											<span className="text-emerald-500 mt-1 text-xs">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-white font-medium mb-2">
									{footerContent.sources.academic.title}
								</h4>
								<ul className="space-y-1.5">
									{footerContent.sources.academic.items.map((item) => (
										<li key={item} className="flex items-start gap-2">
											<span className="text-emerald-500 mt-1 text-xs">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Copyright y Enlaces */}
					<div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-500 text-sm text-center md:text-left">
							{footerContent.copyright}
						</p>
						<div className="flex items-center gap-4 text-sm">
							{footerContent.links.map((link, idx) => (
								<Fragment key={link.href}>
									{idx > 0 && <span className="text-gray-600">•</span>}
									<a
										href={link.href}
										className="text-emerald-400 hover:text-emerald-300 transition-colors"
									>
										{link.text}
									</a>
								</Fragment>
							))}
						</div>
					</div>

					{/* Nota de Educación */}
					<div className="mt-6 text-center">
						<p className="text-xs text-gray-500">
							{footerContent.educationalNote}
						</p>
					</div>
				</div>
			</footer>
			{/* Audio Player - Fixed Position */}
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40">
				<AudioPlayer audioFileName="conservacion.mp3" autoPlay={false} />
			</div>
		</main>
	);
}
