import { TimelineMax } from "gsap/gsap-core";
import { TweenMax } from "gsap/gsap-core";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Background from "./Background";
import SideBar from "./sideBar";
export default function HtmlText(props) {
  const { setPreviousLocation, setPreviousColour } = useContext(GlobalContext);

  const backgroundAnimationRef = useRef();
  const sideBarAnimationRef = useRef();
  const textAnimationRef = useRef();
  const [sideBarWidth, setSideBarSize ]= useState("10px");
  //ref for making sure certain useEffects do not fire on mount
  const firstCount = useRef(0);
  

  const [state, setState] = useState({
    title: "Project 1",
    descripttion: "description",
  });

  
  let textRef = useRef();
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
      // TweenMax.to(sideBarRef, {
      //   duration: 0.3,
      //   width: "10px",
      // });
      setSideBarSize("10px")
    } else {
      // TweenMax.to(sideBarRef, {
      //   duration: 0.3,
      //   width: "15px",
      // });
      setSideBarSize("15px")
    }
  };

  useEffect(() => {
    textAnimationRef.current = TweenMax.fromTo(
      textRef,
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
  }, []);

  useEffect(() => {
    if (!props.attractMode) {
      let tl = new TimelineMax();
      tl.to(textRef, {
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
      tl.to(textRef, {
        duration: 0.2,
        opacity: "1",
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
      textAnimationRef.current.play(0.1);
    } else {
      textAnimationRef.current.reverse(0.1);
    }
  }, [props.attractMode]);
  const stopBubbling = (event)=>{
    console.log(event)
    event.preventDefault()
    event.stopPropagation()
    event.cancelBubble = true;
  }
  return (
    <>
      <SideBar
      information = {props.information}
      attractMode = {props.attractMode}
      number = {props.number}
      sideBarRef = {sideBarWidth}
      />
      <Background
      information = {props.information}
      attractMode = {props.attractMode}
      number = {props.number}
      />
      <div
      className="details"
        ref={(el) => (textRef = el)}
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
              zIndex:-1
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
          onTransitionEnd={stopBubbling}
          onPointerOver={(e) => {
            e.stopPropagation()
            sideBarSize("big")
          }}
          onPointerLeave={(e) => {
            sideBarSize("small")
            e.stopPropagation()
          }}
        >
          More Details
        </Link>
      </div>
    </>
  );
}
