import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Museo Virtual: Santurbán",
		short_name: "Santurbán",
		description:
			"Explora el páramo de Santurbán a través de nuestro museo virtual interactivo",
		start_url: "/",
		display: "standalone",
		background_color: "#0b1210",
		theme_color: "#10b981",
		icons: [
			{
				src: "/logo.svg",
				sizes: "any",
				type: "image/svg+xml",
				purpose: "any",
			},
		],
		categories: ["education", "environment", "nature"],
		orientation: "portrait-primary",
		lang: "es",
	};
}
