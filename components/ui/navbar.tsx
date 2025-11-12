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
		{ href: "/conservation", label: "Conservación" },
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
				</div>

				{/* Mobile Dropdown Menu */}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild>
						<button
							type="button"
							className="md:hidden p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
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
		</nav>
	);
}
