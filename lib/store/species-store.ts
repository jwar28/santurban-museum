import type { SpeciesRow } from "@/lib/types";
import { create } from "zustand";

interface SpeciesStore {
	// Data storage
	speciesList: SpeciesRow[];
	speciesDetails: Map<number, SpeciesRow>;
	loadedModels: Set<string>;

	// Loading states
	isLoadingList: boolean;
	isLoadingDetails: Map<number, boolean>;

	// Actions
	setSpeciesList: (species: SpeciesRow[]) => void;
	setSpeciesDetails: (id: number, species: SpeciesRow) => void;
	addLoadedModel: (url: string) => void;
	isModelLoaded: (url: string) => boolean;
	getSpeciesById: (id: number) => SpeciesRow | undefined;
	preloadSpeciesDetails: (species: SpeciesRow[]) => void;
}

export const useSpeciesStore = create<SpeciesStore>((set, get) => ({
	// Initial state
	speciesList: [],
	speciesDetails: new Map(),
	loadedModels: new Set(),
	isLoadingList: false,
	isLoadingDetails: new Map(),

	// Actions
	setSpeciesList: (species) => set({ speciesList: species }),

	setSpeciesDetails: (id, species) =>
		set((state) => {
			const newDetails = new Map(state.speciesDetails);
			newDetails.set(id, species);
			return { speciesDetails: newDetails };
		}),

	addLoadedModel: (url) =>
		set((state) => {
			const newLoadedModels = new Set(state.loadedModels);
			newLoadedModels.add(url);
			return { loadedModels: newLoadedModels };
		}),

	isModelLoaded: (url) => get().loadedModels.has(url),

	getSpeciesById: (id) => {
		const details = get().speciesDetails.get(id);
		if (details) return details;

		// Fallback to list if not in details
		return get().speciesList.find((s) => s.id === id);
	},

	preloadSpeciesDetails: (species) => {
		const newDetails = new Map(get().speciesDetails);
		for (const s of species) {
			newDetails.set(s.id, s);
		}
		set({ speciesDetails: newDetails });
	},
}));
