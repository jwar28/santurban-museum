"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
	{ href: "/santurban", label: "El descenso" },
	{ href: "/explore", label: "La colección" },
	{ href: "/about", label: "Créditos" },
];

function isActive(pathname: string, href: string) {
	if (href === "/explore") {
		return pathname.startsWith("/explore") || pathname.startsWith("/species");
	}
	return pathname.startsWith(href);
}

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-ink/25 bg-mist">
			<div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
				<Link
					href="/"
					className="group flex items-center gap-3"
					aria-label="Museo Virtual Santurbán, inicio"
				>
					<Image
						src="/logo.svg"
						alt=""
						width={28}
						height={28}
						className="h-7 w-7"
					/>
					<span className="label text-ink">
						Museo Virtual <span className="hidden sm:inline">Santurbán</span>
					</span>
				</Link>

				<nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
					{navLinks.map((link) => {
						const active = isActive(pathname, link.href);
						return (
							<Link
								key={link.href}
								href={link.href}
								aria-current={active ? "page" : undefined}
								className={`label relative py-2 transition-colors duration-300 ease-out ${
									active ? "text-ink" : "text-ink-soft hover:text-ink"
								}`}
							>
								{link.label}
								<span
									aria-hidden
									className={`absolute inset-x-0 -bottom-[13px] h-[2px] origin-left bg-water transition-transform duration-500 ease-out ${
										active ? "scale-x-100" : "scale-x-0"
									}`}
								/>
							</Link>
						);
					})}
					<a
						href="https://smartregionscenter.com.co/"
						target="_blank"
						rel="noopener noreferrer"
						className="relative ml-2 h-9 w-20 opacity-80 transition-opacity hover:opacity-100"
						aria-label="Smart Regions Center (abre en otra pestaña)"
					>
						<Image
							src="/cdt-logo.png"
							alt=""
							fill
							sizes="80px"
							className="object-contain"
						/>
					</a>
				</nav>

				<DropdownMenu.Root open={open} onOpenChange={setOpen}>
					<DropdownMenu.Trigger asChild>
						<button
							type="button"
							className="label -mr-2 flex h-11 items-center gap-2 px-2 text-ink md:hidden"
							aria-label={open ? "Cerrar menú" : "Abrir menú"}
						>
							{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
							<span>Menú</span>
						</button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Portal>
						<DropdownMenu.Content
							align="end"
							sideOffset={10}
							className="z-50 w-[min(92vw,320px)] border border-ink/30 bg-mist p-2 shadow-[0_12px_32px_-12px_rgba(30,45,41,0.45)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2"
						>
							{navLinks.map((link) => (
								<DropdownMenu.Item key={link.href} asChild>
									<Link
										href={link.href}
										className={`flex items-center justify-between px-3 py-4 font-display text-2xl outline-none data-[highlighted]:bg-mist-deep ${
											isActive(pathname, link.href) ? "text-water-deep" : "text-ink"
										}`}
									>
										{link.label}
									</Link>
								</DropdownMenu.Item>
							))}
							<div className="contour mx-3 my-2 text-ink/40" />
							<a
								href="https://smartregionscenter.com.co/"
								target="_blank"
								rel="noopener noreferrer"
								className="relative mx-3 my-2 block h-10 w-24"
								aria-label="Smart Regions Center (abre en otra pestaña)"
							>
								<Image src="/cdt-logo.png" alt="" fill sizes="96px" className="object-contain object-left" />
							</a>
						</DropdownMenu.Content>
					</DropdownMenu.Portal>
				</DropdownMenu.Root>
			</div>
		</header>
	);
}
