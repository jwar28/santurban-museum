"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "backdrop-blur-md bg-[#0b1210]/90 border-b border-emerald-500/20 shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
				{/* Logo and Title */}
				<Link
					href="/"
					className="flex items-center gap-3 hover:opacity-80 transition-opacity"
				>
					<div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/90">
						<span className="text-lg">🏛️</span>
					</div>
					<span className="font-semibold text-sm text-white">
						Museo Virtual: Santurbán
					</span>
				</Link>

				{/* Navigation Links */}
				<div className="flex items-center gap-6">
					<Link
						href="/conservation"
						className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
					>
						Conservación
					</Link>
					<Link
						href="/explore"
						className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
					>
						Ver especies
					</Link>
					<Link
						href="/about"
						className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
					>
						Acerca de
					</Link>
				</div>
			</div>
		</nav>
	);
}
