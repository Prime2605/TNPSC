import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AnimatedSpheres() {
    return (
        <group>
            {/* Purple / Violet Sphere */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1.5, 64, 64]} position={[-4, -1, -6]}>
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.6}
                    />
                </Sphere>
            </Float>

            {/* Gold / Amber Sphere */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                <Sphere args={[2, 64, 64]} position={[5, 2, -8]}>
                    <MeshDistortMaterial
                        color="#f59e0b"
                        attach="material"
                        distort={0.3}
                        speed={1.5}
                        roughness={0.1}
                        metalness={1}
                        transparent
                        opacity={0.5}
                    />
                </Sphere>
            </Float>

            {/* Pink Sphere */}
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={3}>
                <Sphere args={[1.2, 64, 64]} position={[2, -4, -5]}>
                    <MeshDistortMaterial
                        color="#ec4899"
                        attach="material"
                        distort={0.5}
                        speed={3}
                        roughness={0.3}
                        metalness={0.5}
                        transparent
                        opacity={0.7}
                    />
                </Sphere>
            </Float>
        </group>
    )
}

function Fireflies() {
    const group = useRef()
    const count = 50

    // Randomize initial positions
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20       // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20   // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5 // z
        }
        return positions
    }, [count])

    useFrame((state) => {
        if (group.current) {
            // Gentle drifting animation
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
            group.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5
        }
    })

    return (
        <group ref={group}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    color="#fcd34d"
                    transparent
                    opacity={0.8}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

export default function Background3D() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none'
        }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={2} />
                <pointLight position={[10, -10, -10]} color="#8b5cf6" intensity={2} />

                {/* Stars Background */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                
                {/* Visual Elements */}
                <AnimatedSpheres />
                <Fireflies />
            </Canvas>
        </div>
    )
}
