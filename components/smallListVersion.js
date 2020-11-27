//  import { TimelineMax } from 'gsap/all';
import { Tooltip } from "@material-ui/core";
import { TimelineMax } from "gsap/dist/gsap";
import { gsap } from "gsap/dist/gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

export default function SmallListVersion(props) {
  const goToNumber = useRef(props.number);
  const {setPreviousLocation} = useContext(GlobalContext)
  const select = (number) => {
    goToNumber.current = number;
    props.goTo(goToNumber.current);
  };
  useEffect(()=>{
    const setLocation = setTimeout(()=>setPreviousLocation("home"),500)
    return ()=>{
      clearTimeout(setLocation)
    }
  })
  return (
    <div className="navVertical">
      {props.data.map((info, index) => (
        <div
          key={index}
          onClick={() => select(index)}
          className="flexItems"
          style={{
            opacity: index === props.displayNumber ? "1" : "0.4",
            justifyContent: "center",
          }}
        >
          <Tooltip title={info.title}>
            <div
              className="marker"
              style={{
                background:
                  index === props.displayNumber
                    ? info.primaryColour
                    : props.data[props.number].whiteOrBlackText === "White"
                    ? "white"
                    : "black",
              }}
            ></div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
