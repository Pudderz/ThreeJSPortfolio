import React, { useState } from "react";

export const HomeContext = React.createContext();


export const HomeProvider = ({ children }) => {
//   const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });
  const [attractMode, setAttractMode] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
