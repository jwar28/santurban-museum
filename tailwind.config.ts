import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Mundo: Perfil del Páramo
				mist: { DEFAULT: "rgb(var(--mist-rgb) / <alpha-value>)", deep: "rgb(var(--mist-deep-rgb) / <alpha-value>)" },
				ink: { DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)", soft: "rgb(var(--ink-soft-rgb) / <alpha-value>)" },
				water: { DEFAULT: "rgb(var(--water-rgb) / <alpha-value>)", deep: "rgb(var(--water-deep-rgb) / <alpha-value>)", pale: "rgb(var(--water-pale-rgb) / <alpha-value>)" },
				gold: "rgb(var(--gold-rgb) / <alpha-value>)",
				earth: "rgb(var(--earth-rgb) / <alpha-value>)",
				slope: {
					1: "rgb(var(--slope-1-rgb) / <alpha-value>)",
					2: "rgb(var(--slope-2-rgb) / <alpha-value>)",
					3: "rgb(var(--slope-3-rgb) / <alpha-value>)",
					4: "rgb(var(--slope-4-rgb) / <alpha-value>)",
				},
				on: { slope: "rgb(var(--on-slope-rgb) / <alpha-value>)", "slope-soft": "rgb(var(--on-slope-soft-rgb) / <alpha-value>)" },
				// shadcn (componentes del chat)
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
				popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
				primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
				secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
				muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
				accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
				destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			fontFamily: {
				display: ["var(--font-display)", "Georgia", "serif"],
				serif: ["var(--font-text)", "Georgia", "serif"],
				sans: ["var(--font-label)", "system-ui", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			transitionTimingFunction: {
				out: "cubic-bezier(0.16, 1, 0.3, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
