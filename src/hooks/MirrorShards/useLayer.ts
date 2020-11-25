import { useEffect, useRef } from 'react'
import * as THREE from "three";


const useLayer = (layers = [0]) => {
  const ref = useRef<THREE.Mesh>();

  useEffect(() => {
    ref?.current?.layers.disableAll()

    layers.sort().forEach((layer) => {
      ref?.current?.layers.enable(layer);
    });
  });

  return ref;
}

export default useLayer;
