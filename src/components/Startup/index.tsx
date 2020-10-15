import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import Plane from "../Plane";

function Startup() {
  const planeRef = useRef<
    THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshBasicMaterial>
  >();

  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.material.opacity = THREE.MathUtils.lerp(
        planeRef.current.material.opacity,
        0,
        0.1
      );
    }
  });

  return (
    <Plane
      name="startupPlane"
      ref={planeRef}
      color={"#cecece"}
      position={[0, 0, 1]}
      scale={[100, 100, 1]}
    />
  );
}

export default Startup;
