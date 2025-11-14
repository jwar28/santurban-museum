"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

interface ModelPreloaderProps {
	urls: string[];
}

export default function ModelPreloader({ urls }: ModelPreloaderProps) {
	useEffect(() => {
		// Preload models progressively with a delay between each
		let currentIndex = 0;
		const preloadNext = () => {
			if (currentIndex < urls.length) {
				const url = urls[currentIndex];
				if (url) {
					// Preload the model
					useGLTF.preload(url);
				}
				currentIndex++;
				// Delay before loading next model to avoid overwhelming the browser
				setTimeout(preloadNext, 500);
			}
		};

		// Start preloading after a small delay to let the page settle
		const timeoutId = setTimeout(preloadNext, 1000);

		return () => clearTimeout(timeoutId);
	}, [urls]);

	return null;
}
