import PlateImage from "@/components/paramo/plate-image";
import { paramoImages } from "@/data/marquee-data";

/** Vistas del páramo: láminas fotográficas con pie y crédito, en una fila con desplazamiento. */
export function ParamoGallery() {
	return (
		<section aria-labelledby="vistas" className="py-20 md:py-28">
			<div className="px-4 md:px-12 lg:px-20">
				<h2 id="vistas" className="font-display text-4xl md:text-5xl">
					Vistas del páramo
				</h2>
				<p className="mt-3 max-w-xl text-ink-soft">
					Lagunas y paisajes de Santurbán. Desliza para recorrerlas.
				</p>
			</div>
			<ul
				className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 md:gap-10 md:px-12 lg:px-20"
				aria-label="Fotografías del páramo"
			>
				{paramoImages.map((image) => (
					<li key={image.id} className="w-[82vw] max-w-[30rem] flex-none snap-start">
						<figure>
							<div className="border border-ink/40 bg-mist-deep p-2">
								<PlateImage
									src={image.imageUrl}
									alt={image.alt}
									caption={image.locationName}
									className="aspect-[4/3] w-full object-cover"
								/>
							</div>
							<figcaption className="mt-4 flex flex-col gap-1">
								<span className="font-serif text-xl italic">{image.locationName}</span>
								<span className="text-xs text-ink-soft">{image.credits}</span>
							</figcaption>
						</figure>
					</li>
				))}
			</ul>
		</section>
	);
}
