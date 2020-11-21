import React, { useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { GlobalContext } from "../src/contexts/GlobalContext";
import { Power4 } from "gsap/dist/gsap";
import { Fab, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactForm from "../components/form";

export default function About(props) {
  const { previousPageColour, animation, PreviousLocation } = useContext(GlobalContext);
  let aboutRef = useRef(null);

  useEffect(() => {
    //LoadIn animations
    if(PreviousLocation!== null && PreviousLocation!=='about'){
      animation.current.about.fromTo(
        aboutRef.current,
        {
          position: "absolute",
          autoAlpha: 0,
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
    }else{
      animation.current.about.fromTo(
        aboutRef.current,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          onComplete() {
            console.log("ran");
          },
        }
      );
    }
    

    return () => {
      animation.current.about.pause();
      animation.current.about.clear();
    };

  }, []);

  return (
    <div>
      <div ref={aboutRef}
      style={{    minHeight: '100vh',
        backgroundColor: '#191c1d'}}>
        <div
          className="top"
          style={{ zIndex: "400", justifyContent: "flex-end" }}
        >
          <Link href="/">
            <Tooltip title="Home">
              <a style={{ color: "white",pointerEvents:'all', cursor: 'pointer' }}>Home</a>
            </Tooltip>
          </Link>
        </div>

        <div
          className="about"
        >
          <div>
            <div className="textContainer" style={{marginTop:'20px'}}>
              <header
                id="flexHeader"
              >
                <h2>
                  Hey, I'm Matthew
                </h2>

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
            <div className="textContainer">
              <div>
                <h2>About Me</h2>
                <hr />
                <div></div>
                <p>
                  I love learning the massive scope of computer science which I
                  find incredibly rewarding and exciting as there's always
                  something more you can learn and improve on.
                </p>
                <div style={{padding:'10px'}}></div>
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
          
          <div className="textContainer" id="contactInfo" >
            <div id="contact">
              <h2>Get in touch</h2>

              <hr />
              <p>
              Thank you for checking out my portfolio and if you'd like to
                  learn more about what makes me tick or if you have knowledge
                  of any exciting opportunities feel free to reach out.
              </p>
              <div style={{padding:'10px'}}></div>
              <p>
                To get in touch, contact via my
                email: mpudney2@gmail.com
              </p>
              <div style={{padding:'10px'}}></div>
              <p>Or by this contact form:</p>

              <div style={{padding:'20px'}}></div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
