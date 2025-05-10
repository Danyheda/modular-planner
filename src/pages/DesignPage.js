import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Load a GLB module and make it selectable
function Module({ url, position, onSelect }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(ref.current);
      }}
    />
  );
}

// Perform one-time camera zoom and target centering on selection
function CameraZoom({ target, controlsRef }) {
  const { camera } = useThree();
  const [hasZoomed, setHasZoomed] = useState(false);

  useFrame(() => {
    if (target && controlsRef.current && !hasZoomed) {
      const box = new THREE.Box3().setFromObject(target);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const direction = new THREE.Vector3()
        .subVectors(camera.position, center)
        .normalize();
      const newPosition = center.clone().add(direction.multiplyScalar(5));

      camera.position.copy(newPosition);
      controlsRef.current.target.copy(center);
      controlsRef.current.update();

      setHasZoomed(true);
    }

    // Reset when no target
    if (!target && hasZoomed) {
      setHasZoomed(false);
    }
  });

  return null;
}

const DesignPage = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const controlsRef = useRef();

  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>

        {/* Module */}
        <Module
          url="/models/P36.glb"
          position={[0, 1, 0]}
          onSelect={setSelectedObject}
        />

        {/* One-time zoom to selected */}
        <CameraZoom target={selectedObject} controlsRef={controlsRef} />

        <OrbitControls ref={controlsRef} />
      </Canvas>
    </div>
  );
};

export default DesignPage;
