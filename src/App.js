import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Capture arrow key presses
window.addEventListener("keydown", (e) => {
    window.pressedKey = e.key;
});
window.addEventListener("keyup", () => {
    window.pressedKey = null;
});

function Module({ url, position }) {
    const { scene } = useGLTF(url);
    const ref = useRef();
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
    };

    useFrame(() => {
        if (selected && ref.current) {
            const step = 0.1;
            if (window.pressedKey === "ArrowRight") ref.current.position.x += step;
            if (window.pressedKey === "ArrowLeft") ref.current.position.x -= step;
            if (window.pressedKey === "ArrowUp") ref.current.position.z -= step;
            if (window.pressedKey === "ArrowDown") ref.current.position.z += step;
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={0.01}
            position={position}
            onClick={handleClick}
        />
    );
}

function App() {
    return (
        <div style={{ height: "100vh" }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />

                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#eeeeee" />
                </mesh>

                {/* Your GLB model */}
                <Module url="/models/P36.glb" position={[0, 0, 0]} />

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
