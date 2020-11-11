import { Draggable } from "gsap/dist/Draggable";
import { TweenMax } from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "../src/contexts/HomeContext";
import HtmlText from "./HtmlText";
// import { gsap } from "gsap";
// import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import elite from "../images/elite.png";
import space from "../images/Gallery.png";
import asteroid from "../images/asteroidPage.png";
// import { useHistory } from "react-router";
import { useRouter } from 'next/router'
import Title from "./Title";
import SmallListVersion from "./smallListVersion";
import Background from "./Background";
import gsap from "gsap/dist/gsap";

const information = {
  1: {
    title: "Project 1",
    descripttion: "Description 3",
    primaryColor: "white",
    secondaryColor: "#1b1f25",
    textColor: "white",
  },
  0: {
    title: "Project 2",
    descripttion: "Description 2",
    primaryColor: "#978d58",
    secondaryColor: "#0b5269",
    textColor: "white",
  },
  2: {
    title: "Project 3",
    descripttion: "Description 3",
    primaryColor: "#FCBC3E",
    secondaryColor: "#778899",
    textColor: "white",
  },
  3: {
    title: "Project 4",
    descripttion: "Description 4",
    primaryColor: "white",
    secondaryColor: "#1e7753",
    textColor: "white",
  },
  4: {
    title: "Project 3",
    descripttion: "Description 3",
    primaryColor: "white",
    secondaryColor: "#1e7753",
    textColor: "white",
  },
};

 
// console.log(Draggable.version);
export default function SmallFrontPage() {
  // gsap.registerPlugin(Draggable);
  const { information } = useContext(HomeContext);
  const history = useRouter();
  
  var numBoxes = 10;
  var boxWidth = 350;
  var boxHeight = 250;
  var imgWidth = boxWidth - 6;
  var imgHeight = boxHeight - 14;

  var viewWidth = 500;
  var wrapWidth = numBoxes * boxWidth;
  const V_THRESHOLD = 0.1;
  const wrapperRef = useRef();
  const boxesRef = useRef();
  const viewportRef = useRef();
  const boxRefs = useRef([]);
  const animation = useRef();
  const snapArray = useRef([]);
  const wrapVal = gsap.utils.wrap(0, wrapWidth);
  const isDragging = useRef(false);
  const lastPosition = useRef(0);

  const [array, setArray] = useState([]);

  const allImages = useRef([]);
  useEffect(() => {
    for (var i = 1; i <= numBoxes; i++) {
      var src =
        "https://unsplash.it/" + imgWidth + "/" + imgHeight + "?random=" + i;
      allImages.current.push(src);
      //  if(i<=3){
      console.log(src);
      array.push(src);
      setArray(array);
      console.log(array);
      //  }
    }

    return () => {};
  }, []);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      // getting the swipe direction
      if (Math.abs(vx) > Math.abs(vy)) {
        // swipe left is when horizontal velocity is inferior to minus threshold
        if (vx < -V_THRESHOLD && xPos > -1) next();
        // swipe right is when horizontal velocity is superior to threshold
        else if (vx > V_THRESHOLD && xPos < 1) prev();
      } else {
        // swipe up is when vertical velocity is inferior to minus threshold
        // if (vy < -V_THRESHOLD && yPos > -1) setYPos(yp => yp - 1)
        // // swipe down is when vertical velocity is superior to threshold
        // else if (vy > V_THRESHOLD && yPos < 1) setYPos(yp => yp + 1)
      }
    }
  });

  const addToRefs = (el) => {
    if (el && !boxRefs.current.includes(el)) {
      const index = boxRefs.current.push(el);
    }
  };

  const x = useRef(0);
  const carousel = useRef();
  const slider = useRef();
  const direction = useRef(-1);
  const [displayNumber, setDisplayNumber] = useState(0);
  useEffect(() => {
    let options = {
      root: carousel.current,
      rootMargin: "0px",
      threshold: 0.51,
    };
    const number = slider.current.firstElementChild.getAttribute("data-key");
    setDisplayNumber(number);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {

          x.current = boxRefs.current[0].offsetLeft - entry.target.offsetLeft;
          setDisplayNumber(Number(entry.target.getAttribute("data-key")));
        } 
      });
    }, options);
    console.log(typeof slider.current.children);
    for (const [key, value] of Object.entries(slider.current.children)) {
      observer.observe(value);
    }

    // Draggable.create(boxRefs.current, {
    //   type: "x",
    //   trigger: slider.current,
    //    inertia: true,
    //   liveSnap: {
    //     x: function (endValue) {
    //       return 0;
    //     },
    //     y: 0,
    //   },
    // });
  }, []);

 
  const next = (number=1) => {
    if (direction.current > 0) {
      slider.current.prepend(slider.current.lastElementChild);
    }
    direction.current = -1*number;
    carousel.current.style.justifyContent = "flex-start";
    slider.current.style.transform = `translate(${-20*number}%)`;
  };
  const prev = (number=1) => {
    if (direction.current < 0) {
      
      slider.current.appendChild(slider.current.firstElementChild);
    }
    direction.current = number;
    carousel.current.style.justifyContent = "flex-end";
    slider.current.style.transform = `translate(${20*number}%)`;
  };
  const transitionEnd = (e) => {
    if (direction.current > 0) {
      for(let i = direction.current; i>0; i--){
        slider.current.prepend(slider.current.lastElementChild);
        console.log('prepending')
      }
      
    } else {
      for(let i = direction.current; i<0; i++){
        slider.current.appendChild(slider.current.firstElementChild);
        console.log('appending')
      }
    }

    slider.current.style.transition = "none";
    slider.current.style.transform = "translate(0)";
    // console.log(slider.current.firstElementChild.getAttribute('data-key'))
    setTimeout(() => {
      slider.current.style.transition = "all 0.5s";
    });
    //  const number = slider.current.firstElementChild.getAttribute('data-key')
    //   setDisplayNumber(number)
  };
  const body = useRef();
  const linkTo = () => {
    TweenMax.to(body.current, {
      duration: 0.5,
      opacity: "0",
      onComplete: () => history.push("/Contact"),
    });
  };

