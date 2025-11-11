"use client";

import Image from "next/image";
import Link from "next/link";

export default function SpeciesCard({
	href,
	title,
	subtitle,
	image,
	picOwner,
	licenseType,
}: {
	href: string;
	title: string;
	subtitle: string;
	image: string;
	picOwner?: string | null;
	licenseType?: string | null;
}) {
	return (
		<Link
			href={href}
			className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 transition-all hover:ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,.45)]"
		>
			<div className="relative h-48 md:h-56">
				<Image
					src={image}
					alt={title}
					fill
					unoptimized
					className="object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-300"
					sizes="(min-width: 768px) 33vw, 100vw"
				/>
				{/* Dark overlay by default; it fades out on hover so the image returns to original color */}
				<div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-300" />
			</div>

			{/* Photo Credits */}
			{picOwner && licenseType && (
				<div className="absolute top-0 right-0 bg-black/70 px-2 py-0.5 text-[9px] text-gray-200/90 backdrop-blur-sm z-10 rounded-bl-md">
					Foto por {picOwner} bajo licencia {licenseType}
				</div>
			)}

			<div className="absolute inset-0 p-5 flex flex-col justify-end pointer-events-none">
				<h3 className="text-white font-extrabold text-lg md:text-xl">
					{title}
				</h3>
				<p className="text-emerald-300/90 text-sm">{subtitle}</p>
			</div>
		</Link>
	);
}
