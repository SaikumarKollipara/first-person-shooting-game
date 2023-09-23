import { useState } from 'react';
import { useEffect } from 'react';

export function usePlayerControls() {
  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  };
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    shoot: false,
  });
  useEffect(() => {
    function handleKeyDown(e) {
      setMovement((prev) => ({
        ...prev,
        [keys[e.code]]: true,
      }));
    }
    function handleKeyUp(e) {
      setMovement((prev) => ({
        ...prev,
        [keys[e.code]]: false,
      }));
    }
    function handleMouseDown(e) {
      if (e.button === 1) return;
      setMovement((prev) => ({
        ...prev,
        shoot: true,
      }));
    }
    function handleMouseUp(e) {
      if (e.button === 1) return;
      setMovement((prev) => ({
        ...prev,
        shoot: false,
      }));
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return movement;
}
