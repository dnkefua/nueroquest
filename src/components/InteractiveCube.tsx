import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
    value: number;
    position: [number, number, number];
    isTarget?: boolean;
    onSelect?: (val: number) => void;
    color?: string;
    isDragging?: boolean;
}

export const InteractiveCube: React.FC<Props> = ({ value, position, isTarget, onSelect, color = '#2563EB', isDragging }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false);

    // Rotate slowly if not hovered/dragging, scale up on hover
    useFrame((_, delta) => {
        if (meshRef.current) {
            if (!hovered && !isDragging) {
                meshRef.current.rotation.x += delta * 0.2;
                meshRef.current.rotation.y += delta * 0.2;
            } else if (isDragging) {
                // Stop rotating when grabbed
            } else {
                // Smoothly rotate towards camera when hovered
                meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
                meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
            }

            const targetScale = hovered || isDragging ? 1.15 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (!isTarget && onSelect) {
            setClick(!clicked);
            onSelect(value);
        }
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={handleClick}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHover(true);
                document.body.style.cursor = isTarget ? 'default' : 'pointer';
            }}
            onPointerOut={() => {
                setHover(false);
                document.body.style.cursor = 'auto';
            }}
        >
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            {/* Semi-transparent glass look */}
            <meshPhysicalMaterial
                color={hovered || isTarget ? '#60A5FA' : color}
                transparent
                opacity={isTarget ? 0.4 : 0.9}
                roughness={0.1}
                transmission={0.5}
                thickness={0.5}
            />

            {/* Number Text on Front Face */}
            <Text
                position={[0, 0, 0.76]}
                fontSize={0.8}
                color={isTarget && !hovered ? '#4B5563' : '#FFFFFF'}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
            >
                {value === -1 ? '?' : value.toString()}
            </Text>
        </mesh>
    );
};
