import { useContext } from "react";
import { useThree } from "react-three-fiber";

import { offsetContext } from "../../components/Container";
import state from "../../store";

// custom hook: allows components to access container-specific data so they can react to scroll and resize
const useContainer = () => {
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
  const { sections, pages } = state;
  const viewportWidth = size.width
  const viewportHeight = size.height
  const canvasWidth = viewport.width;
  const canvasHeight = viewport.height;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  const offsetFactor = (offset + 1) / sections;

  return {
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
    offsetFactor
  };
}

export default useContainer;