import React, { createContext, useContext, useRef } from "react";
import * as THREE from "three";
import { ReactThreeFiber, useFrame } from "react-three-fiber";

import { ScrollTopContext } from "../../context";
import useContainer from "../../hooks/Container/useContainer";

const offsetContext = createContext(0);

interface ContainerProps
  extends ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group> {
  name?: string;
  offset?: number;
  factor: number;
}

const Container: React.FC<ContainerProps> = ({
  children,
  name,
  offset,
  factor,
  ...props
}) => {
  const {
    offset: parentOffset,
    sectionHeight,
    viewportHeight,
  } = useContainer();
  const ref = useRef<THREE.Group>();
  const scrollTop = useContext(ScrollTopContext);

  offset = offset || parentOffset;

  // Runs every frame and lerps the inner container into its place
  useFrame(() => {
    if (ref.current) {
      const curY = ref.current.position.y;
      const curTop = scrollTop.current;
      ref.current.position.y = THREE.MathUtils.lerp(
        curY,
        (curTop / (viewportHeight / sectionHeight)) * factor,
        0.1
      );
    }
  });

  return (
    <offsetContext.Provider value={offset}>
      <group
        name={name}
        position={[0, -sectionHeight * offset * factor, 0]}
        {...props}
      >
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
};

export { offsetContext, Container };
