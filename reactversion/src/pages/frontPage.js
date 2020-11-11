import React, { useState } from "react";
import Test from "../Components/canvas";
import SmallFrontPage from "../Components/smallFrontPage";
import { HomeProvider } from "../contexts/HomeContext";
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

export default function FrontPage() {
  const [width, setWidth] = useState(
    window.innerWidth > 1100 ? "large" : "small"
  );
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1100 && width !== "small") {
      setWidth("small");
    } else if (window.innerWidth > 1100 && width !== "large") {
      setWidth("large");
    }
  });
  return (
    <HomeProvider>
      <div>{width === "large" ? <Test /> : <SmallFrontPage />}</div>
    </HomeProvider>
  );
}
