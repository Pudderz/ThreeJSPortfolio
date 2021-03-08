import React, { useRef, useState, useEffect } from "react";
import { TimelineMax } from "gsap/dist/gsap";
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [PreviousLocation, setPreviousLocation] = useState(null);
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
        PreviousLocation,
        animation,
        colours,
        setColours: (primaryColor, secondaryColor) => {
          setColours({
            primaryColour: primaryColor,
            secondaryColour: secondaryColor,
          });
        },
        setPreviousLocation: (e) => setPreviousLocation(e),
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
