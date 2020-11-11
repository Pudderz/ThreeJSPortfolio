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
    //   && window.location.href=="http://localhost:3000/"
      if(PreviousLocation==='home' ){
        let tl = new TimelineMax();
        tl.fromTo(backgroundRef.current, {
            width:'100%',
          opacity:'0',
          height: "100%",
        },{
            opacity:1,
            width:'100%',
            height:'100%',
            duration: 0,
        });
        // tl.to(backgroundRef.current, {
        //   duration: 0.5,
        //   width: "100%",
        // });
      }else{
        let tl = new TimelineMax();
        tl.to(backgroundRef.current, {
          duration: 1,
          height: "100%",
        }).delay(1.5);
        tl.to(backgroundRef.current, {
          duration: 0.5,
          width: "100%",
        });
      }
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

    let tl = new TimelineMax();
    tl.to(backgroundRef.current, {
      duration: 1,
      height: "100%",
    }).delay(1.5);
    tl.to(backgroundRef.current, {
      duration: 0.5,
      width: "100%",
    });

    setPreviousLocation("home");
  }, []);

  useEffect(() => {
    if (!props.attractMode) {
      TweenMax.to(backgroundRef.current, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColor,
      });
    } else {
      TweenMax.to(backgroundRef.current, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColor,
      });
    }

    //sets the colour for the next page so we can have the correct colour transition.
    if (firstCount.current > 1) {
      setPreviousColour(props.information[props.number].primaryColor);
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
