import { useSphere } from '@react-three/cannon';
import React from 'react';

export default function Bullet(props) {
  const args = [0.1, 32, 32];
  const [ref, api] = useSphere(() => ({
    // type: 'Dynamic',
    mass: 5,
    position: props.position,
    args,
    ...props,
  }));
  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial color={'#c800de'} />
    </mesh>
  );
}