const [attractMode, setAttractMode] = useState(false);
  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });

  const goTo = (number) => {
    console.log(number)
    setAttractTo({
      goTo: number,
      shouldJump: true,
    });
  };

  useEffect(()=>{
    if(attractTo.shouldJump){
      const numberOfChange=attractTo.goTo-displayNumber%4;
      console.log(numberOfChange)
      if(numberOfChange<0){
        // for(let i=numberOfChange*-1; i>0;i++){
      prev(numberOfChange*-1)
        // }
        
      }else if(numberOfChange>0){
        // for(let i=numberOfChange; i>0;i++){
          next(numberOfChange)
        // }
        
      }
      setAttractTo({...attractTo, shouldJump:false})
    }
    
  },[attractTo])
  

  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
      // setPosition("middle");
      // setPositioning("middle");
    } else {
      setAttractTo({
        ...attractTo,
        shouldJump: false,
      });
      // setPosition("right");
      // setPositioning("right");
    }
  };
  const stopBubbling = (event)=>{
    event.preventDefault()
    event.stopPropagation()
    event.cancelBubble = true;
  }
  return (
    <>
    <Background
    information = {information}
    attractMode = {false}
    number = {displayNumber}
    />
    <div {...bind()} ref={body}>
      <Title/>
      <SmallListVersion
      attractMode={changeAttractMode}
      goTo={goTo}
      number={displayNumber}
      displayNumber={displayNumber}
      information={information}
      className="vertical"
      />
      <div className="carousel" ref={carousel}>
        <div className="slider" ref={slider} 
         onTransitionEnd={transitionEnd}
        >
          <section data-key={0} ref={addToRefs}>
            <img src={elite} width="80%" />
            <HtmlText
              information={information}
              number={0}
              attractMode={false}
              linkTo={linkTo}

            />
            
            
          </section>
          <section data-key={1} ref={addToRefs}>
            <img src={space} width="80%" />
            <HtmlText
              information={information}
              number={1}
              attractMode={false}
              linkTo={linkTo}

            />
          </section>
          <section data-key={2} ref={addToRefs}>
            <img src={asteroid} width="80%" />
            <HtmlText
              information={information}
              number={2}
              attractMode={false}
              linkTo={linkTo}

            />
          </section>
          <section data-key={3} ref={addToRefs}>
            Content section 4
            <HtmlText
              information={information}
              number={3}
              attractMode={false}
              linkTo={linkTo}

            />
          </section>
          <section data-key={3} ref={addToRefs}>
            Content section 5
            <HtmlText
              information={information}
              number={2}
              attractMode={false}
              linkTo={linkTo}
              
            />
          </section>
        </div>
      </div>
      <div className="controls">
        <button className="next" onClick={e=>next(1)}>
          next
        </button>
        <button className="prev" onClick={e=>prev(1)}>
          prev
        </button>
      </div>
    </div>
    </>
  );
}
