import AudioPlayer from "@/components/ui/audio-player";
import Footer from "@/components/ui/footer";
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

const recognitions = [
	{ when: "2024", what: "Participación destacada", where: "XI CIINATIC 2024" },
	{ when: "2025", what: "Ganador", where: "INNGENIATE-C, Semana de Ingeniería UNAB" },
	{
		when: "Propuesta",
		what: "Hub Eco Smart Regions",
		where: "Centro de interpretación del Páramo de Santurbán",
	},
];

const team = [
	{ name: "Liliana Calderón-Benavides", role: "Directora", detail: "Smart Regions Center", photo: "/team/lc.jpg" },
	{
		name: "Verónica Chajín Ortiz",
		role: "Co-directora",
		detail: "Ing. de Sistemas y Magíster en Software",
		photo: "/team/vc.jpg",
	},
	{ name: "Javier Guerra Turizo", role: "Desarrollador", detail: "Ing. de Sistemas", photo: "/team/jg.png" },
];

export default function AboutPage() {
	return (
		<main className="min-h-screen bg-mist text-ink">
			<div className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-8 md:pt-32">
				<h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92]">Créditos</h1>
				<p className="mt-5 max-w-2xl font-serif text-[clamp(1.2rem,2.2vw,1.7rem)] italic text-water-deep">
					Preservando la biodiversidad digital del páramo
				</p>

				<div className="mt-16 grid gap-12 border-t-2 border-ink pt-10 md:grid-cols-2">
					<section>
						<h2 className="label text-ink-soft">Misión</h2>
						<p className="mt-4 font-serif text-2xl leading-snug">
							Educar a una audiencia global sobre la importancia ecológica de este
							ecosistema vital e inspirar un compromiso colectivo para su conservación.
						</p>
					</section>
					<section>
						<h2 className="label text-ink-soft">Visión</h2>
						<p className="mt-4 font-serif text-2xl leading-snug">
							Convertirnos en el principal recurso digital para la educación sobre
							ecosistemas de páramo, fomentando una comunidad global de defensores.
						</p>
					</section>
				</div>

				<section aria-labelledby="equipo" className="mt-24">
					<h2 id="equipo" className="font-display text-4xl md:text-5xl">
						Equipo
					</h2>
					<ul className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
						{team.map((m) => (
							<li key={m.name}>
								<div className="flex justify-center border border-ink/40 bg-mist-deep p-8">
									<div className="aspect-square w-full max-w-[15rem] overflow-hidden rounded-full border border-ink/40">
										<img
											src={m.photo}
											alt={m.name}
											className="h-full w-full scale-[1.06] object-cover grayscale-[30%]"
										/>
									</div>
								</div>
								<h3 className="mt-4 font-display text-2xl">{m.name}</h3>
								<p className="mt-1 font-semibold text-water-deep">{m.role}</p>
								<p className="mt-1 text-sm text-ink-soft">{m.detail}</p>
							</li>
						))}
					</ul>
				</section>

				<section aria-labelledby="reconocimientos" className="mt-24">
					<h2 id="reconocimientos" className="font-display text-4xl md:text-5xl">
						Reconocimientos
					</h2>
					<ol className="mt-10 border-t border-ink/40">
						{recognitions.map((r) => (
							<li
								key={r.where}
								className="grid gap-1 border-b border-ink/40 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
							>
								<span className="tabular font-semibold text-ink-soft">{r.when}</span>
								<p className="text-lg">
									{r.what} · <span className="font-serif italic">{r.where}</span>
								</p>
							</li>
						))}
					</ol>
				</section>
			</div>

			<Footer />

			<div className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 md:bottom-[5.25rem] md:left-auto md:right-6 md:translate-x-0">
				<AudioPlayer audioFileName="creditos.mp3" />
			</div>
		</main>
	);
}
