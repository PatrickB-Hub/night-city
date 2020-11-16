import React, { useContext, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { ScrollTopContext } from "../../context";
import Plane from "../Plane";
import useContainer from "../../hooks/Container/useContainer";
import state from "../../store";

interface Props {
  speed: number;
  color: string;
  scale: number[];
  position: number[];
}

const Cross: React.FC<Props> = ({
  speed,
  color,
  scale,
  position,
  ...props
}) => {
  const ref = useRef<THREE.Group>();
  const { viewportHeight, mobile } = useContainer();
  const scrollTop = useContext(ScrollTopContext);

  const posOffset = mobile ? 0.6 : 1;

  useFrame(() => {
    if (ref.current) {
      const curTop = scrollTop.current;
      const curZ = ref.current.rotation.z;
      const nextZ =
        (curTop / ((state.pages - 1) * viewportHeight)) * Math.PI * speed;
      ref.current.rotation.z = THREE.MathUtils.lerp(curZ, nextZ, 0.1);
    }
  });

  return (
    <group
      ref={ref}
      position={[position[0] * posOffset, position[1] * posOffset, position[2]]}
      scale={new THREE.Vector3(...scale)}
      {...props}
    >
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[1, 0.25, 1]}
        position={[0, 0, 0]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1, 1]}
        position={[0, 0, 0]}
      />
    </group>
  );
};

export default Cross;
