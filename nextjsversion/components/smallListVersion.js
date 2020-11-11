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

  const pointerOver = () => {
    
    props.attractMode(true);
    props.goTo(props.number);
    gsap.to(document.body, {
      duration: 1,
      background: "#1b1f25",
    });
    animationRef.current.play()
  };
  const pointerLeave = () => {
    props.attractMode(false);
    animationRef.current.reverse()
    openRef.current = false;

  };
  const select = (number) => {
    console.log(openRef);
    goToNumber.current = number;
    // if (openRef.current) {
      props.goTo(goToNumber.current);
    // }
  };

  return (
    <div>
      <div
        className="navVertical"
        // onPointerEnter={pointerOver}
        // onPointerLeave={pointerLeave}
        style={{width:'fit-content'}}
      >
        <div  onClick={()=>select(3)} className="flexItems" style={{
            opacity: (3 ===props.displayNumber)? '1': '0.4',
        }}>
          <div className="marker"
          style={{
            background:(2 ===props.displayNumber)?props.information[2].primaryColor: 'white'
          }}></div>
        </div>
        <div  onClick={()=>select(2)} className="flexItems" style={{
            opacity: (2 ===props.displayNumber)? '1': '0.4',
        }}>
          <div className="marker"
          style={{
            background:(1 ===props.displayNumber)?props.information[1].primaryColor: 'white'
          }}></div>
        </div>
        <div  onClick={()=>select(1)} className="flexItems" style={{
            opacity: (1 ===props.displayNumber)? '1': '0.4',
        }}>
          <div className="marker"
          style={{
            background:(0 ===props.displayNumber)?props.information[0].primaryColor: 'white'
          }}></div>
        </div>

        <div  onClick={()=>select(0)} className="flexItems" style={{
            opacity: (0 ===props.displayNumber)? '1': '0.4',
        }}>
          <div className="marker"
          style={{
            background:(0===props.displayNumber)?props.information[0].primaryColor: 'white'
          }}></div>
        </div>

      </div>
    </div>
  )
}
