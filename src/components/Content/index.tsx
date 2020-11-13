import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import Article from "./Article";
import Plane from "../Plane";
import { Container } from "../Container";

import useContainer from "../../hooks/Container/useContainer";
import state from "../../store";

const Content: React.FC = () => {
  const hero = useTexture(state.hero.image);
  const images = useTexture(state.articles.map(({ image }) => image));
  const { contentMaxWidth: width } = useContainer();

  useMemo(() => {
    hero.minFilter = THREE.LinearFilter;
    images.forEach((texture) => (texture.minFilter = THREE.LinearFilter));
  }, [images, hero]);

  return (
    <>
      <Container name="hero" factor={1.2}>
        <Plane
          name="title"
          map={hero}
          color={state.colors.background}
          planeArgs={[1, 1, 32, 32]}
          shift={50}
          scale={[width, width / 4, 1]}
          position={[-width / 35, 0, -0.01]}
        />
      </Container>

      {state.articles.map((props, index) => (
        <Article key={index} index={index} {...props} image={images[index]} />
      ))}
    </>
  );
};

export default Content;
