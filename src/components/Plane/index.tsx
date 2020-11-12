import React, { forwardRef, useContext, useRef } from "react";
import * as THREE from "three";
import { ReactThreeFiber, useFrame } from "react-three-fiber";

import { ScrollTopContext } from "../../context";
import CustomMaterial from "./CustomMaterial";
import useContainer from "../../hooks/Container/useContainer";
import state from "../../store";

interface PlaneProps
  extends ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> {
  name?: string;
  color?: string;
  shift?: number;
  opacity?: number;
  planeArgs?: [
    width?: number,
    height?: number,
    widthSegments?: number,
    heightSegments?: number
  ];
  map?: THREE.Texture;
}

const Plane: React.FC<PlaneProps> = forwardRef(
  (
    { name, color = "white", shift = 1, opacity = 1, planeArgs, map, ...props },
    ref
  ) => {
    const { viewportHeight, offsetFactor } = useContainer();
    const scrollTop = useContext(ScrollTopContext);
    const material = useRef<CustomMaterial>();

    let last = scrollTop.current;

    // sync shader effects to scroll data
    useFrame(() => {
      if (material.current) {
        material.current.scale = THREE.MathUtils.lerp(
          material.current.scale,
          offsetFactor -
            scrollTop.current / ((state.pages - 1) * viewportHeight),
          0.1
        );
        material.current.shift = THREE.MathUtils.lerp(
          material.current.shift,
          (scrollTop.current - last) / shift,
          0.1
        );
      }
      last = scrollTop.current;
    });

    return (
      <mesh name={name} ref={ref} {...props}>
        <planeBufferGeometry attach="geometry" args={planeArgs} />
        <customMaterial
          ref={material}
          attach="material"
          color={color}
          map={map}
          transparent
          opacity={opacity}
        />
      </mesh>
    );
  }
);

export default Plane;