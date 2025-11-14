"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import FadeContent from "./fade-content";

export default function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// Keying by pathname forces the fade animation to re-run on route change
	// FadeContent expects duration in milliseconds; use ~750ms to match previous timing
	return (
		<FadeContent
			key={pathname}
			duration={450}
			delay={30}
			blur={false}
			className="min-h-screen"
		>
			{children}
		</FadeContent>
	);
}
