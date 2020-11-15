//  import { TimelineMax } from 'gsap/all';
import { TimelineMax } from 'gsap/dist/gsap';
import {gsap} from 'gsap/dist/gsap';
import React, {useEffect, useRef, useState} from 'react'

export default function SmallListVersion(props) {
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

  const select = (number) => {
    goToNumber.current = number;
      props.goTo(goToNumber.current);
  };

  return (
      <div
        className="navVertical"
      >
        {props.data.map((info, index)=>(
          <div key={index} onClick={()=>select(index)} className="flexItems" style={{
            opacity: (index ===props.displayNumber)? '1': '0.4',
            justifyContent:'center',
        }}>
          <div className="marker"
          style={{
            background:(index === props.displayNumber)?info.primaryColour: (props.data[props.number].whiteOrBlackText==='White')?'white':'black',
          }}></div>
        </div>
        ))}
        
        </div>

  )
}
