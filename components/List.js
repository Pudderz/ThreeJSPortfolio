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
    
    props.changeAttractMode(true);
    props.goTo(props.number);
    gsap.to(document.body, {
      duration: 1,
      background: "#1b1f25",
    });
    animationRef.current.play()
  };
  const pointerLeave = () => {
    props.changeAttractMode(false);
    animationRef.current.reverse()
    openRef.current = false;

  };
  const select = (number) => {
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
        style={{width:'fit-content', display: 'flex',
        flexDirection: 'column-reverse',}}
      >
        {props.data.map((information, index)=>(
          <ListItem
          key={index}
          display={props.displayNumber}
          name={information.title}
          number={index}
          select={select}
          color = {information.primaryColour}
          whiteOrBlack={props.whiteOrBlack}
          attractMode={props.attractMode}
          />
        ))}
      </div>
    </div>
  );
}
