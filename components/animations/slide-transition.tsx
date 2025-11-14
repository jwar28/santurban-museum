"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function SlideTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const direction = searchParams.get("direction");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Reset and trigger animation on pathname change
		setMounted(false);
		const timer = setTimeout(() => {
			setMounted(true);
		}, 10);
		return () => clearTimeout(timer);
	}, []);

	// Determine initial position based on direction
	const getInitialTransform = () => {
		if (!direction) return "0"; // No animation on direct access
		if (direction === "prev") {
			return "-100%"; // Coming from left
		}
		return "100%"; // Coming from right (next)
	};

	return (
		<div
			className="min-h-screen overflow-x-hidden"
			style={{
				transform: mounted
					? "translateX(0)"
					: `translateX(${getInitialTransform()})`,
				transition: "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
				willChange: "transform",
			}}
		>
			{children}
		</div>
	);
}
