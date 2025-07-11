import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Text3D, OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  type: 'sphere' | 'box' | 'torus';
}

const FloatingShape = ({ position, color, speed, type }: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  const material = useMemo(() => (
    <meshStandardMaterial color={color} transparent opacity={0.8} />
  ), [color]);

  return (
    <mesh ref={meshRef} position={position}>
      {type === 'sphere' && <sphereGeometry args={[0.3, 16, 16]} />}
      {type === 'box' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
      {type === 'torus' && <torusGeometry args={[0.3, 0.1, 8, 16]} />}
      {material}
    </mesh>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#f8a5c2" size={0.02} transparent opacity={0.6} />
    </points>
  );
};

interface ThreeSceneProps {
  color?: string;
  intensity?: number;
}

const ThreeScene = ({ color = "#f8a5c2", intensity = 0.3 }: ThreeSceneProps) => {
  const shapes = useMemo(() => [
    { position: [-2, 0, -1] as [number, number, number], color: "#f8a5c2", speed: 1, type: 'sphere' as const },
    { position: [2, 1, -2] as [number, number, number], color: "#f093fb", speed: 0.8, type: 'box' as const },
    { position: [0, -1, -1.5] as [number, number, number], color: "#fbbf24", speed: 1.2, type: 'torus' as const },
    { position: [-1, 2, -0.5] as [number, number, number], color: "#a78bfa", speed: 0.9, type: 'sphere' as const },
    { position: [1.5, -0.5, -2.5] as [number, number, number], color: "#fb7185", speed: 1.1, type: 'box' as const },
  ], []);

  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={color} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#fbbf24" />
        
        <ParticleField />
        
        {shapes.map((shape, index) => (
          <Float key={index} speed={shape.speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <FloatingShape {...shape} />
          </Float>
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;