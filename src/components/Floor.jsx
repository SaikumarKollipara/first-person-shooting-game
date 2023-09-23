import { usePlane } from '@react-three/cannon';

export default function Floor(props) {
  const [ref, api] = usePlane(() => ({
    type: 'Static',
    rotation: props.rotation,
    position: props.position,
  }));
  return (
    <mesh castShadow receiveShadow ref={ref}>
      <planeGeometry args={props.args} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
