import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: "http://localhost:3000";

	// Static pages
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/explore`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/conservation`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
	];

	// Dynamic species pages
	const supabase = await createClient();
	const { data: species } = await supabase
		.from("species")
		.select("id, updated_at");

	const speciesPages =
		species?.map((s) => ({
			url: `${baseUrl}/species/${s.id}`,
			lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})) || [];

	return [...staticPages, ...speciesPages];
}
