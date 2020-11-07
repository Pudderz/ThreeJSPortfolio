import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TweenMax, TimelineMax, Power3, Power4 } from "gsap";
import { useRef, useEffect } from "react";
import SpaceImage from "../spaceWebsite/Gallery.png";
import { Canvas } from "react-three-fiber";
import ProjectPicture from "../Components/ProjectPicture";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap/gsap-core";
import { GlobalContext } from "../contexts/GlobalContext";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const information = useRef(null);
  const revealRefs = useRef([]);
  const titleRef = useRef(null);
  const lastScrollHeight = useRef(0);
  let screen = useRef(null);
  let body = useRef(null);
  const {
    previousPageColour,
    setPreviousColour,
    PreviousLocation,
    setPreviousLocation,
  } = useContext(GlobalContext);
//loadin animation 
  useEffect(() => {
    // console.log(previousPageColour)
    // console.log(PreviousLocation)
    //  if(PreviousLocation!== null){
       var tl = new TimelineMax({onComplete:()=>{}});
      tl.to(screen, {
        duration: 0.5,
        width: "100%",
        ease: Power3.easeInOut,
      });
      tl.to(screen, {
        duration: 0.5,
        left: "100%",
        ease: Power3.easeInOut,
      });
      tl.set(screen, { left: "-100%" });
      TweenMax.to(body, 1, {
        css: {
          opacity: "1",
          pointerEvents: "auto",
          ease: Power4.easeInOut,
        },
      }).delay(0.4);
    // }
    setPreviousLocation('project')

    //text fade in when in viewport
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 100 },
        {
          scrollTrigger: {
            id: `textFadeIn-${index}`,
            trigger: el,
            start: "top bottom-=200",
            toggleActions: "play none none reverse",
            markers: true,
          },
          autoAlpha: 1,
          duration: 0.5,
          ease: "none",
          y: 0,
        }
      );
    });

    window.addEventListener("scroll", () => {
      const difference = lastScrollHeight.current - window.scrollY;
      if (titleRef.current != null && difference != 0) {
        TweenMax.to(titleRef.current, {
          duration: 0,
          y: "-1%",
        });
        // titleRef.current.style.top += (difference/document.documentElement.scrollHeight);
        lastScrollHeight.current = window.scrollY;
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        const difference = lastScrollHeight.current - window.scrollY;
        if (titleRef.current != null && difference != 0) {
          titleRef.current.style.top +=
            difference / document.documentElement.scrollHeight;
          lastScrollHeight.current = window.scrollY;
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  const scrollDown = ()=>{
    document.querySelector('.information').scrollIntoView()
  }
  // const percent = useSpring({ value: 100, from: { value: 0 } });
  return (
    <div>
      <div className="load-container">
        <div
          className="load-screen1"
          ref={(el) => (screen = el)}
          style={{
            backgroundColor:
              previousPageColour !== null ? previousPageColour : "grey",
            width: PreviousLocation === "home" ? "10px" : "0px",
            left:'0%',
          }}
        ></div>
      </div>
      <div>
        <div className="top">
          <NavLink style={{ color: "white" }} to="/">
            <h2 style={{ color: "white" }}>Matthew Pudney</h2>
          </NavLink>

          <NavLink style={{ color: "white" }} to="/about">
            About
          </NavLink>
        </div>
        <div
          ref={(el) => (body = el)}
          className="Headd Contact noOpacity"
          style={{ position: "relative" }}
        >
          {/* Canvas with single image */}
          <Canvas>
            <ProjectPicture
              index={0}
              displayDom={() => {}}
              rotating={"middle"}
              positioning={"middle"}
              attractMode={false}
              attractTo={0}
              scale={2}
              jumpComplete={() => {}}
              displayNumber={0}
              goTo={() => {}}
              linkTo={() => {}}
            />
          </Canvas>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50, -50%)",
            }}
          ></div>

          <div
            ref={titleRef}
            style={{
              position: "absolute",
              top: "33%",
              left: "10%",
              margin: "20px",
              color: `white`,
            }}
          >
            <div>
              <h1
                style={{
                  color: `white`,
                }}
              >
                Project 1
              </h1>
              {/* <p>Description</p> */}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "3%",
              right: "48%",

              zIndex: 1,
            }}
          >
            <button onClick={scrollDown}className="button">scrollDown</button>
          </div>

          {/* <NavLink to="/" className="button">
            Home
          </NavLink> */}
        </div>
        {/* <AnimatedCirle percent={percent.value} /> */}
      </div>

      <div
        className="information"
        ref={information}
        style={{ background: "white" }}
      >
        <div className="textContainer flex">
          <div ref={addToRefs} className="textFadeIn textFadeIn-0">
            <h3>SpaceWebsite</h3>

            <h4>What is this Project?</h4>
            <p>
              This project is designed to fetch information from NASA's
              astronomical picture of the day and asteroid api and be able to
              collect them in a gallery using IndexedDb to view at a later date.
            </p>
          </div>

          <div ref={addToRefs} className="textFadeIn textFadeIn-1">
            <h4>What's used in this project:</h4>
            <ul>
              <li>
                <p>IndexedDB</p>
              </li>
              <li>
                <p>Fetch API</p>
              </li>
              <li>
                <p>intersection observers</p>
              </li>
            </ul>

            <h4>Date</h4>
            <time>05/11/2020</time>
          </div>
        </div>
        <div
          ref={addToRefs}
          className="textContainer textFadeIn textFadeIn-2"
          style={{ display: "block" }}
        >
          <div>
            <a href="">Live Demo</a>
            <a href="">Learn more at Github repo</a>
          </div>
        </div>
        <div className="textContainer">
          <img
            src={SpaceImage}
            ref={addToRefs}
            className="textFadeIn-3"
            alt="gallery of the space website"
            width="100%"
            style={{ maxWidth: "1200px", margin: "auto" }}
          />
          <p className="imageDescription"> This is the image gallery</p>
        </div>
      </div>
    </div>
  );
}
