import BearNarrator from "@/components/ui/bear-narrator";
import ParticleBackground from "@/components/ui/particle-background";

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-hidden">
			{/* Navbar */}
			<header className="absolute inset-x-0 top-0 z-10">
				<div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/90">
							<span className="sr-only">Logo</span>
							{/* pequeño rombo */}
							<span className="h-3 w-3 rotate-45 bg-emerald-900 rounded-[2px]" />
						</span>
						<span className="font-medium">Museo Virtual: Santurbán</span>
					</div>
					<a
						href="/explore"
						className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white/3 text-white hover:bg-white/5 transition"
					>
						Ver especies
					</a>
				</div>
			</header>

			{/* Glow de fondo (tinted to match narrator) */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[60vh] w-[60vw] rounded-full blur-[200px] opacity-24 bg-teal-600/80 mix-blend-screen" />
			</div>

			{/* Particle background (contrasting color) */}
			<ParticleBackground color="#38bdf8" className="-z-10" />

			{/* Hero Card */}
			<section className="flex min-h-screen items-center justify-center px-6 relative z-10">
				{/* Grayish glass-style hero card (slightly darker) */}
				<div className="mx-auto max-w-3xl md:max-w-4xl rounded-2xl bg-slate-800/40 p-8 md:p-14 text-center ring-1 ring-slate-700/28 border border-slate-700/16 shadow-lg backdrop-blur-sm">
					<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
						Museo Virtual:
						<br />
						Santurbán
					</h1>
					<p className="mt-6 text-sm md:text-base text-slate-200/80 max-w-2xl mx-auto">
						Donde el agua nace, la vida florece
					</p>

					<div className="mt-8">
						<a
							href="/explore"
							className="inline-flex items-center justify-center rounded-full border border-slate-600/20 bg-slate-900/10 px-6 py-3 text-base font-semibold text-slate-100 hover:bg-slate-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/30 transition"
						>
							Explorar
						</a>
					</div>
				</div>
			</section>

			{/* Fixed narrator bear at bottom-right (matches indicated area) */}
			<div className="pointer-events-none fixed right-4 bottom-4 z-30 md:right-12 md:bottom-12">
				<BearNarrator wrapperClassName="-mr-2" imgClassName="w-36 md:w-56" />
			</div>
		</main>
	);
}
