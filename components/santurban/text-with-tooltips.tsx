import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import tooltipsData from "@/data/tooltips.json";

interface TextWithTooltipsProps {
	text: string;
	color?: string;
}

export function TextWithTooltips({
	text,
	color = "emerald",
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
									className={`underline decoration-2 decoration-${color}-400 hover:decoration-${color}-300 underline-offset-2 cursor-help transition-colors`}
								>
									<strong className="text-white">{term}</strong>
								</TooltipTrigger>
								<TooltipContent className="max-w-xs">
									{tooltipText}
								</TooltipContent>
							</Tooltip>
						);
					}
					return (
						<strong key={`b-${term}-${index}`} className="text-white">
							{term}
						</strong>
					);
				}

				// Handle bold **text**
				if (part.startsWith("**") && part.endsWith("**")) {
					const boldText = part.slice(2, -2);
					return (
						<strong key={`s-${boldText}-${index}`} className="text-white">
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
