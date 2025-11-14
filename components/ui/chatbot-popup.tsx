"use client";

import { Button } from "@/components/ui/button";
import type { Message } from "@/components/ui/chat-message";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChatbotPopupProps {
	className?: string;
}

export function ChatbotPopup({ className }: ChatbotPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);

	const handleSubmit = async (event?: { preventDefault?: () => void }) => {
		event?.preventDefault?.();

		if (!input.trim() || isGenerating) return;

		const userInput = input.trim();

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

	return (
		<>
			{/* Botón flotante con el logo */}
			<motion.button
				onClick={() => setIsOpen(true)}
				className={cn(
					"fixed bottom-20 left-4 z-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-3 shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/50 md:bottom-6 md:left-6 md:p-4",
					isOpen && "hidden",
					className,
				)}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 260, damping: 20 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				aria-label="Abrir chatbot"
			>
				<Image
					src="/logo.svg"
					alt="Chatbot"
					width={40}
					height={40}
					className="h-8 w-8 md:h-10 md:w-10"
				/>
				<motion.div
					className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white md:h-6 md:w-6"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.5 }}
				>
					<MessageCircle className="h-3 w-3" />
				</motion.div>
			</motion.button>

			{/* Popup del chatbot */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay para móviles */}
						<motion.div
							className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							className="fixed inset-x-4 bottom-4 top-20 z-50 flex flex-col overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0b1210] shadow-2xl md:inset-auto md:bottom-6 md:left-6 md:h-[600px] md:w-[400px]"
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 50, scale: 0.9 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
						>
							{/* Header */}
							<div className="flex items-center justify-between border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 p-4">
								<div className="flex items-center gap-3">
									<div className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 p-2">
										<Image
											src="/logo.svg"
											alt="Logo"
											width={24}
											height={24}
											className="h-6 w-6"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-white">
											Asistente Santurbán
										</h3>
										<p className="text-xs text-emerald-400">
											Siempre disponible
										</p>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsOpen(false)}
									className="h-8 w-8 hover:bg-emerald-500/20"
								>
									<X className="h-5 w-5" />
								</Button>
							</div>

							{/* Chat Container */}
							<div className="flex flex-1 flex-col overflow-hidden">
								{/* Messages Area */}
								<div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
									{messages.length === 0 ? (
										<div className="flex h-full flex-col items-center justify-center text-center">
											<div className="rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 p-6 mb-4">
												<MessageCircle className="h-12 w-12 text-emerald-400" />
											</div>
											<h3 className="text-lg font-semibold text-white mb-2">
												¡Bienvenido!
											</h3>
											<p className="text-sm text-gray-400 max-w-xs">
												Soy el asistente virtual del Museo de Santurbán. ¿En qué
												puedo ayudarte hoy?
											</p>
										</div>
									) : (
										<>
											<MessageList
												messages={messages}
												isTyping={isGenerating}
											/>
											<div ref={lastMessageRef} />
										</>
									)}
								</div>

								{/* Input Area */}
								<div className="border-t border-emerald-500/20 bg-[#0f1715] p-4">
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
											placeholder="Escribe tu mensaje..."
											isGenerating={isGenerating}
											stop={stop}
											allowAttachments={false}
											className="w-full resize-none rounded-xl border border-emerald-500/30 bg-[#0b1210] px-4 py-3 pr-12 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
