"use client";

import { useSpeciesStore } from "@/lib/store/species-store";
import { createClient } from "@/lib/supabase/client";
import type { SpeciesRow } from "@/lib/types";
import { useEffect, useMemo } from "react";
import ModelPreloader from "./model-preloader";

interface SpeciesStoreInitializerProps {
	species: SpeciesRow[];
}

export default function SpeciesStoreInitializer({
	species,
}: SpeciesStoreInitializerProps) {
	const { setSpeciesList, preloadSpeciesDetails } = useSpeciesStore();

	useEffect(() => {
		// Initialize the store with the species list
		setSpeciesList(species);
		// Preload all species details for instant navigation
		preloadSpeciesDetails(species);
	}, [species, setSpeciesList, preloadSpeciesDetails]);

	// Generate model URLs for preloading
	const modelUrls = useMemo(() => {
		const supabase = createClient();
		return species
			.filter((s) => s.glb_reference)
			.map((s) => {
				if (!s.glb_reference) return "";
				const { data } = supabase.storage
					.from("objects")
					.getPublicUrl(s.glb_reference);
				return data.publicUrl;
			})
			.filter((url) => url !== "");
	}, [species]);

	return <ModelPreloader urls={modelUrls} />;
}
