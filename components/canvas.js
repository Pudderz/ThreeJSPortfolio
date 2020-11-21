import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas } from "react-three-fiber";
import Picture from "./Picture";
import HtmlText from "./HtmlText";
import List from "./List";
import { useRouter } from 'next/router'
import { GlobalContext } from "../src/contexts/GlobalContext";
import { TimelineMax, TweenMax} from "gsap/dist/gsap";
import Link from "next/link";
import { Tooltip } from "@material-ui/core";
import Projects from './Projects'
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
export function PortfolioCanvas({data}) {
  const {
    PreviousLocation,
    previousPageColour,
    setPreviousColour,
    animation,
  } = useContext(GlobalContext);
  const {information} = useContext(GlobalContext);
  const history = useRouter();
  let screen = useRef(null);
  let body = useRef(null);

  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });

  const [propsPosition, setPosition] = useState("right");
  const [positioning, setPositioning] = useState("right");



  //loadin animations
  useEffect(() => {
    
    // var animation.current.canvas = new TimelineMax({onComplete: ()=>setPreviousColour(data[0].primaryColour)});
 
    //   if(PreviousLocation=='project'){
  //     tl.fromTo(screen, {
  //       duration: 0.8,
  //       width: "0%",
  //       right: "0%",
  //       // ease: Power3.easeInOut,
  //     },{
  //       width: "100%",
  //       right: "0%",
  //     });
  
  //     tl.to(screen, {
  //       duration: 0.4,
  //       right: "100%",
  //       // ease: Power3.easeInOut,
  //       delay: 0.3,
  //     });
  
  //     TweenMax.to(body, 1, {
  //       css: {
  //         opacity: "1",
  //         pointerEvents: "auto",
  //         // ease: Power4.easeInOut,
  //       },
  //     })
  // }else{
    animation.current.canvas.to(screen, {
      duration: 0.8,
      width: "100%",
      left: "0%",
      // ease: Power3.easeInOut,
    });

    animation.current.canvas.to(screen, {
      duration: 0.4,
      left: "100%",
      // ease: Power3.easeInOut,
      delay: 0.3,
    });
    animation.current.canvas.to(body,{
      css: {
        opacity: "1",
        pointerEvents: "auto",
      },
    },'-=0.2')
    // TweenMax.to(body, 1, {
    //   css: {
    //     opacity: "1",
    //     pointerEvents: "auto",
    //     // ease: Power4.easeInOut,
    //   },
    // })
  // }  

    return () => {

      animation.current.canvas.clear()
      console.log(previousPageColour)
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

  const linkTo = () => {
    var tl = new TimelineMax({ onComplete: () => history.push("/Contact") });
    tl.to(body, {
      duration: 0.5,
      opacity: "0",
    });
  };

  return (
      <div className="Home">
        <div className="top" style={{zIndex:'100', display: (attractMode)?'none': 'flex', pointerEvents:'none'}}>
          <Link style={{ color: "white" }} href="/">
            
           <a style={{pointerEvents:'all',  cursor: 'pointer'}}><h2 style={{ color: data[displayNumber].primaryColour }}>Matthew Pudney</h2></a> 
          </Link>

          <Link style={{ color: "white" }} href="/about">
            <Tooltip title="About page">
               <a style={{ color: data[displayNumber].primaryColour, pointerEvents:'all', cursor: 'pointer' }}>About</a>
            </Tooltip>
          
          </Link>
        </div>
        <div className="load-container">
          <div
            className="load-screen"
            ref={(el) => (screen = el)}
            style={{
              backgroundColor: data[displayNumber].primaryColour,
            }}
          ></div>
        </div>
        <div className="noOpacity" ref={(el) => (body = el)}>
          <Canvas
          gl={{ antialias: true ,preserveDrawingBuffer: true,}}
            style={{ height: "100vh", width: "100vw", position: "absolute" }}
            camera={{ fov: 45, position: [0, 0, 4] }}
          >
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
              linkTo={linkTo}
              maxNumber= {data.length-1}
            >            

            </Projects>
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
            linkTo={linkTo}
            information={information}
            data={data}
          />
        </div>
      </div>
  );
}





export default PortfolioCanvas;