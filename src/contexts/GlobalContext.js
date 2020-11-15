import React, { useRef, useState, useEffect } from "react";
import { TimelineMax } from "gsap/dist/gsap";
export const GlobalContext = React.createContext();
const information = {
  1: {
    title: "Project 1",
    descripttion: "Description 3",
    primaryColor: "white",
    secondaryColor: "#1b1f25",
    textColor: "white",
  },
  0: {
    title: "Project 2",
    descripttion: "Description 2",
    primaryColor: "#978d58",
    secondaryColor: "#0b5269",
    textColor: "white",
  },
  2: {
    title: "Project 3",
    descripttion: "Description 3",
    primaryColor: "#FCBC3E",
    secondaryColor: "#778899",
    textColor: "white",
  },
  3: {
    title: "Project 4",
    descripttion: "Description 4",
    primaryColor: "white",
    secondaryColor: "#1e7753",
    textColor: "white",
  },
};


export const GlobalProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [PreviousLocation, setPreviousLocation] = useState(null);
  const [previousPageColour, setPreviousColour] = useState(null);

  const animation = useRef({
    about:new TimelineMax({ paused: true }),
    canvas: new TimelineMax({ paused: true }),
    project: new TimelineMax({ paused: true }),
  });
  
  useEffect(()=>{
    return ()=>{
       animation.current.about.kill();
       animation.current.canvas.kill();
       animation.current.project.kill();
    }
  },[])
  return (
    <GlobalContext.Provider
      value={{
        active,
        setActive,
        PreviousLocation,
        animation,
        setAnimation: (thing)=> (animation.current = thing),
        setPreviousLocation: e=> setPreviousLocation(e),
        previousPageColour,
        information,
        setPreviousColour: e=> setPreviousColour(e),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
