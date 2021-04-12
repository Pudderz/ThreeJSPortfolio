import React, { useRef, useState, useEffect } from "react";
import { TimelineMax } from "gsap/dist/gsap";
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  
  const [PreviousLocation, setPreviousLocation] = useState(null);
  const [previousPageColour, setPreviousColour] = useState(null);

  const [colours, setColours] = useState({
    primaryColour: null,
    secondaryColour: null,
  });

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
        active,
        setActive,
        PreviousLocation,
        animation,
        colours,
        setColours: (primaryColor, secondaryColor) => {
          setColours({
            primaryColour: primaryColor,
            secondaryColour: secondaryColor,
          });
        },
        setAnimation: (thing) => (animation.current = thing),
        setPreviousLocation: (e) => setPreviousLocation(e),
        previousPageColour,
        setPreviousColour: (e) => setPreviousColour(e),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
