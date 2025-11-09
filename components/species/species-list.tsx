"use client";

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

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filtered.map((sp) => (
					<SpeciesCard
						key={sp.id}
						href={`/species/${sp.id}`}
						title={sp.common_name}
						subtitle={sp.scientific_name}
						image={sp.poster}
					/>
				))}
			</div>
		</div>
	);
}
