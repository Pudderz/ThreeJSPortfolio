import React, { useState } from "react";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [PreviousLocation, setPreviousLocation] = useState(null);
  const [previousPageColour, setPreviousColour] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        active,
        setActive,
        PreviousLocation,
        setPreviousLocation: e=> setPreviousLocation(e),
        previousPageColour,
        setPreviousColour: e=> setPreviousColour(e),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
