import React, { useState,useRef } from "react";

export const HomeContext = React.createContext();


export const HomeProvider = ({ children }) => {

  const [attractMode, setAttractMode] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);


  const [targetProjectNumber, setTargetProjectNumber] = useState(0);
  const [projectInViewNumber, setProjectInViewNumber] = useState(0);
  const [fastTravelMode, setFastTravelMode] = useState(false);
  const [jumpMode, setJumpMode] = useState(false);
  const position = useRef(0)

  return (
    <HomeContext.Provider
      value={{
        displayDom: (e) => {
          if (displayNumber !== e) setDisplayNumber(e);
        },
        setDisplayNumber: (number) => setDisplayNumber(number),
        setAttractMode: (boolean) => setAttractMode(boolean),
        displayNumber,
        attractMode,
        position,
        targetProjectNumber,
        projectInViewNumber,
        fastTravelMode,
        jumpMode,
        setTargetProjectNumber: (number) =>setTargetProjectNumber(number),
        setProjectInViewNumber: (number) => setProjectInViewNumber(number),
        setFastTravelMode: (boolean) => setFastTravelMode(boolean),
        setJumpMode: (boolean) => setJumpMode(boolean),
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;