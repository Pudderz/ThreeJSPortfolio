import { TweenMax } from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "../src/contexts/HomeContext";

import { useDrag } from "react-use-gesture";

import { useRouter } from "next/router";
import SmallListVersion from "./smallListVersion";
import Background from "./Background";

import Link from "next/link";
import SmallText from "./smallText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, Tooltip } from "@material-ui/core";

export default function SmallFrontPage({ data }) {
  // const { information } = useContext(HomeContext);
  const history = useRouter();

  const V_THRESHOLD = 0.1;

  const boxRefs = useRef([]);

  const firstTime = useRef(0);

  const [xPos, setXPos] = useState(0);
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      // getting the swipe direction
      if (Math.abs(vx) > Math.abs(vy)) {
        // swipe left is when horizontal velocity is inferior to minus threshold
        if (vx < -V_THRESHOLD && xPos > -1) next();
        // swipe right is when horizontal velocity is superior to threshold
        else if (vx > V_THRESHOLD && xPos < 1) prev();
      }
    }
  });

  // creates a array of refs
  const addToRefs = (el) => {
    if (el && !boxRefs.current.includes(el)) {
      boxRefs.current.push(el);
    }
  };

  const x = useRef(0);
  const carousel = useRef();
  const slider = useRef();
  const direction = useRef(-1);
  const distance = useRef(100 / data.length);
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
  }, []);

  const next = (number = 1) => {
    if (direction.current > 0) {
      slider.current.prepend(slider.current.lastElementChild);
    }
    direction.current = -1 * number;
    carousel.current.style.justifyContent = "flex-start";
    slider.current.style.transform = `translate(${
      -distance.current * number
    }%)`;
  };
  const prev = (number = 1) => {
    if (direction.current < 0) {
      slider.current.appendChild(slider.current.firstElementChild);
    }
    direction.current = number;
    carousel.current.style.justifyContent = "flex-end";
    slider.current.style.transform = `translate(${distance.current * number}%)`;
  };
  const transitionEnd = (e) => {
    if (firstTime.current !== 0) {
      if (direction.current > 0) {
        for (let i = direction.current; i > 0; i--) {
          slider.current.prepend(slider.current.lastElementChild);
        }
      } else {
        for (let i = direction.current; i < 0; i++) {
          slider.current.appendChild(slider.current.firstElementChild);
        }
      }

      slider.current.style.transition = "none";
      slider.current.style.transform = "translate(0)";
      setTimeout(() => {
        slider.current.style.transition = "all 0.5s";
      });
    } else {
      firstTime.current=1;
    }
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

  

  useEffect(() => {
    if (attractTo.shouldJump) {
      let numberOfChange = attractTo.goTo - (displayNumber % data.length);
      console.log(numberOfChange)


      //If distance travelling is greater than data.length/2 then goes the opposite direction
      if(numberOfChange> data.length/2){
        numberOfChange =  numberOfChange - data.length;
      }else if(numberOfChange< -(data.length/2)){
        numberOfChange =  data.length+ numberOfChange;
      }

      if (numberOfChange < 0) {
        prev(numberOfChange * -1);
      } else if (numberOfChange > 0) {
        next(numberOfChange);
      }
      setAttractTo({ ...attractTo, shouldJump: false });
    }
  }, [attractTo]);

const goTo = (number) => {
    setAttractTo({
      goTo: number,
      shouldJump: true,
    });
  };


  const changeAttractMode = (boolean) => {
    setAttractMode(boolean);
    if (boolean) {
    } else {
      setAttractTo({
        ...attractTo,
        shouldJump: false,
      });
    }
  };

  
  const stopBubbling = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  };
  return (
    <>
      <Background
        information={data}
        attractMode={false}
        number={displayNumber}
      />

      <div {...bind()} ref={body}>
        <div className="top" style={{ zIndex: "100" }}>
          <Link style={{ color: "white" }} href="/">
            <Tooltip title="Home">
              <a style={{ color: data[displayNumber].primaryColour }}>
                Matthew Pudney
              </a>
            </Tooltip>
          </Link>

          <Link href="/about">
            <Tooltip title="About">
              <a style={{ color: data[displayNumber].primaryColour }}>About</a>
            </Tooltip>
          </Link>
        </div>
        <SmallListVersion
          attractMode={changeAttractMode}
          goTo={goTo}
          number={displayNumber}
          displayNumber={displayNumber}
          data={data}
          className="vertical"
        />
        <div className="carousel" ref={carousel}>
          <div className="slider" ref={slider} onTransitionEnd={transitionEnd}>
            {data.map((info, index) => (
              <section key={index} data-key={index} ref={addToRefs}>
                <img src={info.mainImage.url} width="80%" />
                <SmallText
                  data={data}
                  number={index}
                  attractMode={false}
                  linkTo={linkTo}
                />
              </section>
            ))}
          </div>
        </div>
        <div className="controls">
          <Tooltip title="Next project">
            <Button
              className="next"
              onClick={(e) => next(1)}
              style={{ color: data[displayNumber].primaryColour }}
            >
              <ArrowForwardIcon
                style={{ fill: data[displayNumber].primaryColour }}
              />
            </Button>
          </Tooltip>

          <Tooltip  title="Previous project">
            <Button
              className="prev"
              onClick={(e) => prev(1)}
              style={{ color: data[displayNumber].primaryColour }}
            >
              <ArrowBackIcon
                style={{ fill: data[displayNumber].primaryColour }}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
