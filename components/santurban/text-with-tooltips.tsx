/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import tooltipsData from "@/data/tooltips.json";

interface TextWithTooltipsProps {
	text: string;
	/** @deprecated el color lo hereda del texto */
	color?: string;
}

export function TextWithTooltips({
	text,
}: TextWithTooltipsProps) {
	// Replace {term} with tooltips and **text** with bold
	const parts = text.split(/(\{[^}]+\}|\*\*[^*]+\*\*)/g);


	return (
		<>
			{parts.map((part, index) => {
				// Skip empty parts
				if (!part) return null;

				// Handle tooltips {term}
				if (part.startsWith("{") && part.endsWith("}")) {
					const term = part.slice(1, -1);
					const tooltipText = tooltipsData[term as keyof typeof tooltipsData];

					if (tooltipText) {
						return (
							<Tooltip key={`tt-${term}-${index}`}>
								<TooltipTrigger
									className="cursor-help font-semibold underline decoration-current decoration-dotted decoration-[1.5px] underline-offset-[0.24em] transition-colors hover:decoration-solid"
								>
									{term}
								</TooltipTrigger>
								<TooltipContent className="max-w-xs">
									{tooltipText}
								</TooltipContent>
							</Tooltip>
						);
					}
					return (
						<strong key={`b-${term}-${index}`} className="font-semibold">
							{term}
						</strong>
					);
				}

				// Handle bold **text**
				if (part.startsWith("**") && part.endsWith("**")) {
					const boldText = part.slice(2, -2);
					return (
						<strong key={`s-${boldText}-${index}`} className="font-semibold">
							{boldText}
						</strong>
					);
				}

				// Regular text - use index since parts are sequential
				return <span key={`t-${index}`}>{part}</span>;
			})}
		</>
	);
}
