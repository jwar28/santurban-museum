export type SpeciesRow = {
	id: number;
	common_name: string;
	scientific_name: string;
	type: string | null;
	description: string | null;
	conservation_status: string | null;
	ecological_importance: string | null;
	threats: string | null;
	adaptations?: string | null;
	characteristics: string | null;
	glb_reference: string | null;
	image_url?: string | null;
	pic_owner?: string | null;
	license_type?: string | null;
};
