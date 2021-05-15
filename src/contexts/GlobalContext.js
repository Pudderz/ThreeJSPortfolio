import React, { useRef, useState, useEffect } from "react";
import { TimelineMax } from "gsap/dist/gsap";
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  
  const [PreviousLocation, setPreviousLocation] = useState(null);

  const animation = useRef({
    about: new TimelineMax({ paused: true }),
    canvas: new TimelineMax({ paused: true }),
    project: new TimelineMax({ paused: true }),
  });

  useEffect(() => {
    return () => {
      animation.current.about.kill();
      animation.current.canvas.kill();
      animation.current.project.kill();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        PreviousLocation,
        animation,
        setAnimation: (thing) => (animation.current = thing),
        setPreviousLocation: (e) => setPreviousLocation(e),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
