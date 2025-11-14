import { useAudioStore } from "@/lib/store/audio-store";
import { useEffect, useState } from "react";

interface UseAudioOptions {
	bucketName?: string;
	autoLoad?: boolean;
}

/**
 * Hook personalizado para cargar y usar audios con la store
 * @param audioFileName - Nombre del archivo de audio
 * @param options - Opciones de configuración
 * @returns Estado del audio (url, loading, error)
 */
export function useAudio(audioFileName: string, options: UseAudioOptions = {}) {
	const { bucketName = "audios", autoLoad = true } = options;

	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const getAudioUrl = useAudioStore((state) => state.getAudioUrl);
	const isAudioLoaded = useAudioStore((state) => state.isAudioLoaded);

	useEffect(() => {
		if (!autoLoad) return;

		const loadAudio = async () => {
			try {
				setIsLoading(true);
				setHasError(false);

				const url = await getAudioUrl(audioFileName, bucketName);

				if (!url) {
					throw new Error("No se pudo obtener la URL del audio");
				}

				setAudioUrl(url);
				setIsLoading(false);
			} catch (error) {
				console.error(`Error loading audio ${audioFileName}:`, error);
				setHasError(true);
				setIsLoading(false);
			}
		};

		loadAudio();
	}, [audioFileName, bucketName, autoLoad, getAudioUrl]);

	return {
		audioUrl,
		isLoading,
		hasError,
		isPreloaded: isAudioLoaded(audioFileName),
	};
}
