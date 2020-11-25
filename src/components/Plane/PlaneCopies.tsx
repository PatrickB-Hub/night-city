import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ReactThreeFiber } from "react-three-fiber";

import "./CustomMaterial";
import useLayer from "../../hooks/MirrorShards/useLayer";

interface PlaneProps
  extends ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group> {
  name?: string;
  layer: number[];
  map: THREE.Texture;
}

const Plane: React.FC<PlaneProps> = ({ name, layer, map, ...props }) => {
  const group = useRef<THREE.Group>();

  useEffect(() => {
    group?.current?.lookAt(0, 0, 0);
  }, []);

  const planeRef = useLayer(layer);

  return (
    <group ref={group} {...props}>
      <mesh ref={planeRef}>
        <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]} />
        <customMaterial attach="material" color="white" map={map} opacity={1} />
      </mesh>
    </group>
  );
};

interface PlaneCopiesProps
  extends ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group> {
  name?: string;
  layer: number[];
  map: THREE.Texture;
}

const PlaneCopies: React.FC<PlaneCopiesProps> = ({
  name,
  layer,
  map,
  ...props
}) => {
  const vertices = useMemo(() => {
    const y = new THREE.IcosahedronGeometry(12);
    return y.vertices;
  }, []);

  return (
    <group name={name}>
      {vertices.map((vertex, i) => (
        <Plane
          name={`planeCopy-${i}`}
          key={`planeCopy-${i}`}
          map={map}
          position={vertex}
          layer={layer}
          {...props}
        />
      ))}
    </group>
  );
};

export default PlaneCopies;
