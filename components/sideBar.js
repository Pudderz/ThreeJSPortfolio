// import { TweenMax } from 'gsap/gsap-core';
import { TweenMax } from "gsap/dist/gsap";
import React, { useContext, useRef, useState, useEffect } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function SideBar(props) {
  const sideBarAnimationRef = useRef();

  let sideBarRef = useRef();
  const firstCount = useRef(0);
  const [colours, setColours] = useState({
    primaryColor: props.information[props.number].primaryColour,
  });
  const { setPreviousColour } = useContext(GlobalContext);

  useEffect(() => {
    sideBarAnimationRef.current = TweenMax.fromTo(
      sideBarRef.current,
      {
        width: "0px",
      },
      {
        width: "10px",
        duration: 0.4,
        paused: true,
      }
    );
    TweenMax.to(sideBarRef.current, {
      backgroundColor: props.information[props.number].primaryColour,
      duration: 1,
    });
    TweenMax.to(sideBarRef.current, {
      duration: 1,
      height: "100%",
    }).delay(4);

    return () => {
      sideBarAnimationRef.current.kill();
    };
  }, []);

  useEffect(() => {
    TweenMax.to(sideBarRef.current, {
      duration: 0.3,
      width: props.sideBarRef,
    });
  }, [props.sideBarRef]);

  const stopBubbling = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  };

  useEffect(() => {
    TweenMax.to(sideBarRef.current, {
      backgroundColor: props.information[props.number].primaryColour,
      duration: 1,
    });
    //sets the colour for the next page so we can have the correct colour transition.
    if (firstCount.current > 1) {
      setPreviousColour(props.information[props.number].primaryColour);
      setColours({
        primaryColor: props.information[props.number].primaryColour,
      });
    } else {
      firstCount.current++;
    }
  }, [props.number]);

  useEffect(() => {
    if (!props.attractMode) {
      sideBarAnimationRef.current.play(0.4);
    } else {
      sideBarAnimationRef.current.reverse(0.4);
    }
  }, [props.attractMode]);

  return (
    <div
      ref={sideBarRef}
      className="sideBar"
      onTransitionEnd={stopBubbling}
      style={{
        backgroundColor: colours.primaryColor,
        position: "absolute",
        bottom: 0,
        width: "0px",
        left: 0,
      }}
    />
  );
}
