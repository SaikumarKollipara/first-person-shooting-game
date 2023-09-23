import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import React from 'react';

export default function Target({ updateScore, position, points }) {
  const boardArgs = [1, 1, 0.1];
  const stickArgs = [0.1, 2, 0.1];
  const [boardRef] = useBox(() => ({
    type: 'Kinematic',
    mass: 2,
    position: [position[0], position[1] + 1.5, position[2]],
    args: boardArgs,
    onCollide: (e) => {
      updateScore(points);
      console.log('The box collided with', points);
    },
  }));
  const [stickRef] = useBox(() => ({
    type: 'Kinematic',
    mass: 2,
    position,
    args: stickArgs,
  }));
  return (
    <group>
      <mesh
        ref={boardRef}
        position={[position[0], position[1] + 1.5, position[2]]}
      >
        <boxGeometry args={boardArgs} />
        <meshStandardMaterial color={'white'} />
      </mesh>
      <mesh ref={stickRef} position={position}>
        <boxGeometry args={stickArgs} />
        <meshStandardMaterial color={'brown'} />
      </mesh>
      <Text
        scale={0.5}
        color={'#ffb406'}
        position={[position[0], position[1] + 2.2, position[2] + 0.09]}
      >
        {points}
      </Text>
    </group>
  );
}
