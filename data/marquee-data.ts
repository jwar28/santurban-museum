export interface ParamoImage {
	id: number;
	imageUrl: string;
	locationName: string;
	credits: string;
	alt: string;
}

export const paramoImages: ParamoImage[] = [
	{
		id: 1,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/9/9d/Laguna_las_Negras%2C_Vetas%2C_Santander.jpg",
		locationName: "Lagunas Negras",
		credits: "Foto por: Sebaskorrea5 bajo licencia CC BY-SA 4.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 2,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/6/69/Siete_Lagunas%2C_Municipio_de_Cachira.jpg",
		locationName: "Siete Lagunas",
		credits: "Foto por: Ismael Contreras bajo licencia CC BY-SA 3.0",
		alt: "Vista de las Siete Lagunas en el Páramo de Santurbán",
	},
	{
		id: 3,
		imageUrl: "https://live.staticflickr.com/584/20050558374_69e92877ea_b.jpg",
		locationName: "Bosque de pinos",
		credits: "Foto por: Luis Alveart bajo licencia CC BY-NC-ND 2.0",
		alt: "Vista al bosque de pinos en el Páramo de Santurbán",
	},
	{
		id: 4,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/6/6d/Laguna_Brava%2C_Municipio_de_Arboledas.jpg",
		locationName: "Laguna Brava",
		credits:
			"Foto por: Grupo Areas Protegidas CORPONOR bajo licencia CC BY-SA 3.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 5,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Laguna_Verde_Silos_Mutiscua.JPG/1200px-Laguna_Verde_Silos_Mutiscua.JPG?20121130212808",
		locationName: "Laguna Verde",
		credits:
			"Foto por: Grupo Areas Protegidas CORPONOR bajo licencia CC BY-SA 3.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 6,
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Laguna_Colorada_-_PNR_Santurb%C3%A1n_Mutiscua-Pamplona.jpg/1200px-Laguna_Colorada_-_PNR_Santurb%C3%A1n_Mutiscua-Pamplona.jpg?20160105135919",
		locationName: "Laguna Colorada",
		credits: "Foto por: Grupe AME CORPONOR",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
];
