import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Conservación",
	description:
		"Conoce la importancia del páramo de Santurbán, las amenazas que enfrenta y cómo podemos contribuir a su conservación. Un ecosistema vital que provee agua a millones de personas.",
	openGraph: {
		title: "Conservación del Páramo de Santurbán",
		description:
			"Descubre por qué proteger el páramo de Santurbán es fundamental para el futuro del agua en Colombia.",
	},
};

export default function ConservationPage() {
	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16">
			{/* Hero Section - More minimalist */}
			<section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage:
							"linear-gradient(rgba(11, 18, 16, 0.75), rgba(11, 18, 16, 0.85)), url('https://upload.wikimedia.org/wikipedia/commons/9/99/P%C3%A1ramo_de_Santurban.jpg')",
					}}
				/>
				<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
						Conservación
					</h1>
					<p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-light">
						Protegiendo la fuente de vida del futuro
					</p>
				</div>
			</section>

			{/* Mission Statement - Minimalist */}
			<section className="max-w-4xl mx-auto px-6 py-20">
				<p className="text-2xl md:text-3xl text-gray-200 text-center leading-relaxed font-light">
					El Páramo de Santurbán es un tesoro frágil. Su conservación es nuestra
					<span className="text-emerald-400 font-normal">
						{" "}
						responsabilidad colectiva
					</span>
					.
				</p>
			</section>

			{/* Content Cards - Cleaner Design */}
			<section className="max-w-6xl mx-auto px-6 pb-20">
				<div className="grid md:grid-cols-3 gap-8">
					{/* Threats */}
					<div className="group">
						<div className="bg-gradient-to-b from-emerald-500/10 to-transparent p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all h-full">
							<div className="text-4xl mb-4">⚠️</div>
							<h3 className="text-2xl font-bold mb-4 text-emerald-400">
								Amenazas
							</h3>
							<ul className="space-y-3 text-gray-300">
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Minería y contaminación</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Cambio climático</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Expansión agrícola</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Turismo no sostenible</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Actions */}
					<div className="group">
						<div className="bg-gradient-to-b from-emerald-500/10 to-transparent p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all h-full">
							<div className="text-4xl mb-4">💚</div>
							<h3 className="text-2xl font-bold mb-4 text-emerald-400">
								Cómo Ayudar
							</h3>
							<ul className="space-y-3 text-gray-300">
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Educar y compartir</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Uso responsable del agua</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Apoyar organizaciones</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Practicar turismo consciente</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Projects */}
					<div className="group">
						<div className="bg-gradient-to-b from-emerald-500/10 to-transparent p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all h-full">
							<div className="text-4xl mb-4">🌱</div>
							<h3 className="text-2xl font-bold mb-4 text-emerald-400">
								Proyectos
							</h3>
							<ul className="space-y-3 text-gray-300">
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Guardianes del Agua (CDMB)</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Restauración de Humedales (UIS)</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1.5 text-xs">●</span>
									<span>Santurbán sin Minería</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* CTA - Simplified */}
			<section className="max-w-4xl mx-auto px-6 pb-24">
				<div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Descubre las Especies
					</h2>
					<p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
						Conoce la biodiversidad única que estamos protegiendo
					</p>
					<a
						href="/explore"
						className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105"
					>
						<span>Explorar</span>
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

			{/* Footer - Minimal */}
			<footer className="border-t border-emerald-500/10 py-8">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<p className="text-gray-500 text-sm">
						© 2024 Museo Virtual: Santurbán
					</p>
				</div>
			</footer>
		</main>
	);
}
