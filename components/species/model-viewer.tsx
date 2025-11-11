"use client";

import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

interface ModelProps {
	url: string;
}

function Model({ url }: ModelProps) {
	const { scene } = useGLTF(url);
	return <primitive object={scene} />;
}

function LoadingFallback() {
	return (
		<mesh>
			<boxGeometry args={[0.1, 0.1, 0.1]} />
			<meshStandardMaterial transparent opacity={0} />
		</mesh>
	);
}

function NoModelFallback() {
	const messages = [
		"¡Esta especie es tan tímida que se escondió en la neblina del páramo! 🌫️",
		"El modelo 3D está explorando las alturas del Santurbán 🏔️",
		"¡Ups! Parece que esta especie se fue a tomar agua del frailejón 💧",
		"Esta criatura está más escondida que un oso de anteojos 🐻",
		"El modelo 3D se tomó un descanso entre los frailejones ☁️",
	];

	const randomMessage = messages[Math.floor(Math.random() * messages.length)];

	return (
		<div className="flex items-center justify-center h-full">
			<div className="text-center max-w-md px-8">
				<div className="text-8xl mb-6">🌿</div>
				<p className="text-emerald-300 text-lg leading-relaxed">
					{randomMessage}
				</p>
				<p className="text-gray-500 text-sm mt-4">Modelo 3D no disponible</p>
			</div>
		</div>
	);
}

interface ModelViewerProps {
	modelUrl: string;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
	const [hasError, setHasError] = useState(false);

	if (!modelUrl || hasError) {
		return <NoModelFallback />;
	}

	return (
		<div className="w-full h-full relative">
			<Canvas
				className="bg-transparent"
				gl={{
					antialias: true,
					alpha: true,
					toneMapping: 0,
					outputColorSpace: "srgb",
				}}
				onCreated={({ gl }) => {
					gl.domElement.addEventListener("webglcontextlost", () =>
						setHasError(true),
					);
				}}
			>
				<PerspectiveCamera makeDefault position={[0, 0, 5]} />
				{/* Very bright ambient light for overall visibility */}
				<ambientLight intensity={2} />
				{/* Strong hemisphere light for natural lighting */}
				<hemisphereLight intensity={1.5} groundColor="#444444" />
				{/* Multiple directional lights from all angles */}
				<directionalLight position={[5, 5, 5]} intensity={2} />
				<directionalLight position={[-5, 5, 5]} intensity={1.5} />
				<directionalLight position={[0, 5, -5]} intensity={1.5} />
				<directionalLight position={[0, -5, 0]} intensity={1} />
				{/* Point lights for extra brightness */}
				<pointLight position={[10, 10, 10]} intensity={1.5} />
				<pointLight position={[-10, -10, -10]} intensity={1} />
				<Suspense fallback={<LoadingFallback />}>
					<Model url={modelUrl} />
					<Environment preset="sunset" environmentIntensity={1} />
				</Suspense>
				<OrbitControls
					enablePan={false}
					enableZoom={true}
					minDistance={2}
					maxDistance={10}
					autoRotate={false}
				/>
			</Canvas>
			{!hasError && (
				<div className="absolute bottom-4 left-4 text-xs text-white/60 bg-black/30 px-3 py-1.5 rounded-md backdrop-blur-sm">
					Clickea y arrastra para rotar el modelo
				</div>
			)}
		</div>
	);
}
