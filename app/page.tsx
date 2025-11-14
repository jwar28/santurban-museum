"use client";

import AudioPlayer from "@/components/ui/audio-player";
import BearNarrator from "@/components/ui/bear-narrator";
import ParticleBackground from "@/components/ui/particle-background";
import { useState } from "react";

export default function Home() {
	const [hasStarted, setHasStarted] = useState(false);

	return (
		<main className="min-h-screen relative overflow-hidden">
			{/* Glow de fondo (tinted to match narrator) */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[60vh] w-[60vw] rounded-full blur-[200px] opacity-24 bg-teal-600/80 mix-blend-screen" />
			</div>

			{/* Particle background (contrasting color) */}
			<ParticleBackground color="#38bdf8" className="-z-10" />

			{/* Hero Card */}
			<section className="flex min-h-screen items-center justify-center px-6 relative z-10">
				{/* Card minimalista */}
				<div className="mx-auto max-w-3xl md:max-w-4xl rounded-xl bg-[#0b1210]/80 p-10 md:p-16 text-center border border-white/20 shadow-2xl backdrop-blur-md">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white">
						Museo Virtual:
						<br />
						<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
							Santurbán
						</span>
					</h1>
					<p className="mt-5 text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light">
						Donde el agua nace, la vida florece
					</p>

					{/* Audio Player */}
					<div className="mt-10 flex justify-center">
						{!hasStarted ? (
							<button
								type="button"
								onClick={() => setHasStarted(true)}
								className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all duration-300 shadow-lg hover:scale-105"
							>
								🎵 Iniciar Experiencia
							</button>
						) : (
							<AudioPlayer
								audioFileName="intro.mp3"
								className="max-w-md w-full"
								autoPlay={true}
							/>
						)}
					</div>

					<div className="mt-7">
						<a
							href="/santurban"
							className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-base font-semibold text-white hover:bg-white/15 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 transition-all"
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
