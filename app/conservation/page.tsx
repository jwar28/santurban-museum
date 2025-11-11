export const metadata = { title: "Conservación — Museo Virtual: Santurbán" };

export default function ConservationPage() {
	return (
		<main className="min-h-screen bg-[#0b1210] text-white pt-16">
			{/* Hero Section */}
			<section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
				{/* Background Image Overlay */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage:
							"linear-gradient(rgba(11, 18, 16, 0.7), rgba(11, 18, 16, 0.7)), url('https://upload.wikimedia.org/wikipedia/commons/9/99/P%C3%A1ramo_de_Santurban.jpg')",
					}}
				/>

				{/* Hero Content */}
				<div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-pretty">
						Protegiendo la fuente de vida: El futuro de Santurbán
					</h1>
					<p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
						Descubre la importancia vital de este ecosistema único y cómo puedes
						ayudar a preservar su belleza natural para las generaciones
						venideras.
					</p>
				</div>
			</section>

			{/* Our Collective Responsibility */}
			<section className="max-w-7xl mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Nuestra Responsabilidad Colectiva
					</h2>
					<p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-pretty">
						El Páramo de Santurbán es un tesoro frágil, una fuente de agua y
						vida para millones. Su conservación es un deber compartido que
						requiere nuestra atención inmediata y acción colectiva. Juntos,
						podemos asegurar que este ecosistema vital continúe prosperando.
					</p>
				</div>

				<div className="max-w-4xl mx-auto space-y-8">
					{/* Threats to the Páramo */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-xl border border-emerald-500/20 p-6">
						<div className="flex items-center gap-4 mb-4">
							<span className="text-emerald-400 text-xl">⚠️</span>
							<h3 className="flex-1 font-semibold text-lg">
								Amenazas al Páramo
							</h3>
						</div>
						<div className="text-gray-300 space-y-3">
							<p className="leading-relaxed">
								Las principales amenazas incluyen actividades mineras que
								contaminan las fuentes de agua, el cambio climático que afecta
								los patrones de temperatura y precipitación, la expansión
								agrícola que reduce los hábitats nativos, y el turismo no
								sostenible que causa erosión y perturbación de especies.
							</p>
							<ul className="space-y-2 ml-4">
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1">•</span>
									<span>
										<strong>Minería:</strong> La extracción de minerales amenaza
										con contaminar las fuentes de agua y destruir el delicado
										ecosistema
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1">•</span>
									<span>
										<strong>Cambio Climático:</strong> Las variaciones en
										temperatura y precipitación afectan el equilibrio natural
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-emerald-500 mt-1">•</span>
									<span>
										<strong>Expansión Agrícola:</strong> La conversión de
										tierras de páramo reduce el hábitat para especies nativas
									</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Individual Conservation Actions */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-xl border border-emerald-500/20 p-6">
						<div className="flex items-center gap-4 mb-4">
							<span className="text-emerald-400 text-xl">✓</span>
							<h3 className="flex-1 font-semibold text-lg">
								Acciones de Conservación Individual
							</h3>
						</div>
						<div className="text-gray-300 space-y-3">
							<p className="leading-relaxed mb-4">
								¡Cada acción cuenta! Así es como puedes contribuir a la
								conservación de Santurbán:
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<span className="text-emerald-400 mt-1 text-lg">📚</span>
									<div>
										<strong className="text-white">Educación:</strong> Comparte
										información sobre la importancia del Páramo con tu familia y
										comunidad
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-400 mt-1 text-lg">💧</span>
									<div>
										<strong className="text-white">
											Uso Responsable del Agua:
										</strong>{" "}
										Reduce el consumo de agua y protege las fuentes hídricas
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-400 mt-1 text-lg">🤝</span>
									<div>
										<strong className="text-white">
											Apoya Organizaciones:
										</strong>{" "}
										Contribuye con grupos que trabajan en la conservación del
										páramo
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span className="text-emerald-400 mt-1 text-lg">🥾</span>
									<div>
										<strong className="text-white">Turismo Responsable:</strong>{" "}
										Sigue las normas y no dejes rastro al visitar
									</div>
								</li>
							</ul>
						</div>
					</div>

					{/* Ongoing Conservation Projects */}
					<div className="bg-gradient-to-br from-[#0f1f1a] to-[#0b1210] rounded-xl border border-emerald-500/20 p-6">
						<div className="flex items-center gap-4 mb-4">
							<span className="text-emerald-400 text-xl">📊</span>
							<h3 className="flex-1 font-semibold text-lg">
								Proyectos de Conservación en Curso
							</h3>
						</div>
						<div className="text-gray-300 space-y-4">
							<p className="leading-relaxed">
								Varias iniciativas están protegiendo y restaurando actualmente
								el ecosistema de Santurbán:
							</p>
							<div className="space-y-4">
								<div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
									<h4 className="font-semibold text-white mb-2">
										Proyecto “Guardianes del Agua”
									</h4>
									<p className="text-sm">
										Desarrollado por la CDMB (Corporación Autónoma Regional para
										la Defensa de la Meseta de Bucaramanga), enfocado en la
										protección de microcuencas y educación ambiental en zonas
										rurales.
									</p>
								</div>
								<div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
									<h4 className="font-semibold text-white mb-2">
										Restauración de Humedales de Berlín (Santander)
									</h4>
									<p className="text-sm">
										Iniciativa de la Universidad Industrial de Santander (UIS)
										que busca recuperar áreas degradadas del páramo mediante la
										reintroducción de frailejones y especies nativas.
									</p>
								</div>
								<div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
									<h4 className="font-semibold text-white mb-2">
										Santurbán sin Minería
									</h4>
									<p className="text-sm">
										Movimiento ciudadano y ambiental que defiende el derecho al
										agua frente a los intereses extractivos y promueve la
										creación de zonas de exclusión minera.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action - Explore Species */}
			<section className="max-w-7xl mx-auto px-6 pb-16">
				<div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 rounded-2xl border-2 border-emerald-500/30 p-12 text-center relative overflow-hidden">
					{/* Decorative background elements */}
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGIzODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTYgMzRjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

					<div className="relative z-10">
						<h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
							Descubre las Especies del Páramo
						</h2>
						<p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
							Explora la biodiversidad única de Santurbán. Conoce las especies
							que habitan este ecosistema frágil y aprende cómo protegerlas.
						</p>
						<a
							href="/explore"
							className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/25"
						>
							<span>Ver Especies</span>
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
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-emerald-500/20 py-4">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<p className="text-gray-400 text-sm mb-4">
						© 2024 Páramo de Santurbán Museo Virtual. Todos los Derechos
						Reservados.
					</p>
				</div>
			</footer>
		</main>
	);
}
