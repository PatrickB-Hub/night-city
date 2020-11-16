import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "react-three-fiber";

import customMaterial from "../Plane/CustomMaterial";
import Plane from "../Plane";
import state from "../../store";

function Startup() {
  const { size, camera } = useThree();
  const fov = useRef(state.fov);
  const planeRef = useRef<
    THREE.Mesh<THREE.PlaneBufferGeometry, customMaterial>
  >();
  const prevHeight = useRef(size.height);

  useEffect(() => {
    const onResize = () => {
      const oldRadFov = (fov.current * Math.PI) / 180;
      const newRadFov =
        2 *
        Math.atan(
          (Math.tan(oldRadFov / 2) * window.innerHeight) / prevHeight.current
        );
      const newFov = (newRadFov * 180) / Math.PI;
      (camera as THREE.PerspectiveCamera).fov = newFov;
      prevHeight.current = window.innerHeight;
      fov.current = newFov;
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [camera]);

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
      color={state.colors.background}
      position={[0, 0, 1]}
      scale={[100, 100, 1]}
    />
  );
}

export default Startup;
