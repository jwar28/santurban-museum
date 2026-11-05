import PlateImage from "@/components/paramo/plate-image";
import Link from "next/link";

export default function SpeciesCard({
	href,
	number,
	title,
	subtitle,
	image,
	picOwner,
	licenseType,
	type,
	status,
}: {
	href: string;
	number: number;
	title: string;
	subtitle: string;
	image: string;
	picOwner?: string | null;
	licenseType?: string | null;
	type?: string | null;
	status?: string | null;
}) {
	return (
		<Link href={href} className="group block">
			<div className="overflow-hidden border border-ink/40 bg-mist-deep p-2 transition-colors duration-300 ease-out group-hover:border-ink">
				<div className="overflow-hidden">
					<PlateImage
						src={image}
						alt={`${title} (${subtitle})`}
						caption={title}
						className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
					/>
				</div>
			</div>
			<div className="mt-4 flex items-baseline gap-4">
				<span className="tabular text-sm font-semibold text-ink-soft">Nº {String(number).padStart(2, "0")}</span>
				<div className="min-w-0">
					<h3 className="font-display text-2xl leading-tight transition-colors duration-300 group-hover:text-water-deep">
						{title}
					</h3>
					<p className="font-serif italic text-ink-soft">{subtitle}</p>
					{(type || status) && (
						<p className="mt-2 text-xs capitalize text-ink-soft">
							{[type, status].filter(Boolean).join(" · ")}
						</p>
					)}
				</div>
			</div>
			{picOwner && licenseType && (
				<p className="mt-2 pl-12 text-[0.7rem] leading-snug text-ink-soft">
					Foto: {picOwner}, {licenseType}
				</p>
			)}
		</Link>
	);
}
