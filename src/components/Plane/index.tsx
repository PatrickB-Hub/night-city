import React, { forwardRef } from "react";
import * as THREE from "three";
import { ReactThreeFiber } from "react-three-fiber";

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

    return (
      <mesh name={name} ref={ref} {...props}>
        <planeBufferGeometry attach="geometry" args={planeArgs} />
        <meshBasicMaterial attach="material" color={color} map={map} opacity={opacity} transparent />
      </mesh>
    );
  }
);

export default Plane;
