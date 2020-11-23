import React, { useContext, useRef, useState, useEffect } from "react";
import { HomeContext } from "../src/contexts/HomeContext";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { useRouter } from "next/router";
import Picture from "./Picture";
import normalizeWheel from 'normalize-wheel';
export default function Projects(props) {

  const speed = useRef(0);
  const rounded = useRef(0);
  const position = useRef(0);
  const distance = useRef(0);

  useEffect(() => {
    window.addEventListener("wheel", (e) => {
      // speed.current += e.deltaY * 0.0003;
      const normalized = normalizeWheel(e);
      console.log( normalized);
      speed.current += normalized.pixelY * 0.0003;
    });

    return () => {
      window.removeEventListener("wheel", (e) => {
        speed.current += e.deltaY * 0.0003;
      });
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

    if (speed.current !== 0 || props.attractTo.shouldJump) {
      newPosition = speed.current + position.current;
      speed.current = speed.current * 0.8;
      rounded.current = Math.round(newPosition);
    }

    distance.current =
      1 - Math.min(Math.abs(newPosition - props.index), 1) ** 2;


    //Changes current display number that is being displayed to change
    // the title and text for the project
    if ( startRound !== rounded.current) {
      props.displayDom(rounded.current);
    }

    let diff = rounded.current - newPosition;

    if (props.attractMode || props.attractTo.shouldJump) {

      // Speeds up selection with attractmode is true (when right markers are hovered)
      newPosition -= props.attractMode
        ? (newPosition - props.attractTo.goTo) * 0.1
        : (newPosition - props.attractTo.goTo) * 0.05;

      //cancels jump too once picture is mostly at the center
      if (
        props.attractTo.shouldJump &&
        Math.round(newPosition * 2) / 2 == props.attractTo.goTo
      ) {
        props.jumpComplete();
      }
    } else {
      newPosition =
        newPosition + Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.05;
    }

    position.current = newPosition;
  });

  const jumpComplete = (number) => props.jumpComplete(number);
  const displayDom = (number) => props.displayDom(number);


  const goTo = (number) => props.goTo(number);
  const linkTo = (number) => props.linkTo(number);

  return (
    <group>
      {props.data.map((project, index) => (
        <Picture
          position={position}
          key={index}
          index={index}
          displayDom={displayDom}
          rotating={props.rotating}
          positioning={props.positioning}
          attractMode={props.attractMode}
          attractTo={props.attractTo}
          jumpComplete={jumpComplete}
          displayNumber={props.displayNumber}
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
