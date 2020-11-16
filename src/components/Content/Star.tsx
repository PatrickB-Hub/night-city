import { useRef, useContext } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import Plane from "../Plane";
import useContainer from "../../hooks/Container/useContainer";
import { ScrollTopContext } from "../../context";
import state from "../../store";

interface Props {
  speed: number;
  posFactor: number;
  color: string;
  scale: number[];
  position: number[];
}

const Star: React.FC<Props> = ({
  speed,
  posFactor,
  color,
  scale,
  position,
  ...props
}) => {
  const { viewportHeight, mobile } = useContainer();
  const scrollTop = useContext(ScrollTopContext);
  const ref = useRef<THREE.Group>();

  const posOffset = mobile ? 0.6 : 1;

  useFrame(() => {
    if (ref.current) {
      const curTop = scrollTop.current;
      const curZ = ref.current.rotation.z;
      const nextY =
        (curTop / ((state.pages - 1) * viewportHeight)) * -Math.PI * speed;
      ref.current.rotation.z = THREE.MathUtils.lerp(curZ, nextY, 0.1);
      ref.current.position.x =
        posFactor * THREE.MathUtils.lerp(curZ, nextY, 0.05);
    }
  });

  return (
    <group
      ref={ref}
      position={[position[0] * posOffset, position[1], position[2]]}
      scale={new THREE.Vector3(...scale)}
      {...props}
    >
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1.75, 1]}
        rotation={[0, 0, 0]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1.75, 1]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1.75, 1]}
        rotation={[0, 0, Math.PI / -2]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1.75, 1]}
        rotation={[0, 0, Math.PI / 4]}
      />
      <Plane
        planeArgs={[1, 1, 32, 32]}
        shift={500}
        color={color}
        scale={[0.25, 1.75, 1]}
        rotation={[0, 0, Math.PI / -4]}
      />
    </group>
  );
};

export default Star;
