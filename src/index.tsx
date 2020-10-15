import { Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

import Loader from "./components/Loader";
import Startup from "./components/Startup";

function App() {
  return (
    <>
      <Canvas concurrent shadowMap camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={<Loader />}>
          <Startup />
        </Suspense>
      </Canvas>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
