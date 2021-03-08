import React, { useEffect, useRef, useState, useContext } from "react";
import { GlobalContext } from "../../../src/contexts/GlobalContext";
import Background from "../../Background";
import SideBar from "../../sideBar";
import { TweenMax } from "gsap/dist/gsap";
import { TimelineMax } from "gsap/dist/gsap";
import ButtonComponent from "../../ButtonComponent";

export default function HtmlText(props) {
  const { setPreviousLocation} = useContext(GlobalContext);
  const backgroundAnimationRef = useRef();
  const textAnimationRef = useRef();
  const [sideBarWidth, setSideBarSize] = useState("10px");

  //ref for making sure certain useEffects do not fire on mount
  const firstCount = useRef(0);

  const [state, setState] = useState({
    title: "",
    descripttion: "",
  });

  let textRef = useRef();
  const [colours, setColours] = useState({
    primaryColor: "black",
  });

  const linkToContacts = (e) => {
    e.preventDefault();
    props.linkTo();
  };

  const sideBarLarge = (event, boolean) => {
    props.sideBarLarge(event, boolean)
  };

  useEffect(() => {
    backgroundAnimationRef.current = props.data;
    console.log(backgroundAnimationRef.current);
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
    const setLocation = setTimeout(()=>setPreviousLocation("home"),500)
    return ()=>{
      clearTimeout(setLocation)
    }

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
          title: props.data[props.number].title,
          description: props.data[props.number].snippet,
        });
        setColours({
          primaryColor: props.data[props.number].primaryColour,
          textColor: props.data[props.number].whiteOrBlackText,
          // secondaryColor: information[props.number].secondaryColor,
        });
      });
      tl.to(textRef, {
        duration: 0.2,
        opacity: "1",
      });
    } else {
      setState({
        title: props.data[props.number].title,
        description: props.data[props.number].snippet,
      });
      setColours({
        primaryColor: props.data[props.number].primaryColour,
        textColor: props.data[props.number].whiteOrBlackText,
      });
    }

    //sets the colour for the next page so we can have the correct colour transition.
    if (!(firstCount.current > 1)) {
      // setPreviousColour(props.data[props.number].primaryColour);
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

  const stopBubbling = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  };
  return (
    <>
      {/* <SideBar
        information={props.data}
        attractMode={props.attractMode}
        number={props.number}
        sideBarRef={sideBarWidth}
      />
      <Background
        information={props.data}
        attractMode={props.attractMode}
        number={props.number}
        loadIn ={true}
      /> */}
      <div
        className="details"
        ref={(el) => (textRef = el)}
        style={{
          position: "absolute",
          top: "25%",
          left: "10%",
          margin: "20px",
          color: `${colours.textColor}`,
        }}
      >
        <div>
          <h1
            style={{
              color: `${colours.primaryColor}`,
              zIndex: -1,
            }}
          >
            {state.title}
          </h1>
          <p
            style={{
              fontFamily: "monospace",
              margin: "20px 8px 0",
              fontsize: "16px",
              maxWidth: "55%",
            }}
          >
            {state.description}
          </p>
        </div>
        <ButtonComponent
          link={true}
          primaryColour={props.data[props.number].primaryColour}
          secondaryColour={props.data[props.number].secondaryColour}
          href={`/posts/${props.data[props.number].slug}`}
          onClick={linkToContacts}
        >
          <a
            onTransitionEnd={stopBubbling}
            onPointerOver={(e) => sideBarLarge(e, true)}
            onPointerLeave={(e) => sideBarLarge(e, false)}
          >
            More Details
          </a>
        </ButtonComponent>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "20px",
          display: props.attractMode ? "none" : "block",
        }}
      >
        <ButtonComponent
          link={false}
          primaryColour={props.data[props.number].primaryColour}
          secondaryColour={props.data[props.number].secondaryColour}
          onClick={linkToContacts}
        >
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log(props.data[props.number]);
            }}
            href={props.data[props.number].sourceCode}
          >
            Source Code
          </a>
        </ButtonComponent>

        <ButtonComponent
          link={false}
          primaryColour={props.data[props.number].primaryColour}
          secondaryColour={props.data[props.number].secondaryColour}
          onClick={linkToContacts}
        >
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={props.data[props.number].liveDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo
          </a>
        </ButtonComponent>
      </div>
    </>
  );
}
