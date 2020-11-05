import React, { Component, useRef, useState, useEffect} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import ReactDOM from "react-dom";
import Picture from "./Picture";
import Group from "./Group";
import HtmlText from "./HtmlText";
import List from "./List";
import { NavLink, useHistory } from "react-router-dom";
import { TweenMax, TimelineMax, Power3, Power4 } from "gsap";
export function Test() {
  const history= useHistory()
  let screen = useRef(null);
  let body = useRef(null);
  useEffect(() => {
    var tl = new TimelineMax();

    tl.to(screen, {
      duration: .8,
      width: "100%",
      left: "0%",
      ease: Power3.easeInOut,
    });
    
    tl.to(screen, {
      duration: 0.4,
      left: "100%",
      ease: Power3.easeInOut,
      delay: 0.3,
    });


    TweenMax.from(body, 1,{css: {
      opacity: "0",
      pointerEvents: "auto",
      ease: Power4.easeInOut
    }}).delay(1);
    // tl.set(screen, { left: "-100%" });
    // TweenMax.to(body, .3, {css: {
    //   opacity: "1",
    //   pointerEvents: "auto",
    //   ease: Power4.easeInOut
    // }}).delay(2);
    return () => {
      TweenMax.to(body, 4, {css: {
        opacity: "0",
        pointerEvents: 'none'
      }});
  }
  },[]);

  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({goTo:0, shouldJump:false});

  const [propsPosition, setPosition] = useState('right');
  const [positioning, setPositioning] = useState('right');

  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
      setPosition('middle');
      // setPosition({
      //   x: -0.7,
      //   y: -0,
      //   z: -0,
      // });
      setPositioning('middle')
      // setPositioning({
      //   x: 0,
      //   y: 0,
      //   z: 0,
      // })
    
    } else {
      setAttractTo({
        ...attractTo,
        shouldJump:false,
      })
      setPosition('right');
      setPositioning('right')
    }
  };



  const [displayNumber, setDisplayNumber] = useState(0);

  const displayDom = num => {
    if (displayNumber !== num) {
      setDisplayNumber(num);
      console.log(num);
    }
  };
  const goTo = number => {
    console.log(number)
    setAttractTo({
      goTo:number,
      shouldJump:true,
    })
  };
  const jumpComplete = (number) => {
    setAttractTo({
      ...attractTo,
      shouldJump: false,
    })
  };
  const linkTo= ()=>{
     var tl = new TimelineMax({onComplete:()=>history.push("/Contact")});

    tl.to(body, {
      duration: 0.5,
      opacity: "0",
    });
    
  }
  return (
    <div className="Home">
      <div className="load-container">
        <div className="load-screen" ref={(el) => (screen = el)}>
        </div>
      </div>
    <div
    ref={(el) => (body = el)}
    
    >
      <Canvas
        style={{ height: "100vh", width: "100vw", position:"absolute" }}
        camera={{ fov: 45, position: [0, 0, 4] }}
      >
        <ambientLight intensity={0.5} style={{ height: "100vh" }} />
        {/* <Group/> */}
        <Picture
          index={0}
          displayDom={displayDom}
          rotating={propsPosition}
          positioning={positioning}
          attractMode={attractMode}
          attractTo={attractTo}
          jumpComplete={jumpComplete}
          goTo={goTo}
        />
        <Picture
          index={1}
          displayDom={displayDom}
          rotating={propsPosition}
          positioning={positioning}
          attractMode={attractMode}
          attractTo={attractTo}
          jumpComplete={jumpComplete}
          goTo={goTo}
        />
        <Picture
          index={2}
          displayDom={displayDom}
          rotating={propsPosition}
          positioning={positioning}
          attractMode={attractMode}
          attractTo={attractTo}
          jumpComplete={jumpComplete}
          goTo={goTo}
        />
        <Picture
          index={3}
          displayDom={displayDom}
          rotating={propsPosition}
          positioning={positioning}
          attractMode={attractMode}
          attractTo={attractTo}
          jumpComplete={jumpComplete}
          goTo={goTo}
        />
      </Canvas>
      <List attractMode={changeAttractMode} goTo={goTo} />

        <HtmlText number={displayNumber}
        attractMode={attractMode}
        linkTo={linkTo}
        />
  
      
    </div>
    </div>
  );
}

export default Test;
