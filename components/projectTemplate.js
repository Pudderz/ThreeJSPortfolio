import React, { useContext, useState} from "react";
// import { NavLink } from "react-router-dom";
import Image from 'next/image'
import { TweenMax, Power3, Power4, Power2 } from "gsap";
import { useRef, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import ProjectPicture from "./ProjectPicture";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import gsap from "gsap/gsap-core";
import { GlobalContext } from "../src/contexts/GlobalContext";
import Link from "next/link";
import gsap from "gsap/dist/gsap";
import hydrate from "next-mdx-remote/hydrate";
import { Button, Fab } from "@material-ui/core";
import {useMediaQuery} from '@material-ui/core';
  import json2mq from 'json2mq';


export default function ProjectTemplate(props) {

  gsap.registerPlugin(ScrollTrigger);
  const multipleSizes = require(`../public/images/${props.slug}.png?resize&sizes[]=340&sizes[]=600&sizes[]=1000`);
  const information = useRef(null);
  const smallImage= useRef(null)
  const revealRefs = useRef([]);
  const titleRef = useRef(null);
  const lastScrollHeight = useRef(0);
  let screen = useRef(null);
  let body = useRef(null);
  
  const matches = useMediaQuery(
    json2mq({
      minWidth: 1100,
    }),
  );

  


  const {
    previousPageColour,
    setPreviousColour,
    PreviousLocation,
    setPreviousLocation,
    setColours,
    animation,
  } = useContext(GlobalContext);


  
  //loadin animation
  let { url, title: imageTitle, height: imageHeight, width: imageWidth  } = props.image;
  const aboutProject = hydrate(props.aboutProject);
  const content = hydrate(props.content);
  
  useEffect(() => {
    console.log(props.primaryColour);
    console.log(props.secondaryColour);
    setColours(props.primaryColour, props.secondaryColour)
    animation.current.project.to(screen, {
      duration: 1,
      width: "100%",
      ease: Power3.easeInOut,
    });

    animation.current.project.to(screen, {
      duration: 1,
      left: "100%",
      ease: Power3.easeInOut,
    });

    // animation.current.project.set(screen, { left: "-100%" });

    animation.current.project
      .to(body, 0, {
        css: {
          opacity: "1",
          pointerEvents: "auto",
          ease: Power4.easeInOut,
        },
      },'-=1')

    setPreviousLocation("project");

    //text fade in when in viewport
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: 100 },
        {
          scrollTrigger: {
            id: `textFadeIn-${index}`,
            trigger: el,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
            markers: true,
          },
          autoAlpha: 1,
          duration: 0.5,
          ease: "none",
          x: 0,
        }
      );
    });
    
    window.addEventListener("scroll", () => {
      const difference = window.scrollY - lastScrollHeight.current;
      if (titleRef.current != null && difference != 0) {
        TweenMax.to(titleRef.current, {
          duration: 0,
            y: `+=${difference/1.5}px`,
        });
      }
      if (smallImage.current != null && difference != 0) {
        TweenMax.to(smallImage.current, {
          duration: 0,
            y: `+=${difference/1.5}px`,
        });
      }
      lastScrollHeight.current = window.scrollY;
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
      window.removeEventListener("scroll", () => {
        const difference = window.scrollY - lastScrollHeight.current;
        if (titleRef.current != null && difference != 0) {
          TweenMax.to(titleRef.current, {
            duration: 1,
            ease:Power2.easeInOut,
            y: `+=${difference/2}px`,
          });
          lastScrollHeight.current = window.scrollY;
        }
      });
      animation.current.project.clear();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  const scrollDown = () => {
    // TweenMax.to(information.current,{
    //   top:'0%',
    //   duration:3,
    // })
    document.querySelector(".information").scrollIntoView();
  };

  return (
    <>
      <div className="load-container">
        <div
          className="load-screen1"
          ref={(el) => (screen = el)}
          style={{
            backgroundColor: props.primaryColour,
            width: PreviousLocation === "home" ? "10px" : "0px",
            left: "0%",
            zIndex: '10',
            position: 'absolute',
          }}
        ></div>
      </div>
      <div>
        <div
          ref={(el) => (body = el)}
          className="Headd Contact noOpacity"
          style={{
            position: "absolute",
            backgroundColor: props.secondaryColour,
          }}
        >
          {/* Canvas with single image */}
          {matches? (
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
                src={url}
              />
            </Canvas>
          ): (
            <div ref={smallImage} className="smallProjectImage" style={{width:'80%', margin:'50px auto 0'}}>
              <img 
                //  width={info.mainImage.width}
                //  height={info.mainImage.height}
                width={multipleSizes.width}
                height={multipleSizes.height}
                loading="lazy"
                //  height="100%"
                style={{maxHeight:'100%', height:'100%', maxWidth:'100%', width:'100%'}}
                srcSet={multipleSizes.srcSet}
                src={multipleSizes.src} 
                // sizes = "(min-width: 600px) 1000px,(min-width: 350px) 350px,(min-width: 180px)  300px"
                />
              {/* <Image src={url} width={imageWidth} height={imageHeight} alt={imageTitle} /> */}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50, -50%)",
            }}
          ></div>

          <div className="projectClass" ref={titleRef}>
            <div>
              <h1
                style={{
                  color: props.primaryColour,
                }}
              >
                {props.title}
              </h1>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "3%",
              margin: "auto",
              width: "100%",
              zIndex: 1,
            }}
          >
            <Button onClick={scrollDown} style={{ color: props.primaryColour }}>
              scrollDown
            </Button>
          </div>
        </div>
      </div>

      <div
        className="information"
        ref={information}
        style={{ background: "white" }}
      >
        <div className="textContainer flex">
          <div ref={addToRefs} className="textFadeIn textFadeIn-0"
          style={{padding:'20px'}}
          >
            <h3 className="large">{props.title}</h3>

            <h4>About The Project</h4>
          <div style={{padding:'0'}}>{aboutProject}</div>
          </div>

          <div ref={addToRefs} className="textFadeIn textFadeIn-1 flexSmall smallFlex"
          style={{padding:'20px'}}
          >
            <div style={{ paddingLeft: '0'}}>
              <h4>What's used in this project:</h4>
              <ul>
                {props.techUsed.map((tech, index) => (
                  <li key={index}>
                    <p>{tech}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Date</h4>
              <time>{props.date.match(/^[\d-]{10}/i)[0]}</time>
            </div>
          </div>
        </div>
        <div
          // ref={addToRefs}
          className="textContainer "
          style={{ display: "block", marginTop: "0" }}
        >
          <div>
            <a className="block" href={props.liveDemo}>
              Live Demo
            </a>
            <a className="block" href={props.sourceLink}>
              Learn more at Github repo
            </a>
          </div>
        </div>

        <div className="textContainer">
          <div className="markdownContent">{content}</div>
        </div>

        <div>
          {/* Next Project GoTo part */}
          {/* {width ==='large' &&(
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
              // src= {props.image}
            />
          </Canvas>
    )}      */}
          {/* {width === 'small' &&(
      <div className="smallProjectImage">
        <img src={elite} width="50%"alt="" />
      </div>
    )} */}
        </div>
      </div>
    </>
  );
}
