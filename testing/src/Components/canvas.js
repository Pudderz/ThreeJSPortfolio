import React, { Component, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import ReactDOM from "react-dom";
import Picture from "./Picture";
import Group from "./Group";
import HtmlText from "./HtmlText";
import List from "./List";

export function Test() {
  const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState(0);

  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
      setPosition({
        x: -0.7,
        y: -0,
        z: -0,
      });
    } else {
      setPosition({
        x: -0.3,
        y: -0.5,
        z: -0.1,
      });
    }
  };

  const [propsPosition, setPosition] = useState({
    x: -0.3,
    y: -0.5,
    z: -0.1,
  });

  const [displayNumber, setDisplayNumber] = useState(0);

  const group = useRef();
  const material = useRef();

  const displayDom = (num) => {
    if (displayNumber !== num) {
      setDisplayNumber(num);
      console.log(num);
    }
  };
  const goTo = (number) => {
    setAttractTo(number)
  };

  return (
    <div>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ fov: 75, position: [0, 0, 1.5] }}
      >
        <ambientLight intensity={0.5} style={{ height: "100vh" }} />
        {/* <Group/> */}
        <Picture
          index={0}
          displayDom={displayDom}
          positioning={propsPosition}
          attractMode={attractMode}
          attractTo={attractTo}
        />
        <Picture
          index={1}
          displayDom={displayDom}
          positioning={propsPosition}
          attractMode={attractMode}
          attractTo={attractTo}
        />
        <Picture
          index={2}
          displayDom={displayDom}
          positioning={propsPosition}
          attractMode={attractMode}
          attractTo={attractTo}
        />
        <Picture
          index={3}
          displayDom={displayDom}
          positioning={propsPosition}
          attractMode={attractMode}
          attractTo={attractTo}
        />
      </Canvas>
      <List attractMode={changeAttractMode} goTo={goTo} />
      <HtmlText number={displayNumber} />
    </div>
  );
}

export default Test;
