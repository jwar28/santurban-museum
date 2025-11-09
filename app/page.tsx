import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
					<Button
						aria-label="Abrir menú"
						className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
					>
						<Menu className="h-5 w-5" />
					</Button>
				</div>
			</header>

			{/* Glow de fondo */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[60vh] w-[60vw] rounded-full blur-[200px] opacity-30 bg-emerald-500 mix-blend-screen" />
			</div>

			{/* Hero Card */}
			<section className="flex min-h-screen items-center justify-center px-6">
				<div className="mx-auto max-w-3xl rounded-2xl bg-white/[0.03] p-10 text-center ring-1 ring-white/10 shadow-glass backdrop-blur-sm">
					<h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
						Museo Virtual:
						<br />
						Santurbán
					</h1>
					<p className="mt-6 text-lg text-white/70">
						Donde el agua nace, la vida florece
					</p>

					<div className="mt-8">
						<a
							href="#explorar"
							className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition"
						>
							Explorar
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
