import useRenderTarget from "../../hooks/MirrorShards/useRenderTarget";
import useReposition from "../../hooks/MirrorShards/useReposition";
import Content from "../Content";
import { Container } from "../Container";
import MirrorShards from "../MirrorShards";

interface Props {
  showMirrorShards: boolean;
}

const Scene: React.FC<Props> = ({ showMirrorShards }) => {
  const [cubeCamera, renderTarget] = useRenderTarget();
  const ref = useReposition();

  return (
    <group name="sceneContainer">
      <Content />
      {showMirrorShards && (
        <>
          <cubeCamera
            layers={[11]}
            name="cubeCamera"
            ref={cubeCamera}
            args={[0.1, 100, renderTarget]}
            position={[0, 0, 5]}
          />
          <Container name="mirrorShards" factor={-0.001} offset={1}>
            <group ref={ref}>
              <MirrorShards
                position={[0, 0, 2]}
                scale={[0.35, 0.35, 0.35]}
                meshLayers={[0, 11]}
                envMap={renderTarget.texture}
              />
            </group>
          </Container>
        </>
      )}
    </group>
  );
};

export default Scene;
