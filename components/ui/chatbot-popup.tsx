"use client";

import type { Message } from "@/components/ui/chat-message";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ChatbotPopupProps {
	className?: string;
}

export function ChatbotPopup({ className }: ChatbotPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const pathname = usePathname();
	// En la portada móvil el botón espera a que el visitante deje atrás el perfil del páramo.
	const [pastHero, setPastHero] = useState(true);
	useEffect(() => {
		if (pathname !== "/") {
			setPastHero(true);
			return;
		}
		const check = () =>
			setPastHero(window.innerWidth >= 768 || window.scrollY > window.innerHeight * 0.85);
		check();
		window.addEventListener("scroll", check, { passive: true });
		window.addEventListener("resize", check);
		return () => {
			window.removeEventListener("scroll", check);
			window.removeEventListener("resize", check);
		};
	}, [pathname]);

	const handleSubmit = async (
		event?: { preventDefault?: () => void },
		override?: string,
	) => {
		event?.preventDefault?.();

		const userInput = (override ?? input).trim();
		if (!userInput || isGenerating) return;

		// Añadir mensaje del usuario
		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: userInput,
			createdAt: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsGenerating(true);

		try {
			// Preparar historial para la API (excluir el mensaje actual)
			const history = messages.map((msg) => ({
				role: msg.role,
				content: msg.content,
			}));

			// Llamar a la API
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: userInput,
					history,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				const errorMsg =
					(data as { error?: string }).error ||
					"Error al procesar la solicitud";
				throw new Error(errorMsg);
			}

			// Añadir respuesta del bot
			const botMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content: data.response,
				createdAt: new Date(),
			};

			setMessages((prev) => [...prev, botMessage]);
		} catch (err) {
			console.error("Error en chat:", err);

			// Añadir mensaje de error
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content:
					"Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
				createdAt: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsGenerating(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const stop = () => {
		setIsGenerating(false);
	};

	const lastMessageRef = useRef<HTMLDivElement>(null);

	// Scroll suave al último mensaje del asistente cuando se agrega uno nuevo
	useEffect(() => {
		if (messages.length > 0) {
			const lastMessage = messages[messages.length - 1];

			// Si el último mensaje es del asistente, hacer scroll a su inicio
			if (lastMessage.role === "assistant" && lastMessageRef.current) {
				// Pequeño delay para asegurar que el DOM se haya actualizado
				setTimeout(() => {
					lastMessageRef.current?.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}, 100);
			}
		}
	}, [messages.length, messages]);

	const suggestions = [
		"¿Por qué Santurbán es una fábrica de agua?",
		"¿Cómo atrapa el frailejón el agua de la niebla?",
		"¿Qué amenaza hoy al páramo?",
	];

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={cn(
					"fixed bottom-[5.5rem] right-4 z-40 flex h-12 w-12 items-center justify-center gap-2.5 border border-ink bg-mist md:w-auto md:justify-start md:px-4 text-sm font-semibold text-ink shadow-[0_10px_28px_-14px_rgba(30,45,41,0.6)] transition-colors duration-300 ease-out hover:bg-ink hover:text-mist md:bottom-6 md:right-6",
					(isOpen || !pastHero) && "hidden",
					className,
				)}
				aria-label="Abrir el asistente del museo"
			>
				<MessageCircle className="h-4 w-4" />
				<span className="hidden md:inline">Pregunta al museo</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							className="fixed inset-0 z-40 bg-ink/40 md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							role="dialog"
							aria-label="Asistente del Museo Santurbán"
							className="fixed inset-x-3 bottom-3 top-16 z-50 flex flex-col overflow-hidden border border-ink bg-mist text-ink shadow-[0_24px_60px_-24px_rgba(30,45,41,0.7)] md:inset-auto md:bottom-6 md:right-6 md:h-[620px] md:w-[420px]"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 24 }}
							transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
						>
							<div className="flex items-center justify-between border-b border-ink/30 px-5 py-4">
								<div className="flex items-center gap-3">
									<Image src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
									<div>
										<h2 className="font-display text-xl leading-none">Pregunta al museo</h2>
										<p className="mt-1 text-xs text-ink-soft">Asistente con IA · puede equivocarse</p>
									</div>
								</div>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="flex h-10 w-10 items-center justify-center text-ink transition-colors hover:bg-mist-deep"
									aria-label="Cerrar el asistente"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							<div className="flex flex-1 flex-col overflow-hidden">
								<div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-5">
									{messages.length === 0 ? (
										<div className="flex h-full flex-col justify-end">
											<p className="font-serif text-lg leading-relaxed">
												Pregunta lo que quieras sobre el páramo, sus especies o el
												agua que produce.
											</p>
											<ul className="mt-6 border-t border-ink/25">
												{suggestions.map((q) => (
													<li key={q} className="border-b border-ink/25">
														<button
															type="button"
															onClick={() => handleSubmit(undefined, q)}
															className="w-full py-3.5 text-left text-sm text-ink transition-colors hover:text-water-deep"
														>
															{q}
														</button>
													</li>
												))}
											</ul>
										</div>
									) : (
										<>
											<MessageList messages={messages} isTyping={isGenerating} />
											<div ref={lastMessageRef} />
										</>
									)}
								</div>

								<div className="border-t border-ink/30 bg-mist-deep p-4">
									<form
										onSubmit={(e) => {
											e.preventDefault();
											handleSubmit(e);
										}}
										className="relative"
									>
										<MessageInput
											value={input}
											onChange={handleInputChange}
											placeholder="Escribe tu pregunta…"
											isGenerating={isGenerating}
											stop={stop}
											allowAttachments={false}
											className="w-full resize-none border border-ink/40 bg-mist px-4 py-3 pr-12 text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
										/>
									</form>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
