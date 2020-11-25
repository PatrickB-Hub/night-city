import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from 'react-three-fiber'

const useReposition = () => {
  const group = useRef<THREE.Group>();
  const { size } = useThree();
  const mouse = useRef({ x: size.width / 2, y: size.height / 2 })

  const [rotationEuler, rotationQuaternion] = useMemo(() => {
    return [new THREE.Euler(0, 0, 0), new THREE.Quaternion(0, 0, 0, 0)]
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      mouse.current = { x: clientX, y: clientY };
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;

    const x = (mouse.current.x / size.width) / 10;
    const y = (mouse.current.y / size.height) / 10;
    rotationEuler.set(y, x, 0);
    rotationQuaternion.setFromEuler(rotationEuler);
    group.current.quaternion.slerp(rotationQuaternion, 0.1);
  })

  return group;
}

export default useReposition;
