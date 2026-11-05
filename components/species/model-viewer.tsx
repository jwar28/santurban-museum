"use client";

import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";
import { Component, type ReactNode, Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ModelProps {
	url: string;
	onLoad?: () => void;
}

function Model({ url, onLoad }: ModelProps) {
	const { scene } = useGLTF(url);
	const groupRef = useRef<THREE.Group>(null);

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

			// Notify that the model has loaded
			if (onLoad) {
				onLoad();
			}
		}
	}, [scene, onLoad]);

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

function ModelLoader() {
	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center" role="status">
			<div className="text-center">
				<Loader2 className="mx-auto h-8 w-8 animate-spin text-ink-soft" />
				<p className="mt-4 text-sm font-semibold text-ink">Preparando el espécimen en 3D…</p>
				<p className="mt-1 text-xs text-ink-soft">Puede tardar unos segundos</p>
			</div>
		</div>
	);
}

function NoModelFallback() {
	return (
		<div className="flex h-full items-center justify-center px-8">
			<div className="max-w-sm text-center">
				<p className="font-serif text-xl italic text-ink">Este espécimen aún no tiene modelo 3D</p>
				<p className="mt-2 text-sm text-ink-soft">
					Mientras tanto puedes ver su fotografía en la pestaña de al lado.
				</p>
			</div>
		</div>
	);
}

/** Si el modelo no carga (archivo ausente o corrupto), muestra el aviso en vez de romper la página. */
class ModelErrorBoundary extends Component<
	{ children: ReactNode; onError: () => void },
	{ failed: boolean }
> {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		return this.state.failed ? null : this.props.children;
	}
}

interface ModelViewerProps {
	modelUrl: string;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleModelLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		// Reset loading state when model URL changes
		setIsLoading(true);
		setHasError(false);
	}, []);

	if (!modelUrl || hasError) {
		return <NoModelFallback />;
	}

	return (
		<div className="w-full h-full relative">
			{isLoading && <ModelLoader />}
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
				<hemisphereLight intensity={0.35} color="#dfe5e1" groundColor="#3a5148" />
				<ModelErrorBoundary onError={() => setHasError(true)}>
					<Suspense fallback={<LoadingFallback />}>
						<Model url={modelUrl} onLoad={handleModelLoad} />
						<Environment preset="city" environmentIntensity={0.4} />
					</Suspense>
				</ModelErrorBoundary>
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
				<p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-ink-soft">
					Arrastra para girar · pellizca o usa la rueda para acercar
				</p>
			)}
		</div>
	);
}
