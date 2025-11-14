/**
 * EJEMPLO DE INTEGRACIÓN DE CONTEXTO DE PÁGINA
 *
 * Este archivo muestra cómo extender el chatbot para que sepa
 * en qué página está el usuario y proporcione respuestas contextuales.
 *
 * Para usarlo:
 * 1. Descomenta el código que necesites
 * 2. Importa las funciones en chatbot-popup.tsx
 * 3. Agrega pageContext al body del fetch en handleSubmit
 */

/**
 * Detecta información sobre la página actual
 */
export function getCurrentPageContext() {
	if (typeof window === "undefined") return null;

	const path = window.location.pathname;

	// Página de inicio
	if (path === "/") {
		return {
			type: "home",
			context: "El usuario está en la página de inicio del museo virtual.",
		};
	}

	// Página de Conoce Santurbán
	if (path === "/santurban") {
		return {
			type: "about-santurban",
			context:
				"El usuario está leyendo información detallada sobre el Páramo de Santurbán.",
		};
	}

	// Página de exploración de especies
	if (path === "/explore") {
		return {
			type: "species-list",
			context:
				"El usuario está viendo la galería de especies del páramo. Puede sugerirle explorar especies específicas.",
		};
	}

	// Página de detalle de especie
	if (path.startsWith("/species/")) {
		const speciesId = path.split("/")[2];
		return {
			type: "species-detail",
			speciesId,
			context: `El usuario está viendo los detalles de una especie específica (ID: ${speciesId}). Puedes responder preguntas sobre esta especie en particular.`,
		};
	}

	// Página Acerca de
	if (path === "/about") {
		return {
			type: "about",
			context: "El usuario está en la página 'Acerca de' del museo.",
		};
	}

	return {
		type: "unknown",
		context: "El usuario está navegando el museo virtual.",
	};
}

/**
 * Genera sugerencias de preguntas según la página
 */
export function getContextualSuggestions(pageType: string): string[] {
	const suggestions: Record<string, string[]> = {
		home: [
			"¿Qué es el Páramo de Santurbán?",
			"¿Por qué es importante este ecosistema?",
			"¿Qué especies puedo encontrar aquí?",
		],
		"about-santurban": [
			"¿Cuánta agua produce el páramo?",
			"¿Qué amenazas enfrenta?",
			"¿Cómo puedo visitar el páramo?",
		],
		"species-list": [
			"¿Cuántas especies hay en el museo?",
			"¿Cuál es la especie más emblemática?",
			"Háblame de los frailejones",
		],
		"species-detail": [
			"¿Cuál es su hábitat natural?",
			"¿Está en peligro de extinción?",
			"¿Qué come esta especie?",
		],
	};

	return suggestions[pageType] || suggestions.home;
}

/**
 * EJEMPLO DE USO EN chatbot-popup.tsx:
 *
 * import { getCurrentPageContext } from '@/lib/page-context-example';
 *
 * const handleSubmit = async (event) => {
 *   // ... código existente ...
 *
 *   const pageContext = getCurrentPageContext();
 *
 *   const response = await fetch("/api/chat", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({
 *       message: userInput,
 *       history,
 *       pageContext, // 👈 Agregar esto
 *     }),
 *   });
 * };
 */

/**
 * EJEMPLO DE USO EN /app/api/chat/route.ts:
 *
 * export async function POST(req: NextRequest) {
 *   const { message, history = [], pageContext } = await req.json();
 *
 *   let contextualInfo = "";
 *
 *   if (pageContext?.type === "species-detail" && pageContext.speciesId) {
 *     // Obtener información de la especie desde Supabase
 *     const supabase = await createClient();
 *     const { data: species } = await supabase
 *       .from('species')
 *       .select('*')
 *       .eq('id', pageContext.speciesId)
 *       .single();
 *
 *     if (species) {
 *       contextualInfo = `
 *         CONTEXTO ADICIONAL:
 *         El usuario está viendo información sobre: ${species.common_name}
 *         Nombre científico: ${species.scientific_name}
 *         Familia: ${species.family}
 *         Estado de conservación: ${species.conservation_status}
 *         Descripción: ${species.description}
 *
 *         Usa esta información para responder preguntas específicas sobre esta especie.
 *       `;
 *     }
 *   }
 *
 *   // Agregar contextualInfo al prompt del sistema
 * }
 */
