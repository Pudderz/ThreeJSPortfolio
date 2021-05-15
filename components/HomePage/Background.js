import { TweenMax, TimelineMax } from "gsap/dist/gsap";
import React, { useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../src/contexts/GlobalContext";

export default function Background(props) {
  const backgroundAnimationRef = useRef();
  let backgroundRef = useRef();
  const { PreviousLocation } = useContext(GlobalContext);

  useEffect(() => {
    //LoadIn animation
    const tl = new TimelineMax();
    if ( !props.loadIn || PreviousLocation !== null) {
      backgroundRef.current.style.width = "100%";
    } else {
      tl.to(backgroundRef.current, {
        duration: 0.5,
        width: "100%",
      }).delay(2.8);
    }


    // backgroundAnimationRef.current = new TimelineMax({paused: true});
    
    // backgroundAnimationRef.current.to(backgroundRef.current, {
    //   opacity: 0,
    //   duration: 0.2,
    // })
    // backgroundAnimationRef.current.to(backgroundRef.current, {
    //   opacity: 1,
    //   duration: 0.2,
    // })

    // //Background animations
    backgroundAnimationRef.current = TweenMax.fromTo(
      backgroundRef.current,
      {
        opacity: "0",
        paused: true,
      },
      {
        duration: 0.4,
        opacity: "1",
        paused: true,
      }
    );

    return () => {
      backgroundAnimationRef.current.kill();
      tl.clear();
    };
  }, []);

  useEffect(() => {
    if (!props.attractMode) {
      TweenMax.to(backgroundRef.current, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColour,
      });
    } else {
      TweenMax.to(backgroundRef.current, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColour,
      });
    }

  }, [props.number]);

  useEffect(() => {
    if (!props.attractMode) {
      backgroundAnimationRef.current.play();
    } else {
      backgroundAnimationRef.current.reverse();
    }
  }, [props.attractMode]);

  return (
    <div
      ref={backgroundRef}
      id="background"
      className="sideBar background"
    ></div>
  );
}
