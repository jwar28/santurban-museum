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
			<div className="max-w-5xl mx-auto px-6 py-16">
				<div className="text-center mb-24">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
						Santurbán
					</h1>
					<p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
						Preservando la biodiversidad digital del páramo
					</p>
				</div>

				{/* Misión y Visión - Layout Minimalista */}
				<div className="space-y-16 mb-24">
					<section className="bg-white/5 p-8 rounded-xl border border-white/10">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-px w-8 bg-emerald-500/50" />
							<h2 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
								Misión
							</h2>
						</div>
						<p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
							Educar a una audiencia global sobre la importancia ecológica de
							este ecosistema vital e inspirar un compromiso colectivo para su
							conservación.
						</p>
					</section>

					<section className="bg-white/5 p-8 rounded-xl border border-white/10">
						<div className="flex items-center gap-3 mb-4">
							<div className="h-px w-8 bg-emerald-500/50" />
							<h2 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
								Visión
							</h2>
						</div>
						<p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
							Convertirnos en el principal recurso digital para la educación
							sobre ecosistemas de páramo, fomentando una comunidad global de
							defensores.
						</p>
					</section>
				</div>

				{/* El Equipo */}
				<section>
					<div className="flex items-center gap-3 mb-12">
						<div className="h-px w-8 bg-emerald-500/50" />
						<h2 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
							Equipo
						</h2>
					</div>

					{/* Team Members Grid - Diseño Minimalista */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Team Member 1 */}
						<div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all text-center">
							<div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-white/10">
								<img
									src="/lc.jpg"
									alt="Liliana Calderón-Benavides"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-base font-bold text-gray-100 mb-1">
								Liliana Calderón-Benavides
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-3 font-semibold">
								Directora
							</p>
							<p className="text-gray-400 text-xs leading-relaxed">
								Smart Regions Center
							</p>
						</div>

						{/* Team Member 2 */}
						<div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all text-center">
							<div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-white/10">
								<img
									src="/vc.jpg"
									alt="Verónica Chajín Ortiz"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-base font-bold text-gray-100 mb-1">
								Verónica Chajín Ortiz
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-3 font-semibold">
								Co-directora
							</p>
							<p className="text-gray-400 text-xs leading-relaxed">
								Ing. de Sistemas & Magíster en Software
							</p>
						</div>

						{/* Team Member 3 */}
						<div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all text-center">
							<div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-white/10">
								<img
									src="/jg.png"
									alt="Javier Guerra Turizo"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-base font-bold text-gray-100 mb-1">
								Javier Guerra Turizo
							</h3>
							<p className="text-emerald-400 text-xs uppercase tracking-wide mb-3 font-semibold">
								Desarrollador
							</p>
							<p className="text-gray-400 text-xs leading-relaxed">
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
