"use client";

import { createClient } from "@/lib/supabase/client";
import { Loader2, Pause, Play, Volume2 } from "lucide-react";
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

				// Verificar si el archivo existe haciendo un fetch
				const response = await fetch(publicUrl, { method: "HEAD" });
				console.log("Estado de la respuesta:", response.status);

				if (!response.ok) {
					throw new Error(`Archivo no encontrado: ${response.status}`);
				}

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
			console.log("Duration cargada:", audio.duration);
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
			console.log("Audio playing");
			setIsPlaying(true);
			// Disparar evento cuando el audio empieza a reproducirse
			window.dispatchEvent(
				new CustomEvent("audioStateChange", { detail: { isPlaying: true } }),
			);
		};
		const handlePause = () => {
			console.log("Audio paused");
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
			console.log("Audio listo para reproducir");
			setIsLoading(false);
			setHasError(false);
		};
		const handleLoadStart = () => {
			console.log("Iniciando carga del audio...");
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

	// Mostrar estado de error
	if (hasError) {
		return (
			<div
				className={`group flex items-center gap-3 px-5 py-4 rounded-full bg-slate-800/40 backdrop-blur-sm border border-red-500/20 ${className}`}
			>
				<div className="text-sm text-red-400">⚠️ Error al cargar el audio</div>
			</div>
		);
	}

	return (
		<div
			className={`group flex items-center gap-4 px-5 py-4 rounded-full bg-slate-800/40 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 ${className}`}
		>
			{/* Audio element */}
			<audio
				ref={audioRef}
				src={audioUrl}
				preload="metadata"
				crossOrigin="anonymous"
			>
				<track kind="captions" />
			</audio>

			{/* Play/Pause Button */}
			<button
				type="button"
				onClick={togglePlayPause}
				disabled={isLoading}
				className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label={isPlaying ? "Pausar" : "Reproducir"}
			>
				{isLoading ? (
					<Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
				) : isPlaying ? (
					<Pause className="w-4 h-4 text-emerald-400" />
				) : (
					<Play className="w-4 h-4 text-emerald-400 ml-0.5" />
				)}
			</button>

			{/* Progress Bar */}
			<div className="flex-1 flex items-center gap-3">
				<button
					type="button"
					className="relative flex-1 h-1.5 bg-slate-700/50 rounded-full cursor-pointer overflow-hidden group/progress"
					onClick={handleProgressClick}
					onKeyDown={handleProgressClick}
					aria-label="Barra de progreso del audio"
				>
					{/* Progress */}
					<div
						className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-100 pointer-events-none"
						style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
					/>
					{/* Hover effect */}
					<div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none" />
				</button>

				{/* Time */}
				<div className="flex-shrink-0 text-xs text-slate-400 font-mono min-w-[80px] text-right">
					{formatTime(currentTime)} / {formatTime(duration)}
				</div>
			</div>

			{/* Volume Icon */}
			<Volume2 className="flex-shrink-0 w-4 h-4 text-emerald-400/60 group-hover:text-emerald-400 transition-colors" />
		</div>
	);
}
