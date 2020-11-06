import React, { Component, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import Picture from "../components/Picture";
import { useRouter } from 'next/router'
import HtmlText from "../components/HtmlText";
import List from "../components/List";
import { TweenMax} from "gsap";
import { TimelineMax} from "gsap";
import {  Power3, Power4 } from "gsap";
import { HomeContext } from "../components/HomeContext";
import Title from "../components/Title";

export function Index() {
  const router = useRouter();
  let screen = useRef(null);
  let body = useRef(null);
  useEffect(() => {
    var tl = new TimelineMax();

    tl.to(screen, {
      duration: 0.8,
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

    TweenMax.to(body, 1, {
      css: {
        opacity: "1",
        pointerEvents: "auto",
        ease: Power4.easeInOut,
      },
    }).delay(1);
    // tl.set(screen, { left: "-100%" });
    // TweenMax.to(body, .3, {css: {
    //   opacity: "1",
    //   pointerEvents: "auto",
    //   ease: Power4.easeInOut
    // }}).delay(2);
    return () => {
      TweenMax.to(body, 4, {
        css: {
          opacity: "0",
          pointerEvents: "none",
        },
      });
    };
  }, []);

  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });

  const [propsPosition, setPosition] = useState("right");
  const [positioning, setPositioning] = useState("right");

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
      console.log(num);
    }
  };
  const goTo = (number) => {
    console.log(number);
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
    var tl = new TimelineMax({ onComplete: () => router.push("/Contact") });

    tl.to(body, {
      duration: 0.5,
      opacity: "0",
    });
  };
  return (
    <HomeContext.Provider
      value={{
        displayDom: (e) => displayDom,
        jumpComplete: (e) => jumpComplete,
        goTo: (e) => goTo,
        linkTo: (e) => linkTo,

        state: {
          rotating: propsPosition,
          positioning: positioning,
          attractMode: attractMode,
          attractTo: attractTo,
          displayNumber: displayNumber,
        },
      }}
    >
      <div className="Home">
        <div className="load-container">
          <div className="load-screen" ref={(el) => (screen = el)}></div>
        </div>
        <div className="noOpacity" ref={(el) => (body = el)}>
          <Title />
          <Canvas
            style={{ height: "100vh", width: "100vw", position: "absolute" }}
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
              displayNumber={displayNumber}
              goTo={goTo}
              linkTo={linkTo}
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
              displayNumber={displayNumber}
              linkTo={linkTo}
            />
            <Picture
              index={2}
              displayDom={displayDom}
              rotating={propsPosition}
              positioning={positioning}
              attractMode={attractMode}
              attractTo={attractTo}
              jumpComplete={jumpComplete}
              displayNumber={displayNumber}
              goTo={goTo}
              linkTo={linkTo}
            />
            <Picture
              index={3}
              displayDom={displayDom}
              rotating={propsPosition}
              positioning={positioning}
              attractMode={attractMode}
              attractTo={attractTo}
              jumpComplete={jumpComplete}
              displayNumber={displayNumber}
              goTo={goTo}
              linkTo={linkTo}
            />
          </Canvas>

          <List
            attractMode={changeAttractMode}
            goTo={goTo}
            number={displayNumber}
          />

          <HtmlText
            number={displayNumber}
            attractMode={attractMode}
            linkTo={linkTo}
          />
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export default Index;
