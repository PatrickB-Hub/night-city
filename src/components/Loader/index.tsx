import { useProgress, Html } from "@react-three/drei";

const Loader: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <span style={{ color: "#FFFFFF" }}>{progress} % loaded</span>
    </Html>
  );
};

export default Loader;
