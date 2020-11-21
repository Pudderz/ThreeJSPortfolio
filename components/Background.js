// import { TimelineMax } from "gsap/all";
// import { TweenMax } from "gsap/gsap-core";
import { TweenMax, TimelineMax } from "gsap/dist/gsap";
import React, { useEffect, useRef, useState, useContext } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function Background(props) {
  const backgroundAnimationRef = useRef();
  const sideBarAnimationRef = useRef();
  let backgroundRef = useRef();
  let sideBarRef = useRef();
  const firstCount = useRef(0);
  const [colours, setColours] = useState({
    primaryColor: "black",
  });
  const { setPreviousLocation, setPreviousColour, PreviousLocation} = useContext(GlobalContext);

  useEffect(() => {
    //LoadIn animation
    const tl = new TimelineMax();
      if(props.loadIn !== true){
        tl.fromTo(backgroundRef.current, {
            width:'100%',
          opacity:'0',
          height: "100%",
        },{
            opacity:1,
            width:'100%',
            height:'100%',
            duration: 1,
        });
      }else{
        tl.to(backgroundRef.current, {
          duration: 1,
          height: "100%",
        }).delay(1.5);
        tl.to(backgroundRef.current, {
          duration: 0.5,
          width: "100%",
        });
      }

      //Background animations 
    backgroundAnimationRef.current = TweenMax.fromTo(
      backgroundRef.current,
      {
        opacity: "0",
      },
      {
        duration: 0.4,
        opacity: "1",
        paused: true,
      }
    );

    setPreviousLocation("home");

    return()=>{

    }



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

    //sets the colour for the next page so we can have the correct colour transition.
    if (firstCount.current > 1) {
      setPreviousColour(props.information[props.number].primaryColour);
    } else {
      firstCount.current++;
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
      style={{
        // backgroundColor: colours.secondaryColor,
        position: "absolute",
        bottom: 0,
        zIndex: "-1",
        height: 0,
      }}
    ></div>
  );
}
