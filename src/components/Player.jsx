import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useRef, useEffect, useState } from 'react';
import { usePlayerControls } from '../utils/helpers';
import Bullet from './Bullet';

export default function Player({ position, color }) {
  const direction = new Vector3();
  const frontVector = new Vector3();
  const sideVector = new Vector3();
  const speed = new Vector3();
  const velocity = useRef([0, 0, 0]);
  const SPEED = 5;
  const BULLET_SPEED = 30;
  const BULLET_COOL_DOWN = 300;
  const { camera } = useThree();

  const args = [1, 50];
  const [ref, api] = useSphere(() => ({
    type: 'Dynamic',
    mass: 2,
    position,
    args,
  }));

  const [bullets, setBullets] = useState([]);
  const state = useRef({
    timeToShoot: 0,
    vel: [0, 0, 0],
  });

  const { forward, backward, left, right, jump, shoot } = usePlayerControls();

  useFrame((_state) => {
    // For player movement
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    speed.fromArray(velocity.current);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
      api.velocity.set(velocity.current[0], 5, velocity.current[2]);

    // For shooting bullets
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    const bulletDirection = cameraDirection
      .clone()
      .multiplyScalar(BULLET_SPEED);
    const bulletPosition = camera.position
      .clone()
      .add(cameraDirection.clone().multiplyScalar(2));
    if (shoot) {
      const now = Date.now();
      if (now >= state.current.timeToShoot) {
        state.current.timeToShoot = now + BULLET_COOL_DOWN;
        setBullets((bullets) => [
          ...bullets,
          {
            id: now,
            position: [bulletPosition.x, bulletPosition.y, bulletPosition.z],
            forward: [bulletDirection.x, bulletDirection.y, bulletDirection.z],
          },
        ]);
      }
    }
  });

  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={args} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/** Renders bullets */}
      {bullets.map((bullet) => {
        return (
          <Bullet
            key={bullet.id}
            velocity={bullet.forward}
            position={bullet.position}
          />
        );
      })}
    </>
  );
}
