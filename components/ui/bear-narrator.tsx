"use client";

import { useEffect, useState } from "react";

/** Estado del oso guía: habla mientras suena una narración y saluda de vez en cuando. */
export function useBearState() {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isSaluting, setIsSaluting] = useState(false);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const salute = reduce
			? undefined
			: setInterval(() => setIsSaluting((prev) => !prev), 3200);

		const onAudio = (e: Event) => {
			setIsSpeaking((e as CustomEvent<{ isPlaying: boolean }>).detail.isPlaying);
		};
		window.addEventListener("audioStateChange", onAudio);
		return () => {
			if (salute) clearInterval(salute);
			window.removeEventListener("audioStateChange", onAudio);
		};
	}, []);

	const src = isSpeaking
		? isSaluting
			? "/bear/speaking_salute.png"
			: "/bear/speaking.png"
		: isSaluting
			? "/bear/idle_salute.png"
			: "/bear/idle.png";

	return { src, isSpeaking, isSaluting };
}

export default function BearNarrator({
	wrapperClassName = "",
	imgClassName = "w-40 md:w-56",
}: {
	wrapperClassName?: string;
	imgClassName?: string;
}) {
	const { src } = useBearState();
	return (
		<div className={`flex items-end justify-center ${wrapperClassName}`} aria-hidden>
			<img src={src} alt="" className={`${imgClassName} h-auto select-none`} />
		</div>
	);
}
