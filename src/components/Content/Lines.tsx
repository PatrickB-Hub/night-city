import React from "react";
import * as THREE from "three";

import Plane from "../Plane";
import useContainer from "../../hooks/Container/useContainer";

interface Props {
  color: string;
  scale: number[];
  position: number[];
}

const Lines: React.FC<Props> = ({ color, scale, position, ...props }) => {
  const { mobile } = useContainer();
  const posOffset = mobile ? 0.65 : 1;

  return (
    <group
      position={[position[0] * posOffset, position[1] * posOffset, position[2]]}
      scale={new THREE.Vector3(...scale)}
      {...props}
    >
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={20}
        color={color}
        position={[-1.5, 0, 0]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={20}
        color={color}
        position={[1.5, 0, 0]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={20}
        color={color}
        position={[0, 0, 0]}
      />
    </group>
  );
};

export default Lines;
