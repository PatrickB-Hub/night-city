import { useState, useRef, useContext } from "react";
import * as THREE from "three";
import { ReactThreeFiber, useFrame, useResource } from "react-three-fiber";

import useLayer from "../../hooks/MirrorShards/useLayer";
import useContainer from "../../hooks/Container/useContainer";
import useShardGeometry from "../../hooks/MirrorShards/useShardGeometry";
import { ThinFilmFresnelMap } from "./ThinFilmFresnelMap";
import { ScrollTopContext } from "../../context";
import state from "../../store";

const scale = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

interface Props {
  name?: string;
  sideMaterial: THREE.MeshLambertMaterial;
  reflectionMaterial: THREE.MeshLambertMaterial;
  layers: number[];
}

const MirrorShard: React.FC<Props> = ({
  name,
  sideMaterial,
  reflectionMaterial,
  layers,
  ...props
}) => {
  const ref = useLayer(layers);

  const geometry = useShardGeometry();
  const geom = geometry.clone();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh
      name={name}
      ref={ref}
      geometry={geom}
      material={[
        reflectionMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        reflectionMaterial,
      ]}
      {...props}
    />
  );
};

interface MirrorShardsProps
  extends ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group> {
  envMap: THREE.Texture;
  meshLayers: number[];
}

const MirrorShards: React.FC<MirrorShardsProps> = ({
  envMap,
  meshLayers,
  ...props
}) => {
  const ref = useRef<THREE.Group>();
  const { viewportHeight, canvasWidth } = useContainer();
  const scrollTop = useContext(ScrollTopContext);

  const [thinFilmFresnelMap] = useState(new ThinFilmFresnelMap());

  const sideMaterial = useResource<THREE.MeshLambertMaterial>();
  const reflectionMaterial = useResource<THREE.MeshLambertMaterial>();

  useFrame(() => {
    if (ref.current) {
      const top = scrollTop.current;
      const curX = ref.current.position.x;
      const nextX = scale(
        Math.sin((top / viewportHeight) * Math.PI),
        1,
        -1,
        -canvasWidth + canvasWidth / 2,
        canvasWidth - canvasWidth / 2
      );
      ref.current.position.x = THREE.MathUtils.lerp(curX, nextX, 0.1);
    }
  });

  return (
    <group ref={ref} name="MirrorShards" {...props}>
      <meshLambertMaterial
        ref={sideMaterial}
        map={thinFilmFresnelMap as unknown as THREE.Texture}
        color="#aaa"
      />
      <meshLambertMaterial
        ref={reflectionMaterial}
        map={thinFilmFresnelMap as unknown as THREE.Texture}
        envMap={envMap}
        color="#fff"
      />
      {state.shards.map((shard, index) => (
        <MirrorShard
          name={`shard-${index}`}
          key={`shard-${index}`}
          sideMaterial={sideMaterial.current}
          reflectionMaterial={reflectionMaterial.current}
          layers={meshLayers}
          {...shard}
        />
      ))}
    </group>
  );
};

export default MirrorShards;
