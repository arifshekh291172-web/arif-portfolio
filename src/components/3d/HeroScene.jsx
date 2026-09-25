import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Inner pulsating AI Core
function AICore({ mouse }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const ringsRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
      
      // Gentle mouse parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.4, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.4, 0.05);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.5;
      innerRef.current.rotation.z += delta * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.2;
      ringsRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Pulsating Liquid Core */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#00F0FF"
            emissive="#0B132B"
            roughness={0.15}
            metalness={0.9}
            distort={0.35}
            speed={2.2}
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Internal Geometric Wireframe Brain */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#A855F7"
          wireframe
          emissive="#6B21A8"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbiting Holographic Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.6, 0.012, 16, 100]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// Surrounding Neural Particle Field
function NeuralParticles({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#00F0FF'),
      new THREE.Color('#A855F7'),
      new THREE.Color('#3B82F6'),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.06;
      pointsRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Fallback when WebGL has an issue
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('WebGL Rendering issue detected:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-blue-500/20 animate-pulse-slow border border-cyan-500/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-purple-500/40 animate-spin-slow" />
            <span className="absolute font-mono text-xs text-cyan-400">AI CORE ACTIVE</span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] select-none">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={[1, isMobile ? 1.2 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
          <pointLight position={[-10, -10, -5]} intensity={1.2} color="#A855F7" />
          <pointLight position={[0, 5, -5]} intensity={0.8} color="#3B82F6" />

          <AICore mouse={mouse} />
          <NeuralParticles count={isMobile ? 70 : 150} />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Futuristic Floating HUD Badges */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-lg h-full">
          <div className="absolute top-6 left-2 sm:left-6 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 text-[10px] sm:text-xs font-mono text-cyan-300 shadow-glow-cyan backdrop-blur-md animate-float">
            ● NEURAL MATRIX // ACTIVE
          </div>
          <div className="absolute bottom-8 right-2 sm:right-6 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/40 text-[10px] sm:text-xs font-mono text-purple-300 shadow-glow-purple backdrop-blur-md animate-float" style={{ animationDelay: '2s' }}>
            ◆ SPATIAL AI ENGINE
          </div>
        </div>
      </div>
    </div>
  );
}
