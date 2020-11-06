import React from "react";
// import {Link} from 'next/link'
import { useRouter } from "next/router";
import { TweenMax, TimelineMax, Power3, Power4 } from "gsap";
import { useRef, useEffect } from "react";
// import { useSpring, animated } from "react-spring";
import AnimatedCirle from "../components/AnimatedCircle";
// import Title from "../components/Title";
import { Canvas } from "react-three-fiber";

import HtmlText from "../components/HtmlText";

export default function ProjectPage() {
  const router = useRouter();
  let screen = useRef(null);
  let body = useRef(null);
  let title = useRef(null);
  let information = useRef(null);
  const values = useRef(1)
  const linkTo = () => {
    var tl = new TimelineMax({ onComplete: () => router.push("/") });

    tl.to(body, {
      duration: 0.5,
      opacity: "0",
    });
  };
  useEffect(() => {
    var tl = new TimelineMax();
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


    window.addEventListener("wheel",(e)=> {
      console.log(e.deltaY)
      values.current = values.current - e.deltaY*0.002;
      console.log(values.current)
      // if(values.current>100){values.current = 100}
      TweenMax.to(body, 0.2, {
        css: {
          opacity: `${values.current}`,
          ease: Power4.easeInOut,
        },
      });
      // let height = 50-values.current*10;
      // // if(height > 100){
      // //   height = 100;
      // // }else 
      // if(height<20){
      //   height=20;
      // }
      // TweenMax.to(title, 0.2, {
      //   css: {
      //     top: `${height}%`,
      //     ease: Power4.easeInOut,
      //   },
      // });
    });
    return () => {
      
    };
  });

  // const percent = useSpring({ value: 100, from: { value: 0 } });
  return (
    <div>
      <div className="load-container">
        <div className="load-screen1" ref={(el) => (screen = el)}></div>
      </div>
      <div  >
       
{/* <Title/> */}
        <div ref={(el) => (body = el)} className="Headd Contact noOpacity" >
        {/* <Test
            style={{ height: "100vh", width: "100vw", position: "absolute" }}
            camera={{ fov: 45, position: [0, 0, 4] }}
          > */}

          <HtmlText
            number={1}
            attractMode={false}
            linkTo={()=>{console.log('test')}}
          />
          {/* </Test> */}
           <div style={{
            position:'absolute',
            top:'50%',
        
            left:'50%',

            transform: 'translate(-50, -50%)',
          }}>
          <img src='/images/elite.png' alt="picture" height="300px"></img>
        </div>
          {/* <div ref={(el) => (title = el)}
          style={{
            position:'absolute',
            top:'50%',
            right:'50%',
            transform: 'translate(-50, -50%)',
            zIndex: 1,
          }}>
            <h1>Project 1</h1>
          </div> */}
          <div style={{
            position:'absolute',
            bottom:'3%',
            right:'48%',

            zIndex: 1,
          }}>
            <button className="button">
              scrollDown
            </button>
          </div>

          {/* <Link to="/" onClick={linkTo} className="button">
            Home
          </Link> */}
        </div>
        {/* <AnimatedCirle percent={percent.value} /> */}
      </div>

      <div 
      className="information"
      ref={(el) => (information = el)}
      style={{ background: "white"}}>
        <div
        className="textContainer flex"
        >
          <div>
            <h3>SpaceWebsite</h3> 

       <h4>What is this Project?</h4>
       <p>This project is designed to fetch information from NASA's astronomical picture of the day and asteroid api and be able to collect them in a gallery using IndexedDb to view at a later date.</p>
          </div>


<div>
  <h4>What's used in this project:</h4> 
<ul>
  <li>
    <p>IndexedDB</p>
  </li>
  <li>
    <p>Fetch</p>
  </li>
  <li>
    <p>API</p>
  </li>
  <li>
    <p>intersection observers</p>
  </li>
</ul>

  <h4>Date</h4>
  <time>05/11/2020</time>
</div>

   

        </div>
      <div className="textContainer" style={{display:'block'}}>
        <div>
          <a href="">Live Demo</a>
<a href="">Learn more at Github repo</a></div> 
        </div>
          <div className="textContainer">
    <img src='images/Gallery.png' alt="gallery of the space website" width="100%" style={{maxWidth:'1200px', margin:'auto'}} />
          <p className="imageDescription"> This is the image gallery</p>
          </div>
      
        </div>

        
    </div>
  );
}
