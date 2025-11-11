"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { SpeciesRow } from "@/lib/types";
import { useMemo, useState } from "react";
import SpeciesCard from "./species-card";

export default function SpeciesList({
	rows,
}: {
	rows: (SpeciesRow & { poster: string })[];
}) {
	const [filter, setFilter] = useState<string>("all");

	const filtered = useMemo(() => {
		if (filter === "all") return rows;
		return rows.filter(
			(r) => (r.type ?? "").toLowerCase() === filter.toLowerCase(),
		);
	}, [filter, rows]);

	return (
		<div>
			<div className="flex items-center justify-between mb-6 gap-4">
				<div>
					<Select value={filter} onValueChange={(v) => setFilter(v)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todas</SelectItem>
							<SelectItem value="fauna">Fauna</SelectItem>
							<SelectItem value="flora">Flora</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="text-sm text-white/70">
					{filtered.length} resultados
				</div>
			</div>

			{/* key the grid by `filter` so it remounts when the filter changes
				— this forces the BlurFade animations to run as a stacked entrance
				every time the filter changes. */}
			<div
				key={filter}
				className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			>
				{filtered.map((sp, i) => (
					<BlurFade
						key={sp.id}
						delay={i * 0.05}
						duration={0.38}
						offset={8}
						className="w-full"
					>
						<SpeciesCard
							href={`/species/${sp.id}`}
							title={sp.common_name}
							subtitle={sp.scientific_name}
							image={sp.poster}
							picOwner={sp.pic_owner}
							licenseType={sp.license_type}
						/>
					</BlurFade>
				))}
			</div>
		</div>
	);
}
