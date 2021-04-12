import React, { useRef, useEffect, useContext } from "react";
import { useFrame } from "react-three-fiber";
import Picture from "./Picture";
import normalizeWheel from "normalize-wheel";

import HomeContext from "../../../src/contexts/HomeContext";

export function Projects(props) {
  const {
    setJumpMode,
    jumpMode,
    targetProjectNumber,
    fastTravelMode,
    setTargetProjectNumber,
    setProjectInViewNumber,
  } = useContext(HomeContext);


  const speed = useRef(0);
  const rounded = useRef(0);
  const position = useRef(0);
  const distance = useRef(0);


  const size = useRef(
    window.innerWidth / 1900 > 1 ? 1 : window.innerWidth / 1900
  );



  const wheel = (e)=>{
    const normalized = normalizeWheel(e);
    speed.current += normalized.pixelY * 0.0003;
  }

  const resize = (e)=>{
    const value = window.innerWidth / 1900 > 1 ? 1 : window.innerWidth / 1900;
    size.current = value > 1 ? 1 : value;
  }

  useEffect(() => {
    window.addEventListener("wheel", (e) => wheel(e));
    window.addEventListener("resize", (e) => resize(e));

    return () => {
      window.removeEventListener("wheel", (e) => wheel(e));
      window.removeEventListener("resize", (e) => resize(e));
    };
  }, []);

  useFrame(() => {
    const startRound = rounded.current;
    let newPosition = position.current;
    //checks to make sure users dont scroll out of the list
    if (position.current < -0 || position.current > props.maxNumber) {
      if (position.current < -0.3 || position.current > props.maxNumber + 0.3) {
        speed.current = 0;
      } else {
        speed.current *= 0.25;
      }
    }

    if (speed.current !== 0 || jumpMode) {
      newPosition = speed.current + position.current;
      speed.current = speed.current * 0.8;
      rounded.current = Math.round(newPosition);
    }

    distance.current =
      1 - Math.min(Math.abs(newPosition - props.index), 1) ** 2;

    //Changes current display number that is being displayed to change
    // the title and text for the project
    if (startRound !== rounded.current) {
      setProjectInViewNumber(rounded.current);
    }

    let diff = rounded.current - newPosition;

    if (fastTravelMode || jumpMode) {
      // Speeds up selection with attractmode is true (when right markers are hovered)
      newPosition -= fastTravelMode
        ? (newPosition - targetProjectNumber) * 0.1
        : (newPosition - targetProjectNumber) * 0.05;

      // Cancels jump once picture is mostly at the center
      if (
        jumpMode &&
        Math.round(newPosition * 2) / 2 == targetProjectNumber
      ) {
        setJumpMode(false);
      }
    } else {
      newPosition =
        newPosition + Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
    }

    position.current = newPosition;
  });


  const goTo = (number) => {
    setTargetProjectNumber(number);
    setJumpMode(true);
  };
  const linkTo = (number) => props.linkTo(number);

  return (
    <group>
      {props.data.map((project, index) => (
        <Picture
          position={position}
          size={size}
          key={index}
          index={index}
          goTo={goTo}
          linkTo={linkTo}
          image={project.mainImage.url}
          maxNumber={props.data.length - 1}
          slug={project.slug}
        />
      ))}
    </group>
  );
}

export default Projects;
