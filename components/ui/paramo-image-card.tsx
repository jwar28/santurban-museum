import type { ParamoImage } from "@/data/marquee-data";
import Image from "next/image";

interface ParamoImageCardProps {
	image: ParamoImage;
}

export function ParamoImageCard({ image }: ParamoImageCardProps) {
	return (
		<div className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 transition-all hover:ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,.45)] w-[350px] md:w-[400px]">
			{/* Image Container */}
			<div className="relative h-64 md:h-72">
				<Image
					src={image.imageUrl}
					alt={image.alt}
					fill
					unoptimized
					className="object-cover filter transition-all duration-300"
					sizes="400px"
				/>
			</div>

			{/* Photo Credits */}
			<div className="absolute top-0 right-0 bg-black/70 px-3 py-1 text-[10px] text-gray-200/90 backdrop-blur-sm z-10 rounded-bl-lg">
				{image.credits}
			</div>

			{/* Location Name at bottom */}
			<div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
				<h3 className="text-white font-extrabold text-xl md:text-2xl drop-shadow-lg">
					{image.locationName}
				</h3>
			</div>
		</div>
	);
}
