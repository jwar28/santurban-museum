"use client";

import { useEffect, useState } from "react";

export default function BearNarrator({
	wrapperClassName = "",
	imgClassName = "w-40 md:w-56",
}: {
	wrapperClassName?: string;
	imgClassName?: string;
}) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isSaluting, setIsSaluting] = useState(false);

	useEffect(() => {
		let mounted = true;

		// Alterna entre normal y saludando cada 3 segundos
		const saluteInterval = setInterval(() => {
			if (mounted) {
				setIsSaluting((prev) => !prev);
			}
		}, 3000);

		// Escuchar eventos personalizados de cambio de estado del audio
		const handleAudioStateChange = (e: Event) => {
			const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
			if (mounted) {
				setIsSpeaking(customEvent.detail.isPlaying);
			}
		};

		window.addEventListener("audioStateChange", handleAudioStateChange);

		return () => {
			mounted = false;
			clearInterval(saluteInterval);
			window.removeEventListener("audioStateChange", handleAudioStateChange);
		};
	}, []);

	// Determinar qué imagen mostrar
	const getImageSrc = () => {
		if (isSpeaking) {
			return isSaluting ? "/bear/speaking_salute.png" : "/bear/speaking.png";
		}
		return isSaluting ? "/bear/idle_salute.png" : "/bear/idle.png";
	};

	const getAltText = () => {
		if (isSpeaking) {
			return isSaluting ? "Oso hablando y saludando" : "Oso hablando";
		}
		return isSaluting ? "Oso saludando" : "Oso";
	};

	return (
		<div
			className={`flex items-center justify-center ${wrapperClassName}`}
			aria-hidden
		>
			<img
				src={getImageSrc()}
				alt={getAltText()}
				className={`${imgClassName} h-auto select-none transition-opacity duration-300`}
			/>
		</div>
	);
}
