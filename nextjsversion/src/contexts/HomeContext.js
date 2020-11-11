import React, { useState } from "react";

export const HomeContext = React.createContext();

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
        information
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
