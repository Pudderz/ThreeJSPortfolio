import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas } from "react-three-fiber";
import ProjectInfo from "./ProjectInfo";
import List from "./List";
import { GlobalContext } from "../../../src/contexts/GlobalContext";
import Link from "next/link";
import { makeStyles, Tooltip } from "@material-ui/core";
import Projects from "./Projects";
import { HomeContext } from "../../../src/contexts/HomeContext";
import {
  homePageLoadInDefault,
  homePageLoadInStart,
} from "../../../animations/loadinAnimations";

// Styling
const useStyles = makeStyles({
  home: {
    height: "100vh",
    width: "100%",
    position: "relative",
  },
  loadScreen: {
    position: "relative",
    paddingTop: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    backgroundColor: "#19bc8b",
    width: "0%",
    height: "100%",
  },
  loadContainer: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    zIndex: "10",
    pointerEvents: "none",
  },
  canvasContainer: {
    position: "absolute !important",
    "& canvas": {
      display: "block",
      zIndex: "0",
      position: "absolute",
    },
  },
});

export function PortfolioCanvas(props) {
  let screen = useRef(null);
  let body = useRef(null);

  const { data } = props;

  const classes = useStyles();

  const GlobalContextValue = useContext(GlobalContext);
  const HomeContextValue = useContext(HomeContext);

  const { projectInViewNumber, fastTravelMode } = HomeContextValue;

  const { PreviousLocation, animation, information } = GlobalContextValue;

  //Loadin animations
  useEffect(() => {
    console.log(PreviousLocation);
    if (PreviousLocation === null) {
      homePageLoadInStart(animation.current.canvas, screen, body);
    } else {
      homePageLoadInDefault(animation.current.canvas, screen, body);
    }
    return () => {
      animation.current.canvas.clear();
    };
  }, []);

  return (
    <div className={classes.home}>
      <nav
        className="top"
        style={{
          zIndex: "100",
          display: fastTravelMode ? "none" : "flex",
          pointerEvents: "none",
        }}
      >
        <h2 style={{ color: data[projectInViewNumber].primaryColour }}>
          Matthew Pudney
        </h2>

        <Link style={{ color: "white" }} href="/about">
          <Tooltip title="About page">
            <a
              style={{
                color: data[projectInViewNumber].primaryColour,
                pointerEvents: "all",
                cursor: "pointer",
              }}
            >
              About
            </a>
          </Tooltip>
        </Link>
      </nav>
      <div className={classes.loadContainer}>
        <div
          className={classes.loadScreen}
          ref={(el) => (screen = el)}
          style={{
            backgroundColor: data[projectInViewNumber].primaryColour,
          }}
        ></div>
      </div>
      <div className="noOpacity" ref={(el) => (body = el)}>
        <Canvas
          className={classes.canvasContainer}
          gl={{ antialias: true, preserveDrawingBuffer: true,powerPreference: "high-performance", }}
          camera={{ fov: 45, position: [0, 0, 4] }}
          resize={{ scroll: false }}
          
        >
          {/* Work around to make context work in the canvas */}
          <GlobalContext.Provider value={GlobalContextValue}>
            <HomeContext.Provider value={HomeContextValue}>
              <Projects
                data={data}
                linkTo={() => {}}
                maxNumber={data.length - 1}
              ></Projects>
            </HomeContext.Provider>
          </GlobalContext.Provider>
        </Canvas>

        <List
          information={information}
          data={data}
          whiteOrBlack={data[projectInViewNumber].whiteOrBlackText}
        />

        <ProjectInfo
          number={projectInViewNumber}
          linkTo={() => {}}
          information={information}
          data={data}
        />
      </div>
    </div>
  );
}


export default PortfolioCanvas;
