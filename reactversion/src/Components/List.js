import React, { useRef } from "react";
import gsap from "gsap";
import { TimelineMax } from "gsap/gsap-core";
import ListItem from "./ListItem";

export default function List(props) {
  const openRef = useRef(false);
  const goToNumber = useRef(props.number);

  const pointerOver = () => {
    props.attractMode(true);
    props.goTo(props.number);
    gsap.to(document.body, {
      duration: 1,
      background: "#1b1f25",
    });

    let tl = new TimelineMax({
      onComplete: () => {
        openRef.current = true;
        //Start scolling once animation is complete
        console.log(goToNumber.current);
        props.goTo(goToNumber.current);
      },
    });
    tl.to(".nav", {
      duration: 0,
      width: "fit-content",
    });
    tl.to(".marker", {
      duration: 0.3,
      width: "100px",
    });
    tl.to(".visHide", {
      duration: 0,
      visibility: "visible",
    });
    tl.to(".marker", {
      duration: 0.3,
      width: "0%",
    });
  };
  const pointerLeave = () => {
    props.attractMode(false);
    console.log(openRef);
    if (openRef.current) {
      let tl = new TimelineMax();

      tl.to(".marker", {
        duration: 0.3,
        width: "100px",
      });
      tl.to(".visHide", {
        duration: 0,
        visibility: "hidden",
      });
      tl.to(".marker", {
        duration: 0.3,
        width: "0%",
      });
      // tl.to(".nav",{
      //   duration: 1,
      //   width: '35px',
      // })
      openRef.current = false;
    }
  };
  const select = (number) => {
    console.log(openRef);
    goToNumber.current = number;
    // console.log(e.target.getAttribute("data-nav"))
    // props.goTo(Number(e.target.getAttribute("data-nav")));
    if (openRef.current) {
      console.log("goingto");
      props.goTo(goToNumber.current);
    }
  };

  return (
    <div>
      <div
        className="nav"
        onPointerEnter={pointerOver}
        onPointerLeave={pointerLeave}
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
