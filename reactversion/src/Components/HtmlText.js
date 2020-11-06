import { TimelineMax } from "gsap/gsap-core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {GlobalContext} from "../contexts/GlobalContext";
export default function HtmlText(props) {
  const {
    active,
    setActive,
    currentLocation,
    PreviousLocation,
    setPreviousLocation,
    previousPageColour,
    setPreviousColour,
  } = useContext(GlobalContext);

  const firstCount = useRef(0)
  console.log(props.number);
  const [state, setState] = useState({
    title: "Project 1",
    descripttion: "description",
  });
  let ref = useRef();
  let sideBarRef = useRef();
  let backgroundRef = useRef();
  const [colours, setColours] = useState({
    primaryColor: "black",
  });

  const linkToContacts = (e) => {
    e.preventDefault();
    props.linkTo();
  };

  const sideBarSize = (size) => {
    if (size === "small") {
      TweenMax.to(sideBarRef, {
        duration: 0.3,
        width: "10px",
      });
    } else {
      TweenMax.to(sideBarRef, {
        duration: 0.3,
        width: "15px",
      });
    }
  };

  useEffect(() => {
    
    let tl = new TimelineMax();
    tl.to(backgroundRef, {
      duration: 1,
      height: "100%",
    }).delay(1.5);
    tl.to(backgroundRef, {
      duration: 0.5,
      width: "100%",
    });
    tl.to(sideBarRef, {
      duration: 1,
      height: "100%",
    }).delay(1);
    console.log(PreviousLocation)
    setPreviousLocation("home");
    console.log(PreviousLocation)
    return () => {
      TweenMax.to(backgroundRef, {
        duration: 1,
        height: "0%",
      });
    };
  }, []);

  useEffect(() => {
    
    if (!props.attractMode) {
      let tl = new TimelineMax();
      tl.to(ref, {
        duration: 0.2,
        opacity: "0",
      });
      tl.add(() => {
        setState({
          title: props.information[props.number].title,
          description: props.information[props.number].descripttion,
        });
        setColours({
          primaryColor: props.information[props.number].primaryColor,
          textColor: props.information[props.number].textColor,
          // secondaryColor: information[props.number].secondaryColor,
        });
      });
      tl.to(ref, {
        duration: 0.4,
        opacity: "1",
      });
      TweenMax.to(backgroundRef, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColor,
      });
    } else {
      setState({
        title: props.information[props.number].title,
        description: props.information[props.number].descripttion,
      });
      setColours({
        primaryColor: props.information[props.number].primaryColor,
        textColor: props.information[props.number].textColor,
      });
      TweenMax.to(backgroundRef, {
        duration: 1,
        backgroundColor: props.information[props.number].secondaryColor,
      });
    }
    console.log(previousPageColour)

    //sets the colour for the next page so we can have the correct colour transition.
    if(firstCount.current> 1){
      setPreviousColour(props.information[props.number].primaryColor)
    }else{
      firstCount.current++;
    }
    
  }, [props.number]);

  useEffect(() => {
    if (!props.attractMode) {
      // TweenMax.to(document.body, {
      //   duration: 1,
      //   backgroundColor: information[props.number].secondaryColor,
      // });
      TweenMax.to(ref, {
        duration: 0.4,
        opacity: "1",
      });
      TweenMax.to(sideBarRef, {
        duration: 0.4,
        width: "10px",
      });
      TweenMax.to(backgroundRef, {
        duration: 0.4,
        opacity: "1",
      });
    } else {
      TweenMax.to(ref, {
        duration: 0.1,
        opacity: "0",
      });
      TweenMax.to(sideBarRef, {
        duration: 0.4,
        width: "0%",
      });
      TweenMax.to(backgroundRef, {
        duration: 0.4,
        opacity: "0",
      });
    }
  }, [props.attractMode]);

  return (
    <>
      <div
        ref={(el) => (sideBarRef = el)}
        className="sideBar"
        style={{
          backgroundColor: colours.primaryColor,
          position: "absolute",
          bottom: 0,
          width: "0px",
        }}
      ></div>
      <div
        ref={(el) => (backgroundRef = el)}
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
      <div
        ref={(el) => (ref = el)}
        style={{
          position: "absolute",
          top: "33%",
          left: "10%",
          margin: "20px",
          color: `${colours.textColor}`,
        }}
      >
        <div>
          <h1
            style={{
              color: `${colours.primaryColor}`,
            }}
          >
            {state.title}
          </h1>
          <p>{state.description}</p>
        </div>
        <Link
          to="/contact"
          onClick={linkToContacts}
          className="button"
          onPointerOver={() => sideBarSize("big")}
          onPointerLeave={() => sideBarSize("small")}
        >
          More Details
        </Link>
      </div>
    </>
  );
}
