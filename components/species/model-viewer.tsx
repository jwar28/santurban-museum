"use client";

import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSpeciesStore } from "@/lib/store/species-store";

interface ModelProps {
	url: string;
}

function Model({ url }: ModelProps) {
	const { scene } = useGLTF(url);
	const groupRef = useRef<THREE.Group>(null);
	const addLoadedModel = useSpeciesStore((state) => state.addLoadedModel);

	useEffect(() => {
		if (groupRef.current && scene) {
			// Clone the scene to avoid modifying the cached version
			const clonedScene = scene.clone();

			// Traverse and fix materials for consistent appearance
			clonedScene.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					const mesh = child as THREE.Mesh;
					if (mesh.material) {
						// Handle both single material and array of materials
						const materials = Array.isArray(mesh.material)
							? mesh.material
							: [mesh.material];

						materials.forEach((material) => {
							if (material instanceof THREE.MeshStandardMaterial) {
								// Fix excessive brightness
								material.metalness = Math.min(material.metalness, 0.3);
								material.roughness = Math.max(material.roughness, 0.5);

								// Ensure proper color space for textures
								if (material.map) {
									material.map.colorSpace = THREE.SRGBColorSpace;
								}
								if (material.emissiveMap) {
									material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
								}

								// Reduce emissive intensity if too bright
								if (material.emissive && material.emissiveIntensity) {
									material.emissiveIntensity = Math.min(
										material.emissiveIntensity,
										0.5,
									);
								}

								// Ensure opacity is correct
								if (material.transparent) {
									material.opacity = Math.max(material.opacity, 0.95);
								} else {
									material.opacity = 1.0;
									material.transparent = false;
								}

								material.needsUpdate = true;
							}
						});
					}
				}
			});

			// Calculate bounding box
			const box = new THREE.Box3().setFromObject(clonedScene);
			const center = box.getCenter(new THREE.Vector3());
			const size = box.getSize(new THREE.Vector3());

			// Center the model by moving it to origin
			clonedScene.position.x = -center.x;
			clonedScene.position.y = -center.y;
			clonedScene.position.z = -center.z;

			// Scale to fit nicely in view
			const maxDim = Math.max(size.x, size.y, size.z);
			const scale = 1.6 / maxDim; // Smaller scale for more compact view
			groupRef.current.scale.setScalar(scale);

			// Clear and add the cloned scene
			while (groupRef.current.children.length > 0) {
				groupRef.current.remove(groupRef.current.children[0]);
			}
			groupRef.current.add(clonedScene);

			// Mark model as loaded in store
			addLoadedModel(url);
		}
	}, [scene, url, addLoadedModel]);

	return <group ref={groupRef} />;
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
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1,
				}}
				onCreated={({ gl }) => {
					gl.domElement.addEventListener("webglcontextlost", () =>
						setHasError(true),
					);
				}}
			>
				<PerspectiveCamera makeDefault position={[0, 0, 3]} />
				{/* Balanced lighting to avoid over-brightness */}
				<ambientLight intensity={0.6} />
				<directionalLight position={[5, 5, 5]} intensity={0.8} />
				<directionalLight position={[-3, 3, -3]} intensity={0.4} />
				<hemisphereLight intensity={0.3} groundColor="#1a1a1a" />
				<Suspense fallback={<LoadingFallback />}>
					<Model url={modelUrl} />
					<Environment preset="city" environmentIntensity={0.4} />
				</Suspense>
				<OrbitControls
					enablePan={false}
					enableZoom={true}
					minDistance={1.5}
					maxDistance={8}
					autoRotate={false}
					target={[0, 0, 0]}
					enableRotate={true}
					minPolarAngle={Math.PI / 2}
					maxPolarAngle={Math.PI / 2}
				/>
			</Canvas>
			{!hasError && (
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-white/60 bg-black/30 px-3 py-1.5 rounded-md backdrop-blur-sm lg:left-4 lg:translate-x-0 lg:text-left">
					Clickea y arrastra para rotar el modelo
				</div>
			)}
		</div>
	);
}
