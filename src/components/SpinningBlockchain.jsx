// components/SpinningBlockchain.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// Removed OrbitControls for performance

function SpinningLogo() {
  const meshRef = useRef();

  // Smooth rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <torusKnotGeometry args={[1, 0.4, 64, 32]} />
      <meshStandardMaterial color="#013220" wireframe />
    </mesh>
  );
}

export default function SpinningBlockchain() {
  return (
    <div
      style={{
        position: "fixed", // Make it always behind everything
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6] }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <SpinningLogo />
      </Canvas>
    </div>
  );
}
