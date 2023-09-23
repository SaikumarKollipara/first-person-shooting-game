import { useBox } from '@react-three/cannon';
import React from 'react';

export default function Box({ position }) {
  const args = [1, 1, 1];
  const [ref, api] = useBox(() => ({
    // type: 'Dynamic',
    mass: 1,
    position,
    args,
  }));
  return (
    <mesh castShadow ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={'royalblue'} />
    </mesh>
  );
}
