import { PointerLockControls, Sky, Sparkles, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Floor from './Floor';
import { Physics } from '@react-three/cannon';
import Box from './Box';
import Player from './Player';
import Target from './Target';

const targets = [
  { position: [0, 0, -10], points: 5 },
  { position: [2, 0, -15], points: 10 },
  { position: [5, 0, -20], points: 15 },
  { position: [8.5, 0, -25], points: 20 },
];

const boxes = [
  [-4, 8, -10],
  [-2, 5, -10],
  [-5, 5, 10],
  [-7, 7, 10],
  [1, 7, 12],
  [5, 7, 12],
  [9, 8, 15],
];

export default function Experience({ updateScore }) {
  return (
    <Canvas shadows camera={{ fov: 30 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 10, 2]} />
        <PointerLockControls />
        <Sparkles count={500} scale={[20, 20, 10]} size={3} speed={2} />
        <Sky />
        <Physics>
          <Player position={[0, 4, 0]} color={'yellow'} />
          <mesh position={[0, 0, -5]}>
            <boxGeometry args={[20, 0.1, 1]} />
            <meshStandardMaterial color={'red'} />
          </mesh>
          {targets.map((target, index) => (
            <Target
              key={index}
              updateScore={updateScore}
              position={target.position}
              points={target.points}
            />
          ))}
          {boxes.map((position, index) => (
            <Box key={index} position={position} />
          ))}
          <Floor
            color={'springgreen'}
            args={[1000, 1000]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
