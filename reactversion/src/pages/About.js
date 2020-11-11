import { TweenMax } from "gsap/gsap-core";
import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { TimelineMax } from "gsap/gsap-core";
export default function About() {
  const { PreviousLocation, previousPageColour,setPreviousColour,setPreviousLocation } = useContext(GlobalContext);
  let aboutRef = useRef(null);
  let loaderRef = useRef(null);
  
  useEffect(() => {
    console.log(previousPageColour)
    if(PreviousLocation !=='about' && PreviousLocation !==null){
       let tl = new TimelineMax({onComplete:()=>{setPreviousLocation('about');setPreviousColour('#191C1D')}})
    tl.fromTo(
      loaderRef.current,
      {
        left:'100%',
        width: "0%",
      },
      {
        left:'0%',
        width: "100%",
        duration: 1,
      }
    );
    tl.fromTo(loaderRef.current,
      {
        left: "0%",
        
      },
      {
        left: "0%",
        width:'0%',
        duration: 1,
      }
    )
    TweenMax.from(aboutRef.current,
      {
        autoAlpha:0,
        duration:1,
      }).delay(1)
      
    }else{
      let tl = new TimelineMax({
        onComplete: () => {
          setPreviousLocation("about");
          setPreviousColour("#191C1D");
        },
      });
      tl.fromTo(
        loaderRef.current,
        {
          left: "0%",
          width: "100%",
          height: "100%",
          bottom: "0",
          top: "0%",
        },
        {
          width: "100%",
           height:'0%',
          duration: 2,
          top: "100%",
        }
      );
      TweenMax.from(aboutRef.current, {
        autoAlpha: 0,
        duration: 2,
      });
      
    }
    
    
  }, []);
  return (
    <>
       <div className="top" style={{zIndex:'100'}}>
          <NavLink style={{ color: "white" }} to="/">
            <h1 style={{ color: "white" }}>Matthew Pudney</h1>
          </NavLink>

          <NavLink style={{ color: "white" }} to="/">
            Home
          </NavLink>
        </div>
        <div className="load-container">

        <div
          className="load-screen1"
          ref={loaderRef}
          style={{
            backgroundColor:(previousPageColour !== null )? previousPageColour : "#191C1D",
            // width: PreviousLocation === "home" ? "10px" : "0px",
            left: "0%",
            height:'100%',
            zIndex:'90',
          }}
        ></div>
      </div> 
      <div className="about" ref={aboutRef}>
       
       
        <div >
          <div className="textContainer">
          <h2>Hey, I'm Matthew</h2>
          <p>
            I'm a front-end web developer based in UK and looking for a
            full-time role
          </p>
        </div>
        <div className="textContainer">
          <h2>...</h2>
          <p>
            I'm a front-end web developer based in UK and looking for a
            full-time role
          </p>

          <p>
            I love learning the massive scope of computer science which I find
            incredibly rewarding and exciting as there's always something more
            you can learn and improve on.
          </p>

          <p>
            I'm currently looking for an opportunity to work on a JavaScript
            framework and hope to learn and move to a full-stack position in the
            future.
          </p>

          <p>
            Thank you for checking out my portfolio and if you'd like to learn
            more about what makes me tick or if you have knowledge of any
            exciting opportunities feel free to let me know by visiting the
            contact section
          </p>
          <NavLink to="/" className="button">
          Home
        </NavLink>
        </div>

        
        </div>
        
      </div>
    </>
  );
}
