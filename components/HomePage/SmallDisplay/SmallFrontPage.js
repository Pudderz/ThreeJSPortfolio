import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
import SmallListVersion from "./SmallListVersion";
import Background from "../Background";
import Link from "next/link";
import SmallText from "./SmallText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, makeStyles, Tooltip } from "@material-ui/core";
import Image from 'next/image'; 


const useStyle = makeStyles({
  carousel: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "flex-start",
    overflowX: "hidden",
    margin: "auto",
    position: "relative",
  },
  section: {
    fontSize: "20px",
    width: "100vw",
    position: "relative",
    textAlign: "center",
    "& .details": {
      position: "relative !important",
      top: "auto !important",
      left: "auto !important",
      width: "50%",
      pointerEvents: "none",
      "& a": {
        pointerEvents: "all",
        cursor: "pointer",
      },
    },
  },

  controls: {
    position: "absolute",
    top: "10px",
    border: "none",
    cursor: "pointer",
    outline: "none",
    "& span svg": {
      position: "inherit",
    },
    "& button i": {
      fontSize: "50px",
    },
  },

  next: {
    right: "20px",
  },
  prev: {
    left: "20px",
  },
  div: {
    margin: "50px auto 0",
    width: "80%",
    "& img":{
      objectFit:'cover'
    }
  },


  slider:{
    display: 'flex',
    height: '100%',
    width: 'fit-content',
    flexShrink: '0',
    transition: 'all 0.5s linear',
    willChange: 'transform',
    '-webkit-transition': 'all 0.5s linear',
    '-moz-transition': 'all 0.5s linear',
    '-ms-transition': 'all 0.5s linear',
    '-o-transition': 'all 0.5s linear',
    '& section img':{
      margin: '50px auto auto auto',
      cursor: 'grab',
    }
  },
});

export default function SmallFrontPage({ data }) {
  const classes = useStyle();

  const V_THRESHOLD = 0.1;
  const boxRefs = useRef([]);
  const firstTime = useRef(0);
  const carousel = useRef();
  const slider = useRef();
  const direction = useRef(-1);
  const distanceTravelled = useRef(0);
  const distance = useRef(100 / data.length);
  const [displayNumber, setDisplayNumber] = useState(0);
  const body = useRef();

  // Uses React use gesture to make the transitions swipeable
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      if (Math.abs(vx) > Math.abs(vy)) {
        if (vx < -V_THRESHOLD) next(1);
        else if (vx > V_THRESHOLD) prev(1);
      }
    }
  });

  // Creates a array of refs
  const addToRefs = (el) => {
    if (el && !boxRefs.current.includes(el)) {
      boxRefs.current.push(el);
    }
  };

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
          // x.current = boxRefs.current[0].offsetLeft - entry.target.offsetLeft;
          setDisplayNumber(Number(entry.target.getAttribute("data-key")));
        }
      });
    }, options);

    for (const [key, value] of Object.entries(slider.current.children)) {
      observer.observe(value);
    }
  }, []);

  //

  const next = (number = 1) => {
    if (firstTime.current === 0) firstTime.current = 1;
    if (direction.current > 0) {
      slider.current.prepend(slider.current.lastElementChild);
    }
    direction.current = -1 * number;
    distanceTravelled.current += -1 * number;
    carousel.current.style.justifyContent = "flex-start";
    slider.current.style.transform = `translate(${
      distance.current * distanceTravelled.current
    }%)`;
  };

  //

  const prev = (number = 1) => {
    if (firstTime.current === 0) firstTime.current = 1;
    if (direction.current < 0) {
      slider.current.appendChild(slider.current.firstElementChild);
    }
    direction.current = number;
    distanceTravelled.current += number;
    carousel.current.style.justifyContent = "flex-end";
    slider.current.style.transform = `translate(${
      distance.current * distanceTravelled.current
    }%)`;
  };

  // Prepends or appends children while moving the translate back to 0% to
  // mimic a infinite scroll

  const transitionEnd = () => {
    //firstTime.current makes sure the transitionEnd function does not fire
    // on the page transition to the page
    if (firstTime.current !== 0) {

      if (direction.current > 0) {
        for (let i = distanceTravelled.current; i > 0; i--) {
          slider.current.prepend(slider.current.lastElementChild);
        }
      } else {
        for (let i = distanceTravelled.current; i < 0; i++) {
          slider.current.appendChild(slider.current.firstElementChild);
        }
      }
      distanceTravelled.current = 0;
      slider.current.style.transition = "none";
      slider.current.style.transform = "translate(0)";
      setTimeout(() => {
        slider.current.style.transition = "all 0.5s";
      });
    }
  };



  const [attractTo, setAttractTo] = useState({ goTo: 0, shouldJump: false });

  useEffect(() => {
    if (attractTo.shouldJump) {
      let numberOfChange = attractTo.goTo - (displayNumber % data.length);

      //If distance travelling is greater than data.length/2 then
      // change to the opposite direction.
      if (numberOfChange > data.length / 2) {
        numberOfChange = numberOfChange - data.length;
      } else if (numberOfChange < -data.length / 2) {
        numberOfChange = data.length + numberOfChange;
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

  return (
    <>
      <Background
        information={data}
        attractMode={false}
        number={displayNumber}
        loadIn={false}
      />

      <div {...bind()} ref={body}>
        {/* Nav */}
        <nav className="top" style={{ zIndex: "100" }}>
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
        </nav>
        <SmallListVersion
          goTo={goTo}
          number={displayNumber}
          displayNumber={displayNumber}
          data={data}
          className="vertical"
        />
        <div className={classes.carousel} ref={carousel}>
          <div className={classes.slider} ref={slider} onTransitionEnd={transitionEnd}>
            {data.map((info, index) => {
            
              return (
                <section
                  className={classes.section}
                  key={info.mainImage.title}
                  data-key={index}
                  ref={addToRefs}
                >
                  <div className={classes.div}>
                    <Image
                      width={640}
                      height={323}
                      loading="lazy"
                      //  height="100%"
                      alt={info.mainImage.title}
                      
                      src={info.mainImage.url}
                    />
                  </div>

                  <SmallText data={data} number={index} linkTo={() => {}} />
                </section>
              );
            })}
          </div>
        </div>
        <div
        // className="controls"
        >
          <Tooltip title="Next project">
            <Button
              className={`${classes.controls} ${classes.next}`}
              onClick={(e) => next(1)}
              style={{ color: data[displayNumber].primaryColour }}
            >
              <ArrowForwardIcon
                style={{ fill: data[displayNumber].primaryColour }}
              />
            </Button>
          </Tooltip>

          <Tooltip title="Previous project">
            <Button
              className={`${classes.controls} ${classes.prev}`}
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
