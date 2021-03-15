import React, { useState,useRef } from "react";

export const HomeContext = React.createContext();


export const HomeProvider = ({ children }) => {

  const [attractMode, setAttractMode] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;