import React from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { TweenMax, TimelineMax, Power3, Power4 } from "gsap";
import { useRef, useEffect } from "react";

export default function BlogPage() {
    const history = useHistory();
    let screen = useRef(null);
    let body = useRef(null);
    
    const linkTo= ()=>{
      var tl = new TimelineMax({onComplete:()=>history.push("/")});
 
     tl.to(body, {
       duration: 0.5,
       opacity: "0",
     });
     
   }
    useEffect(() => {
      var tl = new TimelineMax();
      tl.to(screen, {
        duration: 0.4,
        height: "100%",
        
        ease: Power3.easeInOut,
      });
      tl.to(screen, {
        duration: 0.4,
        top: "100%",
        ease: Power3.easeInOut,
      });
      tl.set(screen, { left: "-100%" });
      TweenMax.to(body, .4, {css: {
        opacity: "1",
        pointerEvents: "auto",
        ease: Power4.easeInOut
      }}).delay(0.4)
      return () => {
        TweenMax.to(body, 1, {css: {
          opacity: "0",
          pointerEvents: 'none'
        }});
    }
    });
    return (
        <div>
            <div className="load-container">
        <div className="load-screen1" ref={(el) => (screen = el)}>
        </div>
      </div>
      <div data-barba="container" className="Contact">
        <div ref={(el) => (body = el)} className="Headd">
          <div >Welcome to Page!!!</div>
          <NavLink to="/" onClick={linkTo} className="button">Home</NavLink>
        </div>
      </div>
        </div>
    )
}
