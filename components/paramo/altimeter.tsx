"use client";

import { useEffect, useRef, useState } from "react";

const TOP = 4290;
const BOTTOM = 959;

const bands = [
	{ at: 0, name: "Superpáramo" },
	{ at: 0.3, name: "Páramo" },
	{ at: 0.62, name: "Bosque altoandino" },
	{ at: 0.86, name: "Valle" },
];

function fmt(m: number) {
	return `${Math.round(m).toLocaleString("es-CO")} m`;
}

/**
 * Regla altimétrica fija en el margen: el recorrido de la página se lee como
 * un descenso desde la cumbre (4.290 m) hasta Bucaramanga (959 m).
 */
export default function Altimeter({ targetId }: { targetId: string }) {
	const [p, setP] = useState(0);
	const frame = useRef(0);

	useEffect(() => {
		const el = document.getElementById(targetId);
		if (!el) return;
		const update = () => {
			cancelAnimationFrame(frame.current);
			frame.current = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const total = rect.height - window.innerHeight;
				const v = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
				setP(v);
			});
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			cancelAnimationFrame(frame.current);
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [targetId]);

	const altitude = TOP - p * (TOP - BOTTOM);
	const band = [...bands].reverse().find((b) => p >= b.at) ?? bands[0];

	return (
		<>
			{/* Escritorio: margen de la lámina */}
			<aside
				aria-label="Altímetro del recorrido"
				className="fixed bottom-0 left-0 top-14 z-30 hidden w-28 border-r border-ink/40 bg-mist md:block"
			>
				{p > 0.07 && (
					<span className="tabular absolute right-9 top-[1.85rem] text-[0.7rem] text-ink-soft">4.290 m</span>
				)}
				{p < 0.93 && (
					<span className="tabular absolute bottom-[1.85rem] right-9 text-[0.7rem] text-ink-soft">959 m</span>
				)}
				<div className="absolute bottom-10 right-6 top-10 w-px bg-ink/50">
					{/* El agua llena la regla a medida que se desciende */}
					<span
						className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-water"
						style={{ height: `${p * 100}%` }}
						aria-hidden
					/>
					{bands.map((b) => (
						<span
							key={b.name}
							className="absolute right-0 h-px w-3 bg-ink"
							style={{ top: `${b.at * 100}%` }}
						/>
					))}
					<span
						className="absolute right-[-5px] h-[11px] w-[11px] rotate-45 bg-water"
						style={{ top: `calc(${p * 100}% - 5px)` }}
						aria-hidden
					/>
				</div>
				<div
					className="absolute right-10 text-right"
					style={{ top: `calc(2.5rem + ${p} * (100% - 5rem) - 1.1rem)` }}
				>
					<p className="tabular text-sm font-semibold leading-none" aria-live="off">
						{fmt(altitude)}
					</p>
					<p className="mt-1 text-[0.7rem] leading-tight text-ink-soft">{band.name}</p>
				</div>
			</aside>

			{/* Móvil: tira bajo la navegación */}
			<div className="fixed inset-x-0 top-14 z-30 flex h-9 items-center justify-between border-b border-ink/30 bg-mist px-4 md:hidden">
				<span className="text-xs text-ink-soft">{band.name}</span>
				<span className="tabular text-sm font-semibold">{fmt(altitude)}</span>
				<span
					className="absolute bottom-[-1px] left-0 h-[2px] bg-water"
					style={{ width: `${p * 100}%` }}
					aria-hidden
				/>
			</div>
		</>
	);
}
