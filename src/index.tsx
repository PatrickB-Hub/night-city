import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

function App() {
  return (
    <>
      <Canvas concurrent shadowMap camera={{ position: [0, 0, 5] }}>
        
      </Canvas>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
