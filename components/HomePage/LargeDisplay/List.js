import { TimelineMax } from "gsap/dist/gsap";
import React, { useEffect, useRef, useContext } from "react";
import HomeContext from "../../../src/contexts/HomeContext";
import ListItem from "./ListItem";
import { canvasListAnimation } from "../../../animations/ProjectAnimations";

export function List(props) {
  const openRef = useRef(false);
  const animationRef = useRef();
  const nav = useRef(null);
  const markerRefs = useRef([]);
  const descriptionRefs = useRef([]);

  const {
    fastTravelMode,
    setTargetProjectNumber,
    setFastTravelMode,
    setJumpMode,
    projectInViewNumber,
  } = useContext(HomeContext);

  useEffect(() => {
    animationRef.current = new TimelineMax({
      onComplete: () => {
        //Start scolling once animation is complete
        openRef.current = true;
      },
      paused: true,
    });

    canvasListAnimation(
      animationRef.current,
      descriptionRefs.current,
      nav.current,
      markerRefs.current
    );
    return ()=>{
      animationRef.current.clear();
      animationRef.current = null;
    }
  }, []);

  const pointerOver = () => {
    if (!fastTravelMode) {
      setTargetProjectNumber(projectInViewNumber);
      setFastTravelMode(true);
    }

    setJumpMode(true);
    animationRef.current.play();
  };

  const pointerLeave = () => {
    // props.changeAttractMode(false);
    setFastTravelMode(false);
    // setJumpMode(false); //maybe remove

    animationRef.current.reverse();
    openRef.current = false;
  };

  const select = (number) => {
    if (openRef.current) {
      setJumpMode(true);
      setTargetProjectNumber(number);
    }
  };

  const addToMarkerRefs = (el) => {
    if (el && !descriptionRefs.current.includes(el)) {
      markerRefs.current.push(el);
    }
  };
  const addToDescriptRefs = (el) => {
    if (el && !descriptionRefs.current.includes(el)) {
      descriptionRefs.current.push(el);
    }
  };
  return (
    <div>
      <div
        className="nav"
        ref={nav}
        onPointerEnter={pointerOver}
        onPointerLeave={pointerLeave}
        style={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "hidden",
          minWidth: "50px",
        }}
      >
        {props.data.map((information, index) => (
          <ListItem
            key={index}
            number={index}
            name={information.title}
            select={select}
            color={information.primaryColour}
            whiteOrBlack={props.data[projectInViewNumber].whiteOrBlack}
            attractMode={fastTravelMode}
            addToMarkerRefs={addToMarkerRefs}
            addToDescriptRefs={addToDescriptRefs}
          />
        ))}
      </div>
    </div>
  );
}


export default List;
