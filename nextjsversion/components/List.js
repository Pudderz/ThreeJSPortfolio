import gsap from "gsap/dist/gsap";
import { TimelineMax } from "gsap/dist/gsap";
import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { TimelineMax } from "gsap/gsap-core";
import ListItem from "./ListItem";


export default function List(props) {
  const openRef = useRef(false);
  const goToNumber = useRef(props.number);
  const animationRef = useRef();

  useEffect(()=>{
    animationRef.current = new TimelineMax({
      onComplete: () => {
        //Start scolling once animation is complete
        openRef.current = true;
      },
      paused:true
    });
    animationRef.current.to(".marker", {
      duration: 0.3,
      width: "100px",
    });
    animationRef.current.to(".visHide", {
      duration: 0,
      visibility: "visible",
    });
    animationRef.current.to(".marker", {
      duration: 0.3,
      width: "0%",
    });


    
  },[])

  const pointerOver = () => {
    
    props.attractMode(true);
    props.goTo(props.number);
    gsap.to(document.body, {
      duration: 1,
      background: "#1b1f25",
    });
    animationRef.current.play()
  };
  const pointerLeave = () => {
    props.attractMode(false);
    animationRef.current.reverse()
    openRef.current = false;

  };
  const select = (number) => {
    console.log(openRef);
    goToNumber.current = number;
    if (openRef.current) {
      props.goTo(goToNumber.current);
    }
  };

  return (
    <div>
      <div
        className="nav"
        onPointerEnter={pointerOver}
        onPointerLeave={pointerLeave}
        style={{width:'fit-content'}}
      >
        <ListItem
        display={props.displayNumber}
        name="Project 3"
        number={3}
        select={select}
        color = {props.information[3].primaryColor}
        />
        <ListItem
        display={props.displayNumber}
        name="Project 2"
        number={2}
        select={select}
        color = {props.information[2].primaryColor}
        />
        <ListItem
        display={props.displayNumber}
        name="Project 1"
        number={1}
        select={select}
        color = {props.information[1].primaryColor}
        />
        <ListItem
        display={props.displayNumber}
        name="Project 0"
        number={0}
        select={select}
        color = {props.information[0].primaryColor}
        />

      </div>
    </div>
  );
}
