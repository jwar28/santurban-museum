export const metadata = { title: "Acerca de — Museo Virtual: Santurbán" };

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16">
			<div className="max-w-7xl mx-auto px-6 py-16">
				{/* Page Title */}
				<h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
					Acerca del Museo Virtual del Páramo de Santurbán
				</h1>

				{/* Nuestra Misión */}
				<section className="mb-16">
					<h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6">
						Nuestra Misión
					</h2>
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8">
						<p className="text-gray-300 leading-relaxed text-lg">
							Nuestra misión es preservar y celebrar digitalmente la
							biodiversidad única del Páramo de Santurbán. A través de
							exhibiciones virtuales inmersivas, nuestro objetivo es educar a
							una audiencia global sobre la importancia ecológica de este
							ecosistema vital e inspirar un compromiso colectivo para su
							conservación para las futuras generaciones.
						</p>
					</div>
				</section>

				{/* Nuestra Visión */}
				<section className="mb-16">
					<h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6">
						Nuestra Visión
					</h2>
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8">
						<p className="text-gray-300 leading-relaxed text-lg">
							Nos vemos como un faro digital de conservación, convirtiéndonos en
							el principal recurso en línea para la educación e investigación
							sobre los ecosistemas de páramo. Aspiramos a fomentar una
							comunidad global de defensores de Santurbán, impulsando acciones
							de conservación tangibles a través de la conciencia y la
							apreciación digital.
						</p>
					</div>
				</section>

				{/* El Equipo */}
				<section>
					<h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6">
						El Equipo
					</h2>
					<p className="text-gray-300 leading-relaxed text-lg mb-12">
						Conoce a los apasionados individuos dedicados a dar vida al Páramo
						de Santurbán a través de este museo virtual.
					</p>

					{/* Team Members Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Team Member 1 */}
						<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8 text-center">
							<div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-4 border-emerald-500/30 flex items-center justify-center overflow-hidden">
								<img
									src="/lc.jpg"
									alt="Liliana Calderón-Benavides"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">
								Liliana Calderón-Benavides
							</h3>
							<p className="text-emerald-400 text-sm font-semibold mb-4">
								Directora proyecto de grado
							</p>
							<p className="text-gray-300 text-sm leading-relaxed text-pretty">
								Directora del Centro de Desarrollo Tecnológico Smart Regions
								Center, con amplia experiencia en el desarrollo y gestión de
								proyectos tecnológicos e innovación.
							</p>
						</div>

						{/* Team Member 2 */}
						<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8 text-center">
							<div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-4 border-emerald-500/30 flex items-center justify-center overflow-hidden">
								<img
									src="/vc.jpg"
									alt="Verónica Chajín Ortiz"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">
								Verónica Chajín Ortiz
							</h3>
							<p className="text-emerald-400 text-sm font-semibold mb-4">
								Co-directora proyecto de grado
							</p>
							<p className="text-gray-300 text-sm leading-relaxed text-pretty">
								Ingeniera de Sistemas y Magíster en Software con 10 años de
								experiencia en docencia, investigación y consultoría en
								analítica de datos y gestión de proyectos.
							</p>
						</div>

						{/* Team Member 3 */}
						<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-2xl border border-emerald-500/20 p-8 text-center">
							<div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-4 border-emerald-500/30 flex items-center justify-center overflow-hidden">
								<img
									src="/jg.png"
									alt="Javier Guerra Turizo"
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">
								Javier Guerra Turizo
							</h3>
							<p className="text-emerald-400 text-sm font-semibold mb-4">
								Ing. de Sistemas
							</p>
							<p className="text-gray-300 text-sm leading-relaxed text-pretty">
								Ingeniero de Sistemas con formación en desarrollo Full Stack y
								análisis de datos. Aplica Python, SQL y tecnologías web modernas
								para construir soluciones basadas en datos y automatización de
								procesos.
							</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
