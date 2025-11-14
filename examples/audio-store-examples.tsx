/**
 * EJEMPLOS DE USO - Audio Store
 *
 * Este archivo contiene ejemplos prácticos de cómo usar
 * el sistema de caché de audios en diferentes escenarios
 */

// ============================================
// EJEMPLO 1: Uso básico con AudioPlayer
// ============================================
import AudioPlayer from "@/components/ui/audio-player";

export function Example1_BasicUsage() {
	return (
		<div>
			{/* El AudioPlayer automáticamente usa la store */}
			<AudioPlayer audioFileName="intro.mp3" autoPlay={false} />
		</div>
	);
}

// ============================================
// EJEMPLO 2: Hook useAudio para casos personalizados
// ============================================
import { useAudio } from "@/hooks/use-audio";

export function Example2_CustomAudioPlayer() {
	const { audioUrl, isLoading, hasError, isPreloaded } = useAudio("intro.mp3");

	return (
		<div>
			{isPreloaded && <span>✅ Audio precargado</span>}
			{isLoading && <div>⏳ Cargando audio...</div>}
			{hasError && <div>❌ Error al cargar audio</div>}
			{audioUrl && (
				<audio src={audioUrl} controls>
					Tu navegador no soporta audio HTML5
				</audio>
			)}
		</div>
	);
}

import { useEffect } from "react";
// ============================================
// EJEMPLO 3: Precarga manual de audios
// ============================================
import { useAudioStore } from "@/lib/store/audio-store";

export function Example3_ManualPreload() {
	const preloadAudio = useAudioStore((state) => state.preloadAudio);
	const isAudioLoaded = useAudioStore((state) => state.isAudioLoaded);

	useEffect(() => {
		// Precargar audio cuando el componente se monta
		preloadAudio("siguiente-audio.mp3");
	}, [preloadAudio]);

	return (
		<div>
			Estado:{" "}
			{isAudioLoaded("siguiente-audio.mp3") ? "✅ Listo" : "⏳ Cargando"}
		</div>
	);
}

// ============================================
// EJEMPLO 4: Precarga múltiple con feedback
// ============================================
import { useState } from "react";

export function Example4_MultiplePreload() {
	const [isPreloading, setIsPreloading] = useState(false);
	const [preloadedCount, setPreloadedCount] = useState(0);
	const preloadMultipleAudios = useAudioStore(
		(state) => state.preloadMultipleAudios,
	);

	const handlePreload = async () => {
		setIsPreloading(true);
		setPreloadedCount(0);

		const audios = [
			{ fileName: "audio1.mp3" },
			{ fileName: "audio2.mp3" },
			{ fileName: "audio3.mp3" },
		];

		await preloadMultipleAudios(audios);

		setPreloadedCount(audios.length);
		setIsPreloading(false);
	};

	return (
		<div>
			<button onClick={handlePreload} disabled={isPreloading} type="button">
				{isPreloading ? "Precargando..." : "Precargar Audios"}
			</button>
			{preloadedCount > 0 && <p>✅ {preloadedCount} audios precargados</p>}
		</div>
	);
}

// ============================================
// EJEMPLO 5: Playlist con precarga inteligente
// ============================================
export function Example5_SmartPlaylist() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const _getAudioUrl = useAudioStore((state) => state.getAudioUrl);
	const preloadAudio = useAudioStore((state) => state.preloadAudio);

	const playlist = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];

	useEffect(() => {
		// Precargar el siguiente audio en la lista
		const nextIndex = (currentIndex + 1) % playlist.length;
		preloadAudio(playlist[nextIndex]);
	}, [currentIndex, preloadAudio]);

	const playNext = () => {
		setCurrentIndex((prev) => (prev + 1) % playlist.length);
	};

	return (
		<div>
			<AudioPlayer audioFileName={playlist[currentIndex]} autoPlay />
			<button onClick={playNext} type="button">
				⏭️ Siguiente
			</button>
			<p>
				Reproduciendo {currentIndex + 1} de {playlist.length}
			</p>
		</div>
	);
}

// ============================================
// EJEMPLO 6: Limpieza de caché al salir
// ============================================
export function Example6_CacheClear() {
	const clearCache = useAudioStore((state) => state.clearCache);

	const handleLogout = () => {
		// Limpiar caché al cerrar sesión
		clearCache();
		// ... resto de lógica de logout
	};

	return (
		<button onClick={handleLogout} type="button">
			Cerrar Sesión y Limpiar Caché
		</button>
	);
}

// ============================================
// EJEMPLO 7: Verificación de estado de caché
// ============================================
export function Example7_CacheStatus() {
	const audioCache = useAudioStore((state) => state.audioCache);
	const preloadedAudios = useAudioStore((state) => state.preloadedAudios);

	return (
		<div>
			<h3>Estado del Caché de Audios</h3>
			<p>Total en caché: {audioCache.size}</p>
			<p>Total precargados: {preloadedAudios.size}</p>

			<details>
				<summary>Ver detalles</summary>
				<ul>
					{Array.from(audioCache.entries()).map(([key, state]) => (
						<li key={key}>
							<strong>{key}</strong>:{" "}
							{state.isLoading
								? "⏳ Cargando"
								: state.hasError
									? "❌ Error"
									: "✅ Listo"}
						</li>
					))}
				</ul>
			</details>
		</div>
	);
}

// ============================================
// EJEMPLO 8: Uso con diferentes buckets
// ============================================
export function Example8_CustomBucket() {
	const { audioUrl } = useAudio("special-audio.mp3", {
		bucketName: "premium-audios",
	});

	return (
		<div>
			<h3>Audio desde bucket personalizado</h3>
			<AudioPlayer
				audioFileName="special-audio.mp3"
				bucketName="premium-audios"
			/>
		</div>
	);
}

// ============================================
// EJEMPLO 9: Carga condicional (lazy loading)
// ============================================
export function Example9_LazyLoad() {
	const [shouldLoad, setShouldLoad] = useState(false);
	const { audioUrl, isLoading } = useAudio("heavy-audio.mp3", {
		autoLoad: shouldLoad,
	});

	return (
		<div>
			{!shouldLoad ? (
				<button onClick={() => setShouldLoad(true)} type="button">
					📥 Cargar Audio
				</button>
			) : isLoading ? (
				<div>⏳ Cargando...</div>
			) : (
				<audio src={audioUrl || undefined} controls />
			)}
		</div>
	);
}

// ============================================
// EJEMPLO 10: Sistema de notificaciones de carga
// ============================================
export function Example10_LoadingNotifications() {
	const getAudioUrl = useAudioStore((state) => state.getAudioUrl);
	const [notification, setNotification] = useState("");

	const loadAudioWithNotification = async (fileName: string) => {
		setNotification(`⏳ Cargando ${fileName}...`);

		const url = await getAudioUrl(fileName);

		if (url) {
			setNotification(`✅ ${fileName} cargado exitosamente`);
		} else {
			setNotification(`❌ Error al cargar ${fileName}`);
		}

		setTimeout(() => setNotification(""), 3000);
	};

	return (
		<div>
			<button
				onClick={() => loadAudioWithNotification("intro.mp3")}
				type="button"
			>
				Cargar Audio
			</button>
			{notification && <div className="notification">{notification}</div>}
		</div>
	);
}
