import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import { MultilineText } from "./Text";
import Article from "./Article";
import Plane from "../Plane";
import { Container } from "../Container";
import Cross from "./Cross";
import Lines from "./Lines";
import Star from "./Star";

import useContainer from "../../hooks/Container/useContainer";
import state from "../../store";

const Content: React.FC = () => {
  const hero = useTexture(state.hero.image);
  const images = useTexture(state.articles.map(({ image }) => image));
  const {
    contentMaxWidth: width,
  } = useContainer();

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

      {state.crosses.map(({ factor, offset, ...props }, index) => (
        <Container
          name={`cross-${index}`}
          key={index}
          factor={factor}
          offset={offset}
        >
          <Cross {...props} />
        </Container>
      ))}
      {state.lines.map(({ factor, offset, ...props }, index) => (
        <Container
          name={`line-${index}`}
          key={index}
          factor={factor}
          offset={offset}
        >
          <Lines {...props} />
        </Container>
      ))}
      {state.stars.map(({ factor, offset, ...props }, index) => (
        <Container
          name={`star-${index}`}
          key={index}
          factor={factor}
          offset={offset}
        >
          <Star {...props} />
        </Container>
      ))}

      {state.stripes.map(({ offset, color, height }, index) => (
        <Container
          name={`stripe-${index}`}
          key={index}
          factor={-1.5}
          offset={offset}
        >
          <Plane
            planeArgs={[50, height, 32, 32]}
            shift={-4}
            color={color}
            rotation={[0, 0, Math.PI / 8]}
            position={[0, 0, -0.1]}
          />
        </Container>
      ))}

      {state.articles.map((props, index) => (
        <Article key={index} index={index} {...props} image={images[index]} />
      ))}

      <Container
        name="text-night_city"
        factor={1.2}
        offset={state.textComponentOffset}
      >
        <MultilineText
          top
          left
          size={width * 0.15}
          lineHeight={width / 4.5}
          position={[-width / 3.5, 0, -0.01]}
          color={state.colors.headings[0]}
          text={"Night\nCity"}
        />
      </Container>

      <Container name="text-2077" factor={1.25} offset={9.1}>
        <MultilineText
          top
          left
          size={width * 0.15}
          lineHeight={width / 4.5}
          position={[-width / 3.5, 0, -0.01]}
          color={state.colors.headings[1]}
          text={"2077"}
        />
      </Container>
    </>
  );
};

export default Content;
