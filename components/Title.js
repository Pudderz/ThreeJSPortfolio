import Link from "next/link";
import React, { useEffect, useRef, useContext } from "react";
import Buttons from "./Buttons";
import { Button, colors, duration, Fab, Tooltip } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { TweenMax } from "gsap/dist/gsap";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../src/contexts/GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "fit-content",
    display: "inline-block",
    marginLeft: 0,
  },
  navigation: {
    backgroundColor: (props) => props.backgroundColor,
    color: (props) => props.color,
    backdropFilter: "blur(1em) opacity(60%)",
    position: "fixed",
    width: "100%",
    margin: "0",
    padding: "8px 20px",
    boxSizing: "border-box",
    zIndex: 2,
  },
}));

export default function Title(props) {
  
  const { colours } = useContext(GlobalContext);
  const classes = useStyles({
    backgroundColor: colours.secondaryColour,
    color: colours.primaryColour,
  });

  const arrow = useRef();
  const aboutSideBarRef = useRef();
  const animation = useRef(null);
  const sidebarAnimation = useRef(null);
  useEffect(() => {
    if (arrow.current !== null) {
      animation.current = TweenMax.fromTo(
        arrow.current,
        {
          rotationZ: "0deg",
        },
        {
          rotationZ: "-45deg",
          duration: 0.3,
          paused: true,
        }
      );

      sidebarAnimation.current = TweenMax.fromTo(
        aboutSideBarRef.current,
        {
          width: "0px",
        },
        {
          duration: 0.3,
          paused: true,
          width: "15px",
        }
      );
    }
    return () => {
      if (arrow.current !== null) {
        animation.current.kill();
      }
    };
  }, []);
  const pointerOver = (e) => {
    //  arrow.current.style.transform= "rotateZ(-45deg)"
    animation.current.play();
  };
  const pointerLeave = (e) => {
    //  arrow.current.style.transform= "rotateZ(0deg)"
    animation.current.reverse();
  };

  const hoverAbout = () => {
    sidebarAnimation.current.play();
  };
  const leaveAbout = () => {
    sidebarAnimation.current.reverse();
  };

  // if (props.path !== "/" && props.path !== "/about") {
  return (
    <>
      <nav
        className={`top project ${classes.navigation}`}
        style={{ backgroundColor: props.secondaryColour }}
      >
        <Link href="/">
          <Tooltip title="Home page">
            <a style={{ color: props.primaryColour }}> Matthew Pudney</a>
          </Tooltip>
        </Link>
        <Link href="/about">
          <Tooltip title="About page">
            <a
              onPointerEnter={hoverAbout}
              onPointerLeave={leaveAbout}
              style={{ color: props.primaryColour }}
            >
              About
            </a>
          </Tooltip>
        </Link>
      </nav>
      <div
        ref={aboutSideBarRef}
        style={{
          height: "100vh",
          width: "0px",
          backgroundColor: "rgb(25, 28, 29)",
          position: "fixed",
          right: "0",
          zIndex: "3",
        }}
      />
      <Link href="/">
        <Tooltip title="Go Home">
          <Fab
            ref={arrow}
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              zIndex: "3",
            }}
            onPointerEnter={pointerOver}
            onPointerLeave={pointerLeave}
          >
            <ArrowForwardIcon />
          </Fab>
        </Tooltip>
      </Link>
    </>
  );
  // } else {
  //   return <div className="top"></div>;
  // }
}
