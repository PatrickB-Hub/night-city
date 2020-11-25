import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'


const useRenderTarget = (settings = {}): [React.MutableRefObject<THREE.CubeCamera | undefined>, THREE.WebGLCubeRenderTarget] => {
  const renderTarget = useMemo(() => {
    const renderTargetSettings = {
      format: THREE.RGBAFormat,
      generateMipmaps: true
    };

    return new THREE.WebGLCubeRenderTarget(1024, {
      ...renderTargetSettings,
      ...settings
    })
  }, [settings]);

  const cubeCamera = useRef<THREE.CubeCamera>();

  useFrame(({ gl, scene }) => {
    cubeCamera?.current?.update(gl, scene);
  });

  return [cubeCamera, renderTarget];
}

export default useRenderTarget;