import React from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

import { Container } from "../Container";
import { Text } from "./Text";
import Plane from "../Plane";
import useContainer from "../../hooks/Container/useContainer";
import state from "../../store";

interface Props {
  image: THREE.Texture;
  index: number;
  offset: number;
  factor: number;
  header: string;
  aspect: number;
  text: string;
}

const Article: React.FC<Props> = ({
  image,
  index,
  offset,
  factor,
  header,
  aspect,
  text,
}) => {
  const {
    contentMaxWidth: width,
    canvasWidth,
    viewportWidth,
    margin,
    mobile,
  } = useContainer();
  const size = aspect < 1 && !mobile ? 0.65 : 1;
  const alignRight = (canvasWidth - width * size - margin) / 2;
  const pixelWidth = (viewportWidth * size) / 2;
  const left = !(index % 2);
  const color = index % 2 ? state.colors.headings[0] : state.colors.headings[1];

  return (
    <Container name={`article-${index}`} factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Text
          name="title"
          left={left}
          right={!left}
          size={width * 0.05}
          color={color}
          top
          position={[
            ((left ? -width : width) * size) / 2,
            (width * size) / aspect / 2 + 0.5,
            -0.02,
          ]}
        >
          {header}
        </Text>

        <Plane
          name="image"
          map={image}
          planeArgs={[1, 1, 32, 32]}
          shift={200}
          scale={[width * size, (width * size) / aspect, 1]}
          frustumCulled={false}
        />

        <Html
          name="text"
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? "left" : "right",
          }}
          position={[
            left ? (-width * size) / 2 : mobile ? -margin / 2 : margin / 2,
            (-width * size) / 2 / aspect - 0.4,
            -0.02,
          ]}
        >
          {text}
        </Html>

        <Container name="article-index" factor={0.2}>
          <Text
            opacity={0.5}
            size={width * 0.1}
            color={state.colors.articleIndex}
            position={[
              ((left ? width : -width) / 2) * (size + 0.1),
              (width * size) / aspect / -1.7,
              -0.02,
            ]}
          >
            {"0" + (index + 1)}
          </Text>
        </Container>
      </group>
    </Container>
  );
};

export default Article;
