import React, { useEffect, useContext, useRef, useState } from "react";
import Link from "next/link";
import { GlobalContext } from "../src/contexts/GlobalContext";
import { Power4 } from "gsap/dist/gsap";
import { Fab, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactForm from "../components/form";
import { useDrag } from "react-use-gesture";
import { useRouter } from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function About(props) {
  const {
    previousPageColour,
    animation,
    PreviousLocation,
    setPreviousLocation,
  } = useContext(GlobalContext);
  let aboutRef = useRef(null);

  const history = useRouter();

  const boxRefs = useRef([]);

  const firstTime = useRef(0);

  const goBack = () => {
    console.log("go back");
    history.back();
  };

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
    if (PreviousLocation !== null && PreviousLocation !== "about") {
      animation.current.about.fromTo(
        aboutRef.current,
        {
          position: "absolute",
          autoAlpha: 1,
          zIndex: 200,
          width: "100%",
          right: "-100vw",
          fontSize: "12px",
        },
        {
          position: "absolute",
          duration: 1,
          zIndex: 200,
          width: "100%",
          right: "0",
          fontSize: "16px",
          autoAlpha: 1,
          ease: Power4.easeInOut,
          onComplete() {
            console.log("ran");
          },
        }
      );
    } else {
      animation.current.about.fromTo(
        aboutRef.current,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
        }
      );
    }
    const setLocation = setTimeout(() => setPreviousLocation("about"), 500);
    return () => {
      animation.current.about.clear();
      clearTimeout(setLocation);
    };
  }, []);

  return (
    <div>
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
                I'm a front-end web developer based in UK, looking for a
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
                  I'm currently looking for an opportunity to work on a
                  JavaScript framework and hope to learn and move to a
                  full-stack position in the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about">
          <div
            className="textContainer"
            id="contactInfo"
            style={{ margin: "0 auto" }}
          >
            <div id="contact">
              <h2>Get in touch</h2>

              <hr />
              <p>
                Thank you for checking out my portfolio and if you'd like to
                learn more about what makes me tick or if you have knowledge of
                any exciting opportunities feel free to reach out.
              </p>
              <p>To get in touch, contact via my email: mpudney2@gmail.com</p>
              <p>Or by this contact form:</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
