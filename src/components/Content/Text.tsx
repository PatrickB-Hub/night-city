import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import * as THREE from "three";
import { ReactThreeFiber, useFrame } from "react-three-fiber";

import CustomMaterial from "../Plane/CustomMaterial";
import { ScrollTopContext } from "../../context";
import state from "../../store";

interface Props
  extends ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group> {
  children?: string;
  size?: number;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  color?: string;
  opacity?: number;
  height?: number;
  font?: string;
}

const Text: React.FC<Props> = ({
  children,
  size = 1,
  left,
  right,
  top,
  bottom,
  color = "white",
  opacity = 1,
  height = 0.01,
  font = state.font,
  ...props
}) => {
  const [geometry, setGeometry] = useState<THREE.TextBufferGeometry>();
  const scrollTop = useContext(ScrollTopContext);

  useEffect(() => {
    const loader = new THREE.FontLoader();
    loader.load(font, (font) => {
      const tbf = new THREE.TextBufferGeometry(children as string, {
        font,
        size: 1,
        height,
        curveSegments: 32,
      });
      setGeometry(tbf);
    });
  }, [children, font, height]);

  const onUpdate = useCallback(
    (self) => {
      const box = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(box);
      self.position.x = left ? 0 : right ? -box.x : -box.x / 2;
      self.position.y = top ? 0 : bottom ? -box.y : -box.y / 2;
    },
    [left, right, top, bottom]
  );

  const ref = useRef<CustomMaterial>();
  let last = scrollTop.current;
  useFrame(() => {
    if (ref.current) {
      ref.current.shift = THREE.MathUtils.lerp(
        ref.current.shift,
        (scrollTop.current - last) / 200,
        0.1
      );
    }
    last = scrollTop.current;
  });

  return (
    <group scale={[size, size, 0.1]} {...props}>
      <mesh geometry={geometry} onUpdate={onUpdate} frustumCulled={false}>
        <customMaterial
          ref={ref}
          attach="material"
          color={color}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
};

interface MultilineTextProps extends Props {
  text: string;
  lineHeight?: number;
  position?: [x: number, y: number, z: number];
}

const MultilineText: React.FC<MultilineTextProps> = ({
  text,
  size = 1,
  lineHeight = 1,
  position = [0, 0, 0],
  ...props
}) => {
  return (
    <>
      {text.split("\n").map((text, index) => (
        <Text
          key={index}
          position={[
            position[0],
            position[1] - index * lineHeight,
            position[2],
          ]}
          size={size}
          children={text}
          {...props}
        />
      ))}
    </>
  );
};

export { Text, MultilineText };
