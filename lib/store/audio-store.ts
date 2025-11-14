import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";

interface AudioState {
	url: string | null;
	isLoading: boolean;
	hasError: boolean;
	lastFetched?: number;
}

interface AudioStore {
	// Cache de URLs de audio
	audioCache: Map<string, AudioState>;

	// Audio precargados para evitar demoras
	preloadedAudios: Set<string>;

	// Actions
	getAudioUrl: (
		audioFileName: string,
		bucketName?: string,
	) => Promise<string | null>;
	preloadAudio: (audioFileName: string, bucketName?: string) => Promise<void>;
	preloadMultipleAudios: (
		audioFiles: Array<{ fileName: string; bucketName?: string }>,
	) => Promise<void>;
	clearCache: () => void;
	isAudioLoaded: (audioFileName: string) => boolean;
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

export const useAudioStore = create<AudioStore>((set, get) => ({
	audioCache: new Map(),
	preloadedAudios: new Set(),

	getAudioUrl: async (audioFileName: string, bucketName = "audios") => {
		const cacheKey = `${bucketName}/${audioFileName}`;
		const cached = get().audioCache.get(cacheKey);

		// Si está en cache y no ha expirado, retornar
		if (
			cached?.url &&
			!cached.hasError &&
			cached.lastFetched &&
			Date.now() - cached.lastFetched < CACHE_DURATION
		) {
			return cached.url;
		}

		// Marcar como loading
		set((state) => {
			const newCache = new Map(state.audioCache);
			newCache.set(cacheKey, {
				url: null,
				isLoading: true,
				hasError: false,
			});
			return { audioCache: newCache };
		});

		try {
			const supabase = createClient();
			const {
				data: { publicUrl },
			} = supabase.storage.from(bucketName).getPublicUrl(audioFileName);

			// Verificar que el archivo existe
			const response = await fetch(publicUrl, { method: "HEAD" });

			if (!response.ok) {
				throw new Error(`Audio file not found: ${response.status}`);
			}

			// Guardar en cache
			set((state) => {
				const newCache = new Map(state.audioCache);
				const newPreloaded = new Set(state.preloadedAudios);
				newCache.set(cacheKey, {
					url: publicUrl,
					isLoading: false,
					hasError: false,
					lastFetched: Date.now(),
				});
				newPreloaded.add(cacheKey);
				return { audioCache: newCache, preloadedAudios: newPreloaded };
			});

			return publicUrl;
		} catch (error) {
			console.error(`Error loading audio ${audioFileName}:`, error);

			// Marcar error en cache
			set((state) => {
				const newCache = new Map(state.audioCache);
				newCache.set(cacheKey, {
					url: null,
					isLoading: false,
					hasError: true,
					lastFetched: Date.now(),
				});
				return { audioCache: newCache };
			});

			return null;
		}
	},

	preloadAudio: async (audioFileName: string, bucketName = "audios") => {
		await get().getAudioUrl(audioFileName, bucketName);
	},

	preloadMultipleAudios: async (
		audioFiles: Array<{ fileName: string; bucketName?: string }>,
	) => {
		// Precargar todos los audios en paralelo
		await Promise.allSettled(
			audioFiles.map(({ fileName, bucketName }) =>
				get().preloadAudio(fileName, bucketName),
			),
		);
	},

	clearCache: () => {
		set({ audioCache: new Map(), preloadedAudios: new Set() });
	},

	isAudioLoaded: (audioFileName: string) => {
		const cacheKey = `audios/${audioFileName}`;
		return get().preloadedAudios.has(cacheKey);
	},
}));
