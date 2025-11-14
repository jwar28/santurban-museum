"use client";

import { useAudioStore } from "@/lib/store/audio-store";
import { useEffect } from "react";

/**
 * Componente que precarga todos los audios de la aplicación
 * para evitar demoras y errores al cargarlos bajo demanda
 */
export default function AudioPreloader() {
	const preloadMultipleAudios = useAudioStore(
		(state) => state.preloadMultipleAudios,
	);

	useEffect(() => {
		// Lista de todos los audios utilizados en la app
		const audioFiles = [
			// Audio de la página principal (Home)
			{ fileName: "intro.mp3" },

			// Audio de la página Explora
			{ fileName: "explora.mp3" },

			// Audio de la página Santurbán
			{ fileName: "conservacion.mp3" },

			// Audio de la página Acerca de
			{ fileName: "creditos.mp3" },

			// Audios de especies (generados dinámicamente desde sus GLB)
			// Estos se irán cargando conforme se navegue a las especies
			// pero se pueden precargar algunos comunes aquí:
			{ fileName: "oso_de_anteojos.mp3" },
			{ fileName: "frailejon.mp3" },
			{ fileName: "sapo.mp3" },
			{ fileName: "venado.mp3" },
			{ fileName: "puma.mp3" },
			{ fileName: "aguila.mp3" },
		];

		// Precargar todos los audios en background
		preloadMultipleAudios(audioFiles).then(() => {
			console.log("✅ Audios precargados exitosamente");
		});
	}, [preloadMultipleAudios]);

	// Este componente no renderiza nada, solo precarga en background
	return null;
}
