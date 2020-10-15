import { useEffect, useRef, useCallback } from "react";

import state from "../../store";

interface ScrollContainerProps {
  setScrollTop: (newScrollTop: number) => void;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ setScrollTop }) => {
  const ref = useRef<HTMLDivElement>(null);

  // synchronize the local scrollTop with the actual one
  const handleScroll = useCallback(
    (event: any) => {
      if (event.target === event.currentTarget) {
        setScrollTop(event.target.scrollTop);
      }
    },
    [setScrollTop]
  );

  useEffect(() => {
    handleScroll({ target: ref.current });
  }, [handleScroll]);

  return (
    <div className="scrollContainer" onScroll={handleScroll} ref={ref}>
      {new Array(state.sections).fill(null).map((_, index) => (
        <div
          key={index}
          id={"0" + index}
          style={{ height: `${(state.pages / state.sections) * 100}vh` }}
        />
      ))}
    </div>
  );
};

export default ScrollContainer;
