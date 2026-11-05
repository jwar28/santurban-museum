"use client";

import { usePathname } from "next/navigation";
import type React from "react";

/** Fundido breve al cambiar de sala. El contenido nunca depende de estar a la vista para aparecer. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	return (
		<div key={pathname} className="page-in min-h-screen">
			{children}
		</div>
	);
}
