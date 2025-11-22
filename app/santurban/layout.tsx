import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Páramo de Santurbán",
	description:
		"Descubre el Páramo de Santurbán: una fábrica natural de agua con 26 lagunas, hogar de especies únicas y ecosistema vital para más de 2 millones de personas. Conoce su importancia científica, biodiversidad y curiosidades.",
	openGraph: {
		title: "Páramo de Santurbán - Fábrica Natural de Agua",
		description:
			"Explora el ecosistema de páramo más importante de Colombia. 26 lagunas, biodiversidad única y agua para millones de personas.",
	},
};

export default function SanturbanLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
