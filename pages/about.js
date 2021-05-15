import React, { useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { GlobalContext } from "../src/contexts/GlobalContext";
import { Fab, makeStyles, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactForm from "../components/AboutPage/ContactForm";
import { useDrag } from "react-use-gesture";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  aboutLoadInDefaultAnimation,
  aboutLoadInStartAnimation,
} from "../animations/loadinAnimations";

const useStyles = makeStyles({
  contactInfo: {
    display: "flex",
    padding: 0,
  },
  contact: {
    width: "50%",
    padding: "20px",
    boxSizing: "border-box",
    "& button": {
      margin: "20px 0",
    },
  },
});

export default function About(props) {
  const { animation, PreviousLocation, setPreviousLocation } = useContext(
    GlobalContext
  );
  const classes = useStyles();
  let aboutRef = useRef(null);

  const router = useRouter();

  // adds swipe to go back to previous page
  const goBack = () => router.back();
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      // getting the swipe direction
      if (Math.abs(vx) > Math.abs(vy)) {
        if (vx > 0.4) goBack();
      }
    }
  });

  useEffect(() => {
    //LoadIn animations
    if (PreviousLocation !== null) {
      aboutLoadInDefaultAnimation(animation.current.about, aboutRef.current);
    } else {
      aboutLoadInStartAnimation(animation.current.about, aboutRef.current);
    }
    const setLocation = setTimeout(() => setPreviousLocation("about"), 500);
    return () => {
      clearTimeout(setLocation);

      animation.current.about.clear();
    };
  }, []);

  return (
    <div
      {...bind()}
      ref={aboutRef}
      style={{ minHeight: "100vh", backgroundColor: "#191c1d" }}
    >
      <div
        className="top"
        style={{
          zIndex: "400",
          justifyContent: "space-between",
          width: "90%",
          margin: "7px auto 0",
        }}
      >
        {PreviousLocation !== null ? (
          <Tooltip title="Go back">
            <Fab
              onClick={goBack}
              size="small"
              style={{
                position: "relative",
                color: "white",
                backgroundColor: "black",
              }}
            >
              <ArrowBackIcon />
            </Fab>
          </Tooltip>
        ) : (
          <div />
        )}

        <Link href="/">
          <Tooltip title="Home">
            <a
              style={{
                color: "white",
                pointerEvents: "all",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Home
            </a>
          </Tooltip>
        </Link>
      </div>

      <div className="about">
        <div>
          <div className="textContainer" style={{ marginTop: "20px" }}>
            <header id="flexHeader">
              <h2>Hey, I'm Matthew</h2>

              <div
                style={{
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="LinkedIn profile">
                  <a
                    href="https://www.linkedin.com/in/matthew-pudney/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Fab size="small">
                      <LinkedInIcon />
                    </Fab>
                  </a>
                </Tooltip>
                <Tooltip title="Github profile">
                  <a
                    href="https://github.com/Pudderz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Fab size="small">
                      <GitHubIcon />
                    </Fab>
                  </a>
                </Tooltip>
              </div>
            </header>

            <p style={{ textAlign: "center" }}>
              I'm a front-end web developer based in the UK, looking for a
              full-time role.
            </p>
          </div>
          <div className="textContainer" style={{ margin: "0 auto" }}>
            <div>
              <h2>About Me</h2>
              <hr />
              <div></div>
              <p>
                I love learning the massive scope of computer science which I
                find incredibly rewarding and exciting as there's always
                something more you can learn and improve on.
              </p>
              <div style={{ padding: "10px" }}></div>
              <p>
                I'm currently looking for an opportunity to work on a JavaScript
                framework and hope to learn and move to a full-stack position in
                the future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <div
          className={`textContainer ${classes.contactInfo}`}
          id="contactInfo"
          style={{ margin: "0 auto" }}
        >
          <div id="contact" className={classes.contact}>
            <h2>Get in touch</h2>

            <hr />
            <p>
              Thank you for checking out my portfolio and if you'd like to learn
              more about what makes me tick or if you have knowledge of any
              exciting opportunities feel free to reach out.
            </p>
            <p>To get in touch, contact via my email: mpudney2@gmail.com</p>
            <p>Or by this contact form:</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
