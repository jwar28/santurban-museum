"use client";

import { createClient } from "@/lib/supabase/client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
	bucketName?: string;
	audioFileName: string;
	className?: string;
	autoPlay?: boolean;
}

export default function AudioPlayer({
	bucketName = "audios",
	audioFileName,
	className = "",
	autoPlay = false,
}: AudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	// Obtener URL del audio desde Supabase
	useEffect(() => {
		const loadAudio = async () => {
			try {
				setIsLoading(true);
				setHasError(false);
				const supabase = createClient();
				const {
					data: { publicUrl },
				} = supabase.storage.from(bucketName).getPublicUrl(audioFileName);

				setAudioUrl(publicUrl);
			} catch (error) {
				console.error("Error loading audio:", error);
				setHasError(true);
				setIsLoading(false);
			}
		};

		loadAudio();
	}, [bucketName, audioFileName]);

	// Actualizar tiempo actual y manejar eventos del audio
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !audioUrl) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => {
			setDuration(audio.duration);
			setIsLoading(false);
		};
		const handleEnded = () => {
			setIsPlaying(false);
			// Disparar evento personalizado cuando el audio termina
			window.dispatchEvent(
				new CustomEvent("audioStateChange", { detail: { isPlaying: false } }),
			);
		};
		const handlePlay = () => {
			setIsPlaying(true);
			// Disparar evento cuando el audio empieza a reproducirse
			window.dispatchEvent(
				new CustomEvent("audioStateChange", { detail: { isPlaying: true } }),
			);
		};
		const handlePause = () => {
			setIsPlaying(false);
			// Disparar evento cuando el audio se pausa
			window.dispatchEvent(
				new CustomEvent("audioStateChange", { detail: { isPlaying: false } }),
			);
		};
		const handleError = (e: Event) => {
			console.error("Error al cargar el audio:", e);
			setHasError(true);
			setIsLoading(false);
		};
		const handleCanPlay = () => {
			setIsLoading(false);
			setHasError(false);
		};
		const handleLoadStart = () => {
		};

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);
		audio.addEventListener("ended", handleEnded);
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);
		audio.addEventListener("error", handleError);
		audio.addEventListener("canplay", handleCanPlay);
		audio.addEventListener("loadstart", handleLoadStart);

		// Forzar carga del audio
		audio.load();

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
			audio.removeEventListener("error", handleError);
			audio.removeEventListener("canplay", handleCanPlay);
			audio.removeEventListener("loadstart", handleLoadStart);
		};
	}, [audioUrl]);

	// Autoplay con manejo de promesa
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !audioUrl || !autoPlay) return;

		const playAudio = async () => {
			try {
				await audio.play();
				// El evento 'play' del audio disparará el evento personalizado
			} catch (error) {
				console.warn("Autoplay bloqueado por el navegador:", error);
				// El navegador bloqueó el autoplay, que es normal
			}
		};

		// Pequeño delay para asegurar que el audio esté completamente listo
		const timer = setTimeout(() => {
			playAudio();
		}, 500);

		return () => clearTimeout(timer);
	}, [audioUrl, autoPlay]);

	const togglePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
			// El evento 'pause' del audio disparará el evento personalizado
		} else {
			audio.play();
			// El evento 'play' del audio disparará el evento personalizado
		}
	};

	const handleProgressClick = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.KeyboardEvent<HTMLButtonElement>,
	) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (e.type === "keydown") {
			const keyEvent = e as React.KeyboardEvent<HTMLButtonElement>;
			if (keyEvent.key !== "Enter" && keyEvent.key !== " ") return;
			keyEvent.preventDefault();
		}

		const bounds = e.currentTarget.getBoundingClientRect();
		const x = "clientX" in e ? e.clientX - bounds.left : bounds.width / 2;
		const percentage = x / bounds.width;
		audio.currentTime = percentage * duration;
	};

	const formatTime = (time: number) => {
		if (Number.isNaN(time)) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	if (!audioUrl) return null;

	// Sin narración disponible, la sala se lee igual: el reproductor se retira.
	if (hasError) return null;

	const progress = (currentTime / duration) * 100 || 0;

	return (
		<div
			className={`flex items-center gap-4 border border-ink/30 bg-mist py-2 pl-2 pr-4 shadow-[0_10px_28px_-14px_rgba(30,45,41,0.5)] ${className}`}
		>
			<audio ref={audioRef} src={audioUrl} preload="none" crossOrigin="anonymous">
				<track kind="captions" />
			</audio>

			<button
				type="button"
				onClick={togglePlayPause}
				aria-busy={isLoading && isPlaying}
				className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-ink text-mist transition-colors duration-300 ease-out hover:bg-water-deep disabled:cursor-not-allowed disabled:opacity-50"
				aria-label={isPlaying ? "Pausar la narración" : "Escuchar la narración"}
			>
				{isPlaying ? (
					<Pause className="h-4 w-4" />
				) : (
					<Play className="ml-0.5 h-4 w-4" />
				)}
			</button>

			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="flex items-baseline justify-between gap-4">
					<span className="label text-ink">Guía de sala</span>
					<span className="tabular text-xs text-ink-soft">
						{formatTime(currentTime)} / {formatTime(duration)}
					</span>
				</div>
				<button
					type="button"
					className="group/progress relative h-3 w-full cursor-pointer"
					onClick={handleProgressClick}
					onKeyDown={handleProgressClick}
					aria-label="Avanzar o retroceder la narración"
				>
					<span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/40" />
					<span
						className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 bg-water transition-[width] duration-100"
						style={{ width: `${progress}%` }}
					/>
					<span
						className="absolute top-1/2 h-3 w-[3px] -translate-y-1/2 bg-ink"
						style={{ left: `calc(${progress}% - 1px)` }}
					/>
				</button>
			</div>
		</div>
	);
}
