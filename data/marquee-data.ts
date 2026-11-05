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
			"/paramo/lagunas-negras.jpg",
		locationName: "Lagunas Negras",
		credits: "Foto por: Sebaskorrea5 bajo licencia CC BY-SA 4.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 2,
		imageUrl:
			"/paramo/siete-lagunas.jpg",
		locationName: "Siete Lagunas",
		credits: "Foto por: Ismael Contreras bajo licencia CC BY-SA 3.0",
		alt: "Vista de las Siete Lagunas en el Páramo de Santurbán",
	},
	{
		id: 3,
		imageUrl: "/paramo/bosque-pinos.jpg",
		locationName: "Bosque de pinos",
		credits: "Foto por: Luis Alveart bajo licencia CC BY-NC-ND 2.0",
		alt: "Vista al bosque de pinos en el Páramo de Santurbán",
	},
	{
		id: 4,
		imageUrl:
			"/paramo/laguna-brava.jpg",
		locationName: "Laguna Brava",
		credits:
			"Foto por: Grupo Areas Protegidas CORPONOR bajo licencia CC BY-SA 3.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 5,
		imageUrl:
			"/paramo/laguna-verde.jpg",
		locationName: "Laguna Verde",
		credits:
			"Foto por: Grupo Areas Protegidas CORPONOR bajo licencia CC BY-SA 3.0",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
	{
		id: 6,
		imageUrl:
			"/paramo/laguna-colorada.jpg",
		locationName: "Laguna Colorada",
		credits: "Foto por: Grupe AME CORPONOR",
		alt: "Vista panorámica de la laguna del Páramo de Santurbán",
	},
];
