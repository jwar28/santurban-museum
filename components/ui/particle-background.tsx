"use client";

import { useEffect, useRef } from "react";

type Props = {
	color?: string;
	density?: number; // particles per 10000 px^2
	speed?: number;
	className?: string;
};

export default function ParticleBackground({
	color = "#38bdf8",
	density = 0.00012,
	speed = 0.1,
	className = "",
}: Props) {
	const ref = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const canvasEl = canvas as HTMLCanvasElement;
		const ctx = canvasEl.getContext("2d");
		if (!ctx) return;
		const ctx2 = ctx as CanvasRenderingContext2D;

		let raf = 0;
		let width = 0;
		let height = 0;
		let dpr = window.devicePixelRatio || 1;

		type P = {
			x: number;
			y: number;
			r: number;
			vx: number;
			vy: number;
			alpha: number;
		};
		let particles: P[] = [];

		function resize() {
			dpr = window.devicePixelRatio || 1;
			width = canvasEl.clientWidth;
			height = canvasEl.clientHeight;
			canvasEl.width = Math.floor(width * dpr);
			canvasEl.height = Math.floor(height * dpr);
			ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
			const area = width * height;
			const target = Math.ceil(area * density);
			// create or trim particles
			while (particles.length < target) {
				particles.push(spawnParticle());
			}
			if (particles.length > target) particles = particles.slice(0, target);
		}

		function rand(min: number, max: number) {
			return Math.random() * (max - min) + min;
		}

		function spawnParticle(): P {
			const r = rand(0.6, 2.6);
			const x = rand(0, width);
			const y = rand(0, height);
			const angle = rand(-Math.PI, Math.PI);
			const speedFactor = rand(0.1, 1.0) * speed;
			return {
				x,
				y,
				r,
				vx: Math.cos(angle) * speedFactor,
				vy: Math.sin(angle) * speedFactor * 0.3 - Math.abs(speedFactor) * 0.2,
				alpha: rand(0.2, 0.9),
			};
		}

		function step() {
			ctx2.clearRect(0, 0, width, height);
			// subtle background dim (disabled by default)
			// ctx.fillStyle = 'rgba(0,0,0,0.02)'; ctx.fillRect(0,0,width,height);

			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				// wrap
				if (p.x < -10) p.x = width + 10;
				if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				if (p.y > height + 10) p.y = -10;

				const g = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
				// outer transparent
				g.addColorStop(0, hexWithAlpha(color, p.alpha));
				g.addColorStop(0.4, hexWithAlpha(color, p.alpha * 0.45));
				g.addColorStop(1, hexWithAlpha(color, 0));
				ctx2.fillStyle = g;
				ctx2.beginPath();
				ctx2.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
				ctx2.fill();
			}

			raf = requestAnimationFrame(step);
		}

		function hexWithAlpha(hex: string, a: number) {
			// normalize hex
			const h = hex.replace("#", "");
			let r = 0,
				g = 0,
				b = 0;
			if (h.length === 3) {
				r = parseInt(h[0] + h[0], 16);
				g = parseInt(h[1] + h[1], 16);
				b = parseInt(h[2] + h[2], 16);
			} else if (h.length === 6) {
				r = parseInt(h.slice(0, 2), 16);
				g = parseInt(h.slice(2, 4), 16);
				b = parseInt(h.slice(4, 6), 16);
			}
			return `rgba(${r},${g},${b},${a})`;
		}

		resize();
		window.addEventListener("resize", resize);
		raf = requestAnimationFrame(step);

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(raf);
		};
	}, [color, density, speed]);

	return (
		<canvas
			ref={ref}
			className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
		/>
	);
}
