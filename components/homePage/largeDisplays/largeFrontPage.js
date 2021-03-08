import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas } from "react-three-fiber";
import HtmlText from "./ProjectDetails";
import List from "./List";
import { GlobalContext } from "../../../src/contexts/GlobalContext";
import { TweenMax } from "gsap/dist/gsap";
import Link from "next/link";
import { makeStyles, Tooltip } from "@material-ui/core";
import Projects from "../../canvas/Projects";
import Background from "../../Background";
import SideBar from "../../sideBar";

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

export function PortfolioCanvas({ data }) {

  const GlobalContextValue = useContext(GlobalContext);
  const { PreviousLocation, animation} = GlobalContextValue;

  const classes = useStyles();

  let screen = useRef(null);
  let body = useRef(null);

  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });
  const [positioning, setPositioning] = useState("right");
  const [displayNumber, setDisplayNumber] = useState(0);
  const [sideBarWidth, setSideBarSize] = useState("10px");

  //Loadin animations
  useEffect(() => {
    if (PreviousLocation === null) {
      animation.current.canvas.to(screen, {
        duration: 0.8,
        width: "100%",
        left: "0%",
      });

      animation.current.canvas.to(screen, {
        duration: 0.4,
        left: "100%",
        delay: 0.3,
      });
      animation.current.canvas.to(
        body,
        {
          css: {
            opacity: "1",
            pointerEvents: "auto",
          },
        },
        "-=0.2"
      );
    } else {
      animation.current.canvas.to(body, {
        duration: 0.8,
        opacity: "1",
        pointerEvents: "auto",
      });
    }
    return () => {
      animation.current.canvas.clear();
    };
  }, []);

  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
      setPositioning("middle");
    } else {
      setAttractTo({
        ...attractTo,
        shouldJump: false,
      });
      setPositioning("right");
    }
  };

  const changeDisplayNumber = (num) => {
    if (displayNumber !== num) {
      setDisplayNumber(num);
    }
  };

  const goTo = (number) => {
    setAttractTo({
      goTo: number,
      shouldJump: true,
    });
  };

  const jumpComplete = (number) => {
    setAttractTo({
      ...attractTo,
      shouldJump: false,
    });
  };

  const sideBarLarge = (event, boolean) => {
    event.stopPropagation();
    if (boolean) {
      setSideBarSize("15px");
    } else {
      setSideBarSize("10px");
    }
  };

  return (
    <div className={classes.home}>
      <nav
        className="top"
        style={{
          zIndex: "100",
          display: attractMode ? "none" : "flex",
          pointerEvents: "none",
        }}
      >
        <h2 style={{ color: data[displayNumber].primaryColour }}>
          Matthew Pudney
        </h2>
        <Link style={{ color: "white" }} href="/about">
          <Tooltip title="About page">
            <a
              style={{
                color: data[displayNumber].primaryColour,
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
            backgroundColor: data[displayNumber].primaryColour,
          }}
        ></div>
      </div>
      <div 
      // className="noOpacity" 
      ref={(el) => (body = el)}
      >
        <Canvas
          className={classes.canvasContainer}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ fov: 45, position: [0, 0, 4] }}
        >
          {/* Work around to make context work in a canvas */}
          <GlobalContext.Provider value={GlobalContextValue}>
            <Projects
              data={data}
              changeDisplayNumber={changeDisplayNumber}
              positioning={positioning}
              attractMode={attractMode}
              attractTo={attractTo}
              jumpComplete={jumpComplete}
              displayNumber={displayNumber}
              goTo={goTo}
              maxNumber={data.length - 1}
            ></Projects>
          </GlobalContext.Provider>
        </Canvas>

        <List
          changeAttractMode={changeAttractMode}
          attractMode={attractMode}
          goTo={goTo}
          number={displayNumber}
          displayNumber={displayNumber}
          information={data}
          data={data}
          whiteOrBlack={data[displayNumber].whiteOrBlackText}
        />

        <HtmlText
          number={displayNumber}
          attractMode={attractMode}
          linkTo={() => {}}
          information={data}
          data={data}
          sideBarLarge={sideBarLarge}
        />
        <Background
          information={data}
          attractMode={attractMode}
          number={displayNumber}
          loadIn={true}
        />
        <SideBar
          information={data}
          attractMode={attractMode}
          number={displayNumber}
          sideBarRef={sideBarWidth}
          sideBarLarge={sideBarLarge}
        />
        
      </div>
    </div>
  );
}

export default PortfolioCanvas;
