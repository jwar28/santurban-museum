"use client";

import type { SpeciesRow } from "@/lib/types";
import { useMemo, useState } from "react";
import SpeciesCard from "./species-card";

type Filter = "all" | "fauna" | "flora";

export default function SpeciesList({
	rows,
}: {
	rows: (SpeciesRow & { poster: string })[];
}) {
	const [filter, setFilter] = useState<Filter>("all");

	const count = (f: Filter) =>
		f === "all" ? rows.length : rows.filter((r) => (r.type ?? "").toLowerCase() === f).length;

	const filtered = useMemo(
		() => (filter === "all" ? rows : rows.filter((r) => (r.type ?? "").toLowerCase() === filter)),
		[filter, rows],
	);

	const filters: { id: Filter; label: string }[] = [
		{ id: "all", label: "Todas" },
		{ id: "fauna", label: "Fauna" },
		{ id: "flora", label: "Flora" },
	];

	return (
		<div>
			<div
				role="group"
				aria-label="Filtrar la colección"
				className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-ink/30"
			>
				{filters.map((f) => (
					<button
						key={f.id}
						type="button"
						aria-pressed={filter === f.id}
						onClick={() => setFilter(f.id)}
						className={`-mb-px py-3 font-display text-2xl transition-colors duration-300 ${
							filter === f.id ? "border-b-2 border-ink text-ink" : "text-ink-soft hover:text-ink"
						}`}
					>
						{f.label}
						<span className="tabular ml-2 align-super font-sans text-xs">{count(f.id)}</span>
					</button>
				))}
			</div>

			{filtered.length === 0 ? (
				<p className="py-16 font-serif text-xl italic text-ink-soft">
					Todavía no hay piezas de este grupo en la colección.
				</p>
			) : (
				<ul className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filtered.map((sp) => (
						<li key={sp.id}>
							<SpeciesCard
								href={`/species/${sp.id}`}
								number={sp.id}
								title={sp.common_name}
								subtitle={sp.scientific_name}
								image={sp.poster}
								picOwner={sp.pic_owner}
								licenseType={sp.license_type}
								type={sp.type}
								status={sp.conservation_status}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
