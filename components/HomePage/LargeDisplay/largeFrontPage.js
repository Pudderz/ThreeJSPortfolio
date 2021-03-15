import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas } from "react-three-fiber";
import HtmlText from "./HtmlText";
import List from "./List";
import { GlobalContext } from "../../../src/contexts/GlobalContext";
import Link from "next/link";
import { makeStyles, Tooltip } from "@material-ui/core";
import Projects from './Projects'
import { HomeContext } from "../../../src/contexts/HomeContext";


// Styling
const useStyles = makeStyles({
  home:{
    height:'100vh',
    width:'100%',
    position:'relative',
  },
  loadScreen: {
    position: 'relative',
    paddingTop: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
    backgroundColor: '#19bc8b',
    width: '0%',
    height: '100%',
  },
  loadContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    zIndex: '10',
    pointerEvents: 'none',
  },
  canvasContainer:{
    position: 'absolute !important',
    '& canvas':{
      display: 'block',
      zIndex: '0',
      position: 'absolute',
    }
  }
})






export function PortfolioCanvas({data}) {
  const {
    PreviousLocation,
    animation,
    information
  } = useContext(GlobalContext);

  const classes = useStyles();

  const GlobalContextValue = useContext(GlobalContext);
  const HomeContextValue = useContext(HomeContext);

  let screen = useRef(null);
  let body = useRef(null);

  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });

  const [propsPosition, setPosition] = useState("right");
  const [positioning, setPositioning] = useState("right");



  //Loadin animations
  useEffect(() => {
    
    if(PreviousLocation ===null){
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
    animation.current.canvas.to(body,{
      css: {
        opacity: "1",
        pointerEvents: "auto",
      }
    },'-=0.2')
    }else{
      animation.current.canvas.to(body, {
        duration: 0.8,
        opacity: "1",
        pointerEvents: "auto",
      });
    }
    return () => {
      animation.current.canvas.clear()
      // TweenMax.to(body, 4, {
      //   css: {
      //     opacity: "0",
      //     pointerEvents: "none",
      //   },
      // });
    };
  }, []);


  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
      setPosition("middle");
      setPositioning("middle");
    } else {
      setAttractTo({
        ...attractTo,
        shouldJump: false,
      });
      setPosition("right");
      setPositioning("right");
    }
  };

  const [displayNumber, setDisplayNumber] = useState(0);

  const displayDom = (num) => {
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


  return (
      <div className={classes.home}>
        <nav className="top" style={{zIndex:'100', display: (attractMode)?'none': 'flex', pointerEvents:'none'}}>
           <h2 style={{ color: data[displayNumber].primaryColour }}>Matthew Pudney</h2>

          <Link style={{ color: "white" }} href="/about">
            <Tooltip title="About page">
               <a style={{ color: data[displayNumber].primaryColour, pointerEvents:'all', cursor: 'pointer' }}>About</a>
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
        <div className="noOpacity" ref={(el) => (body = el)}>
          <Canvas
          className={classes.canvasContainer}
          gl={{ antialias: true ,preserveDrawingBuffer: true,}}
            // style={{ height: "100vh", width: "100vw", position: "absolute" }}
            camera={{ fov: 45, position: [0, 0, 4] }}
          >
            {/* Work around to make context work in the canvas */}
            <GlobalContext.Provider value={GlobalContextValue} >
                <HomeContext.Provider value={HomeContextValue}>
                  <Projects
                data={data}
                  displayDom={displayDom}
                  rotating={propsPosition}
                  positioning={positioning}
                  attractMode={attractMode}
                  attractTo={attractTo}
                  jumpComplete={jumpComplete}
                  displayNumber={displayNumber}
                  goTo={goTo}
                  linkTo={()=>{}}
                  maxNumber= {data.length-1}
                >            

                </Projects>
              </HomeContext.Provider>
            </GlobalContext.Provider>
            
           
          </Canvas>
              
          <List
            changeAttractMode={changeAttractMode}
            attractMode={attractMode}
            goTo={goTo}
            number={displayNumber}
            displayNumber={displayNumber}
            information={information}
            data={data}
            whiteOrBlack={data[displayNumber].whiteOrBlackText}
          />

          <HtmlText
            number={displayNumber}
            attractMode={attractMode}
            linkTo={()=>{}}
            information={information}
            data={data}
          />
        </div>
      </div>
  );
}





export default PortfolioCanvas;