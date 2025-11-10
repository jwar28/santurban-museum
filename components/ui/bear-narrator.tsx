"use client";

import { useEffect, useState } from "react";

export default function BearNarrator({
	wrapperClassName = "",
	imgClassName = "w-40 md:w-56",
}: {
	wrapperClassName?: string;
	imgClassName?: string;
}) {
	const [speaking, setSpeaking] = useState(false);

	useEffect(() => {
		let mounted = true;

		// Cycle: idle for idleMs, then speak for speakMs, repeat
		const idleMs = 4800;
		const speakMs = 2200;

		let speakTimeout: ReturnType<typeof setTimeout>;
		let idleTimeout: ReturnType<typeof setTimeout>;

		function startIdleCycle() {
			if (!mounted) return;
			// ensure state idle
			setSpeaking(false);
			idleTimeout = setTimeout(() => {
				if (!mounted) return;
				setSpeaking(true);
				speakTimeout = setTimeout(() => {
					if (!mounted) return;
					startIdleCycle();
				}, speakMs);
			}, idleMs);
		}

		startIdleCycle();

		return () => {
			mounted = false;
			clearTimeout(speakTimeout);
			clearTimeout(idleTimeout);
		};
	}, []);

	const src = speaking ? "/talking-bear.png" : "/idle-bear.png";

	return (
		<div
			className={`flex items-center justify-center ${wrapperClassName}`}
			aria-hidden
		>
			<img
				src={src}
				alt={speaking ? "Oso hablando" : "Oso"}
				className={`${imgClassName} h-auto select-none`}
			/>
		</div>
	);
}
