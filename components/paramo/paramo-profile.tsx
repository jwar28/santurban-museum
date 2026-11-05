"use client";

import { useBearState } from "@/components/ui/bear-narrator";

/** Frailejón dibujado a línea: tallo, roseta y una vara florida. */
function Frailejon({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
	return (
		<g transform={`translate(${x} ${y}) scale(${s})`} fill="none" strokeLinecap="round">
			<path d="M0 0 V-26" stroke="var(--ink)" strokeWidth="2.2" />
			<g stroke="var(--ink-soft)" strokeWidth="1.3">
				<path d="M0 -26 Q-10 -34 -16 -30" />
				<path d="M0 -26 Q-6 -38 -9 -42" />
				<path d="M0 -26 Q0 -40 0 -45" />
				<path d="M0 -26 Q6 -38 9 -42" />
				<path d="M0 -26 Q10 -34 16 -30" />
			</g>
			<path d="M0 -40 Q4 -52 10 -56" stroke="var(--gold)" strokeWidth="1.6" />
			<circle cx="11" cy="-57" r="3" fill="var(--gold)" />
		</g>
	);
}

/**
 * Corte altitudinal del páramo (viewBox 1440×560). Las franjas se oscurecen al
 * bajar: páramo, bosque altoandino, valle. La línea de agua nace en la laguna
 * y se dibuja hasta las ciudades. `compact` recorta la cumbre para pantallas
 * estrechas y agranda los rótulos.
 */
export default function ParamoProfile({
	className = "",
	compact = false,
}: {
	className?: string;
	compact?: boolean;
}) {
	const { src } = useBearState();
	const k = compact ? 1.7 : 1;
	const capsStyle = {
		fontFamily: "var(--font-label), sans-serif",
		fontWeight: 600,
		fontSize: 13 * k,
		letterSpacing: 2.4 * k,
	} as const;
	const nameSize = 27 * k;

	return (
		<svg
			viewBox={compact ? "590 -30 850 590" : "0 0 1440 560"}
			className={className}
			role="group"
			aria-labelledby={compact ? "perfil-titulo-m" : "perfil-titulo"}
			preserveAspectRatio="xMaxYMax meet"
			overflow="visible"
		>
			<title id={compact ? "perfil-titulo-m" : "perfil-titulo"}>
				Corte del Páramo de Santurbán: frailejones y lagunas en la cumbre, el oso de
				anteojos en la ladera y el agua que baja hasta las ciudades del valle.
			</title>

			<g stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 7">
				<path d="M-2000 150 H1440" />
				<path d="M-2000 270 H1440" />
				<path d="M-2000 390 H1440" />
			</g>

			{/* El oso asoma detrás de la cresta */}
			<image href={src} x="1196" y="30" width="118" height="161" preserveAspectRatio="xMidYMax meet" />

			<path
				d="M-2000 560 L-2000 392 C-1300 392 -300 375 0 330 C200 300 420 250 600 200 C760 150 880 70 980 46 C1020 38 1050 44 1080 60 C1180 110 1290 170 1440 250 L1440 560Z"
				fill="var(--slope-1)"
			/>
			<path
				d="M-2000 560 L-2000 450 C-1300 450 -300 432 0 402 C220 380 440 330 640 300 C800 276 960 280 1080 320 C1220 366 1340 420 1440 450 L1440 560Z"
				fill="var(--slope-2)"
			/>
			<path
				d="M-2000 560 L-2000 500 C-1300 500 -400 490 0 470 C300 455 600 430 860 436 C1080 442 1280 480 1440 510 L1440 560Z"
				fill="var(--slope-3)"
			/>

			<ellipse cx="868" cy="122" rx="34" ry="6" fill="var(--water)" />
			<ellipse cx="1112" cy="118" rx="22" ry="4.5" fill="var(--water)" />
			<ellipse cx="660" cy="214" rx="18" ry="4" fill="var(--water)" />

			<Frailejon x={706} y={196} s={1.1} />
			<Frailejon x={734} y={186} s={0.85} />
			<Frailejon x={906} y={104} s={1} />
			<Frailejon x={932} y={96} s={0.75} />

			<path
				className="water-line"
				d="M868 122 C888 180 836 240 892 300 C952 368 1090 420 1250 470 C1336 496 1400 512 1440 520"
				fill="none"
				stroke="var(--water-pale)"
				strokeWidth={3.5 * (compact ? 1.4 : 1)}
				strokeLinecap="round"
				pathLength={1}
			/>

			{/* Aquí nace el agua: la gota marca el origen y abre el descenso */}
			<a href="/santurban" aria-label="Comenzar el descenso desde la laguna donde nace el agua" className="group">
				<path
					d="M868 78 C868 78 853 98 853 108 a15 15 0 0 0 30 0 C883 98 868 78 868 78Z"
					fill="var(--water)"
					stroke="var(--mist)"
					strokeWidth="2.5"
				/>
				{!compact && (
					<g className="hidden xl:inline">
						<rect x="588" y="62" width="252" height="54" fill="var(--ink)" className="transition-colors duration-300 group-hover:fill-[var(--water-deep)]" />
						<text
							x="714"
							y="94.5"
							textAnchor="middle"
							style={{ ...capsStyle, fontSize: 14.5, letterSpacing: 1.6 }}
							fill="var(--mist)"
						>
							COMENZAR EL DESCENSO →
						</text>
						<path d="M840 90 H851" stroke="var(--ink)" strokeWidth="2" />
					</g>
				)}
			</a>

			<g fill="var(--ink)" fontFamily="var(--font-text), Georgia, serif">
				<g transform={compact ? "rotate(-16 640 120)" : "rotate(-16 560 190)"}>
					<text x={compact ? 650 : 500} y={compact ? 92 : 168} style={capsStyle}>
						FLORA · EMBLEMA
					</text>
					<text x={compact ? 650 : 500} y={compact ? 136 : 196} fontSize={nameSize} fontStyle="italic">
						Frailejón
					</text>
				</g>
				<g transform={compact ? "rotate(24 1180 280)" : "rotate(26 1250 220)"}>
					<text x={compact ? 1090 : 1200} y={compact ? 262 : 214} style={capsStyle}>
						FAUNA · GUÍA DE SALA
					</text>
					<text x={compact ? 1090 : 1200} y={compact ? 262 + 46 : 240} fontSize={nameSize} fontStyle="italic">
						Oso de anteojos
					</text>
				</g>
				<text
					x={compact ? 880 : 790}
					y={compact ? 186 : 160}
					transform={compact ? "rotate(-4 880 186)" : "rotate(-6 790 160)"}
					style={capsStyle}
				>
					26+ LAGUNAS
				</text>
			</g>
		</svg>
	);
}
