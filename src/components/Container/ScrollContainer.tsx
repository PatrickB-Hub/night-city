import { useEffect, useRef, useCallback } from "react";

import state from "../../store";

interface ScrollContainerProps {
  setScrollTop: (newScrollTop: number) => void;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ setScrollTop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const previousSection = useRef<number>(0);
  const navItems = useRef<HTMLElement | null>();

  // synchronize the local scrollTop with the actual one
  const handleScroll = useCallback(
    (event: any) => {
      if (event.target === event.currentTarget) {
        setScrollTop(event.target.scrollTop);

        // show current section in the navigation bar
        const nextSection = Math.floor(
          (event.target.scrollTop / event.target.scrollHeight) * 10
        );

        if (previousSection.current !== nextSection) {
          navItems?.current?.children
            ?.item(previousSection.current)
            ?.classList.toggle("active");
          navItems?.current?.children
            ?.item(nextSection)
            ?.classList.toggle("active");
          previousSection.current = nextSection;
        }
      }
    },
    [setScrollTop]
  );

  useEffect(() => {
    if (!navItems.current) {
      navItems.current = document.getElementById("nav");
      navItems?.current?.children?.item(0)?.classList.toggle("active");
    }

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
