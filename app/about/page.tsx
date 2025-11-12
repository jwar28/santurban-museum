import AudioPlayer from "@/components/ui/audio-player";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Acerca de",
	description:
		"Conoce nuestro museo virtual dedicado a preservar y compartir la biodiversidad del páramo de Santurbán. Misión, visión y el equipo detrás de este proyecto educativo digital.",
	openGraph: {
		title: "Acerca del Museo Virtual Santurbán",
		description:
			"Un proyecto educativo digital para preservar y compartir la biodiversidad del páramo de Santurbán.",
	},
};

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16">
			{/* Hero Section */}
			<div className="max-w-5xl mx-auto px-6 py-24">
				<div className="text-center mb-32">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
						Santurbán
					</h1>
					<p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
						Preservando la biodiversidad digital del páramo
					</p>
				</div>

				{/* Misión y Visión - Layout Minimalista */}
				<div className="space-y-24 mb-32">
					<section className="group">
						<div className="flex items-center gap-4 mb-6">
							<div className="h-px w-12 bg-emerald-500/50 group-hover:w-20 transition-all duration-500" />
							<h2 className="text-sm uppercase tracking-widest text-emerald-400 font-medium">
								Misión
							</h2>
						</div>
						<p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light ml-16">
							Educar a una audiencia global sobre la importancia ecológica de
							este ecosistema vital e inspirar un compromiso colectivo para su
							conservación.
						</p>
					</section>

					<section className="group">
						<div className="flex items-center gap-4 mb-6">
							<div className="h-px w-12 bg-emerald-500/50 group-hover:w-20 transition-all duration-500" />
							<h2 className="text-sm uppercase tracking-widest text-emerald-400 font-medium">
								Visión
							</h2>
						</div>
						<p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light ml-16">
							Convertirnos en el principal recurso digital para la educación
							sobre ecosistemas de páramo, fomentando una comunidad global de
							defensores.
						</p>
					</section>
				</div>

				{/* El Equipo */}
				<section>
					<div className="flex items-center gap-4 mb-16">
						<div className="h-px w-12 bg-emerald-500/50" />
						<h2 className="text-sm uppercase tracking-widest text-emerald-400 font-medium">
							Equipo
						</h2>
					</div>

					{/* Team Members Grid - Diseño Minimalista */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* Team Member 1 */}
						<div className="group text-center">
							<div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-2 border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 hover:scale-105">
								<img
									src="/lc.jpg"
									alt="Liliana Calderón-Benavides"
									className="w-full h-full object-cover transition-all duration-500"
								/>
							</div>
							<h3 className="text-lg font-semibold text-white mb-1">
								Liliana Calderón-Benavides
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-4 font-medium">
								Directora
							</p>
							<p className="text-gray-400 text-sm leading-relaxed">
								Smart Regions Center
							</p>
						</div>

						{/* Team Member 2 */}
						<div className="group text-center">
							<div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-2 border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 hover:scale-105">
								<img
									src="/vc.jpg"
									alt="Verónica Chajín Ortiz"
									className="w-full h-full object-cover transition-all duration-500"
								/>
							</div>
							<h3 className="text-lg font-semibold text-white mb-1">
								Verónica Chajín Ortiz
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-4 font-medium">
								Co-directora
							</p>
							<p className="text-gray-400 text-sm leading-relaxed">
								Ing. de Sistemas & Magíster en Software
							</p>
						</div>

						{/* Team Member 3 */}
						<div className="group text-center">
							<div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-2 border-emerald-500/30 hover:border-emerald-500 transition-all duration-500 hover:scale-105">
								<img
									src="/jg.png"
									alt="Javier Guerra Turizo"
									className="w-full h-full object-cover transition-all duration-500"
								/>
							</div>
							<h3 className="text-lg font-semibold text-white mb-1">
								Javier Guerra Turizo
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-4 font-medium">
								Desarrollador
							</p>
							<p className="text-gray-400 text-sm leading-relaxed">
								Ing. de Sistemas
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* Audio Player - Fixed Position */}
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40">
				<AudioPlayer audioFileName="creditos.mp3" autoPlay={false} />
			</div>
		</main>
	);
}
