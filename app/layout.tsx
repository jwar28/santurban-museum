import PageTransition from "@/components/animations/page-transition";
import { ChatbotPopup } from "@/components/ui/chatbot-popup";
import Navbar from "@/components/ui/navbar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: {
		default: "Museo Virtual: Santurbán - Donde el agua nace, la vida florece",
		template: "%s | Museo Virtual Santurbán",
	},
	description:
		"Explora el páramo de Santurbán a través de nuestro museo virtual interactivo. Descubre la biodiversidad única, especies endémicas y la importancia ecológica de uno de los ecosistemas más valiosos de Colombia.",
	keywords: [
		"Santurbán",
		"páramo",
		"biodiversidad",
		"conservación",
		"Colombia",
		"ecosistema",
		"especies endémicas",
		"museo virtual",
		"educación ambiental",
		"frailejón",
		"agua",
		"naturaleza",
		"3D",
		"interactivo",
	],
	authors: [{ name: "Museo Virtual Santurbán" }],
	creator: "Museo Virtual Santurbán",
	publisher: "Museo Virtual Santurbán",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "es_CO",
		url: defaultUrl,
		title: "Museo Virtual: Santurbán - Donde el agua nace, la vida florece",
		description:
			"Explora el páramo de Santurbán a través de nuestro museo virtual interactivo. Descubre la biodiversidad única y la importancia ecológica de este ecosistema colombiano.",
		siteName: "Museo Virtual Santurbán",
		images: [
			{
				url: "/logo.svg",
				width: 1200,
				height: 630,
				alt: "Museo Virtual Santurbán",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Museo Virtual: Santurbán - Donde el agua nace, la vida florece",
		description:
			"Explora el páramo de Santurbán a través de nuestro museo virtual interactivo con modelos 3D y contenido educativo.",
		images: ["/logo.svg"],
		creator: "@santurban_museum",
	},
	verification: {
		// google: "tu-código-de-verificación-aquí",
		// yandex: "tu-código-de-verificación-aquí",
	},
	alternates: {
		canonical: defaultUrl,
	},
	category: "education",
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/logo.svg" />
				<meta name="theme-color" content="#0b1210" />
			</head>
			<body
				className={`${geistSans.className} min-h-screen bg-[#0b1210] text-white antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<PageTransition>{children}</PageTransition>
					<ChatbotPopup />
				</ThemeProvider>
			</body>
		</html>
	);
}
