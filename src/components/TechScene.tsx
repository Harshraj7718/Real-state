"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function Wireframe() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.22;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="black" wireframe />
    </mesh>
  );
}

export default function TechScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
      <Wireframe />
    </Canvas>
  );
}
