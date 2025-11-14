"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.push("/explore")}
			className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-colors"
		>
			<ChevronLeft size={20} />
			<span>Volver</span>
		</button>
	);
}
