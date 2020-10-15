import { useRef, Suspense } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";

import "./styles.css";

import Loader from "./components/Loader";
import Startup from "./components/Startup";
import ScrollContainer from "./components/Container/ScrollContainer";
import Nav from "./components/Nav";

import state from "./store";

function App() {
  const scrollTop = useRef(state.scrollTop);

  return (
    <>
      <Canvas concurrent shadowMap camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={<Loader />}>
          <Startup />
        </Suspense>
        <ambientLight intensity={0.8} />
      </Canvas>
      <ScrollContainer
        setScrollTop={(newScrollTop: number) => {
          scrollTop.current = newScrollTop;
        }}
      />
      <Nav />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
