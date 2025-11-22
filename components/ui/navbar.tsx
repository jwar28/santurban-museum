"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";
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

	const navLinks = [
		{ href: "/santurban", label: "Conoce Santurbán" },
		{ href: "/explore", label: "Ver especies" },
		{ href: "/about", label: "Acerca de" },
	];

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "backdrop-blur-md bg-[#0b1210]/90 border-b border-emerald-500/20 shadow-lg"
					: "bg-transparent"
			}`}
		>
			<div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
				{/* Logo and Title */}
				<Link
					href="/"
					className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
				>
					<div className="relative h-8 w-8 flex-shrink-0">
						<Image
							src="/logo.svg"
							alt="Museo Virtual Santurbán"
							fill
							className="object-contain"
						/>
					</div>
					<span className="font-semibold text-xs md:text-sm text-white">
						Museo Virtual: Santurbán
					</span>
				</Link>

				{/* Desktop Navigation Links */}
				<div className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
						>
							{link.label}
						</Link>
					))}

					{/* CDT Logo */}
					<a
						href="https://smartregionscenter.com.co/"
						target="_blank"
						rel="noopener noreferrer"
						className="relative h-16 w-32 ml-6 flex-shrink-0 group"
						aria-label="Smart Center Development"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<Image
							src="/cdt-logo.png"
							alt="Smart Center Development"
							fill
							sizes="128px"
							className="object-contain brightness-100 contrast-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-300"
							priority
						/>
					</a>
				</div>

				{/* Mobile: CDT Logo + Menu */}
				<div className="flex md:hidden items-center gap-3">
					<a
						href="https://smartcenterdevelopment.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="relative h-10 w-24 flex-shrink-0 group"
						aria-label="Smart Center Development"
					>
						<Image
							src="/cdt-logo.png"
							alt="Smart Center Development"
							fill
							sizes="96px"
							className="object-contain brightness-100 contrast-110 drop-shadow-[0_0_6px_rgba(16,185,129,0.3)] group-active:brightness-110 transition-all duration-200"
							priority
						/>
					</a>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button
								type="button"
								className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
								aria-label="Toggle menu"
							>
								<Menu className="w-6 h-6" />
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="md:hidden min-w-[220px] bg-[#0b1210]/95 backdrop-blur-lg rounded-lg border border-emerald-500/20 shadow-lg p-2 z-50"
								sideOffset={5}
								align="end"
							>
								{navLinks.map((link) => (
									<DropdownMenu.Item key={link.href} asChild>
										<Link
											href={link.href}
											className="flex items-center px-4 py-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-md transition-colors outline-none cursor-pointer font-medium"
										>
											{link.label}
										</Link>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</div>
			</div>
		</nav>
	);
}
