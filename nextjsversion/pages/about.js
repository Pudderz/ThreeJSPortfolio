import React, { useEffect, useContext, useRef } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { GlobalContext } from "../src/contexts/GlobalContext";
import { Power4 } from "gsap/dist/gsap";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
export default function About(props) {
  const {
    PreviousLocation,
    previousPageColour,
    setPreviousColour,
    setPreviousLocation,
    animation,
  } = useContext(GlobalContext);
  let aboutRef = useRef(null);
  let loaderRef = useRef(null);

  useEffect(() => {
    console.log(previousPageColour);
    animation.current.about.fromTo(
      aboutRef.current,
      {
        autoAlpha: 0,

        width: "100%",
        right: "-100vw",
        fontSize: "12px",
      },
      {
        duration: 1,
        width: "100%",
        right: "0",
        fontSize: "16px",
        autoAlpha: 1,
        ease: Power4.easeInOut,
      }
    );

    return () => {
      animation.current.about.clear();
    };
  }, []);

  return (
    <div>
      <div>
        <div
          className="top"
          style={{ zIndex: "100", justifyContent: "flex-end" }}
        >
          <Link href="/">
            <Tooltip title="Home">
              <a style={{ color: "white" }}>Home</a>
            </Tooltip>
          </Link>
        </div>

        <div
          className="about"
          ref={aboutRef}
          // style={{position:'absolute'}}
        >
          <div>
            <div className="textContainer">
              <div
                style={{
                  display: "flex",
                  gap: "1em",
                  justifyContent: "center",
                  padding: "0",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "3em" }}>Hey, I'm Matthew</h2>
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

              <p>
                I'm a front-end web developer based in UK and looking for a
                full-time role
              </p>
            </div>
            <div className="textContainer">
              <h2>...</h2>

              <p>
                I love learning the massive scope of computer science which I
                find incredibly rewarding and exciting as there's always
                something more you can learn and improve on.
              </p>

              <p>
                I'm currently looking for an opportunity to work on a JavaScript
                framework and hope to learn and move to a full-stack position in
                the future.
              </p>

              <p>
                Thank you for checking out my portfolio and if you'd like to
                learn more about what makes me tick or if you have knowledge of
                any exciting opportunities feel free to let me know by visiting
                the contact section
              </p>
            </div>
          </div>
        </div>

        <div className="about">
          <div class="textContainer">
            <div id="contact">
              <h2 class="red-text text-lighten-3">Get in touch</h2>

              <hr />

              <p>
                If you're looking for a passionate developer with interest on
                learning new ways and techniques to be better with the code or
                you'd like to chat about something feel free to reach out.
              </p>

              <p>
                To get in touch, feel free to contact me about anything via my
                email: mpudney2@gmail.com{" "}
              </p>
              <p>Or with this contact form:</p>
              <form name="contact" method="POST" data-netlify="true">
                <label>
                  Your Name:{" "}
                  <input type="text" name="name" placeholder="Name" />
                </label>
                <label>
                  Your Email:{" "}
                  <input
                    type="email"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </label>
                <label>
                  Message:{" "}
                  <textarea
                    id="message"
                    name="message"
                    style={{ resize: "vertical" }}
                    placeholder="Message"
                  ></textarea>
                </label>

                <button class="btn large red" id="submitForm" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/frontPage">
          <Button variant="contained" color="primary" >
            Go to the main page
          </Button>
        </Link>

      </Box>
    </Container> */}
      </div>
    </div>
  );
}
