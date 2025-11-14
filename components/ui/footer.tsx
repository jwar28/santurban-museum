/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */

import footerContent from "@/data/footer-content.json";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-[#0a0f0d] border-t border-white/10 mt-20">
			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Sources Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
					{/* Official Sources */}
					<div>
						<h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">
							{footerContent.sources.official.title}
						</h3>
						<ul className="space-y-2">
							{footerContent.sources.official.items.map((item, index) => (
								<li key={index} className="text-sm text-gray-400">
									• {item}
								</li>
							))}
						</ul>
					</div>

					{/* Academic Sources */}
					<div>
						<h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">
							{footerContent.sources.academic.title}
						</h3>
						<ul className="space-y-2">
							{footerContent.sources.academic.items.map((item, index) => (
								<li key={index} className="text-sm text-gray-400">
									• {item}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Educational Note */}
				<div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/10">
					<p className="text-xs text-gray-400 text-center">
						{footerContent.educationalNote}
					</p>
				</div>

				{/* Links and Copyright */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
					<p className="text-sm text-gray-500">{footerContent.copyright}</p>
					<nav className="flex gap-6">
						{footerContent.links.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
							>
								{link.text}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}
