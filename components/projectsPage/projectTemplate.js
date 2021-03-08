import React, { useContext} from "react";
import {Power3 } from "gsap";
import { useRef, useEffect } from "react";
import { GlobalContext } from "../../src/contexts/GlobalContext";
import hydrate from "next-mdx-remote/hydrate";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  flex:{
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]:{
      display:'block',
      '& .flexSmall': {
        display: 'flex',
      }
    }
  },
  markdownContent: {
    margin: '50px auto 0 auto',
    width: '100%',
    maxWidth: '1200px',
    fontSize: '20px',
    lineHeight: '1.6em',
    boxSizing: 'border-box',
    padding: '20px',
      '& *': {
        padding: '0px',
        color: '#191c1d',
        maxWidth: '100%',
        fontSize: 'inherit',
        margin: 'initial',
      },
      [theme.breakpoints.down('sm')]:{
        fontSize:'16px',
      }
  },
  information: {
    width: '100%',
    zIndex: 1,
    position:'absolute'
  },
  block:{
    display:'block'
  }

}))
export default function ProjectTemplate(props) {
  const classes= useStyles();
  const { PreviousLocation, setPreviousLocation, animation } = useContext(
    GlobalContext
  );

  const information = useRef(null);

  // Markdown data
  const aboutProject = hydrate(props.aboutProject);
  const content = hydrate(props.content);

  useEffect(() => {
    //Loadin animation
    if (PreviousLocation !== "project" && PreviousLocation !== null) {
      animation.current.project.fromTo(
        information.current,
        {
          left: "-100%",
        },
        {
          duration: 1,
          left: "0%",
          ease: Power3.easeInOut,
        }
      );
    } else {
      animation.current.project.fromTo(
        information.current,
        {
          opacity: 0,
        },
        {
          duration: 1,
          opacity: 1,
          ease: Power3.easeInOut,
        }
      );
    }

    const setLocation = setTimeout(() => setPreviousLocation("project"), 500);

    return () => {
      clearTimeout(setLocation);
      animation.current.project.clear();
    };
  }, []);

  return (
    <>
      <div
        className="information"
        ref={information}
        style={{ background: "white" }}
      >
        <div className={`textContainer ${classes.flex}`}
        style={{margin:'0 auto'}}
        >
          <div style={{ padding: "20px" }}>
            <h3 className="large">{props.title}</h3>
          </div>
        </div>
        <div className={`textContainer ${classes.flex}`} style={{ marginTop: "0" }}>
          <div  style={{ padding: "20px" }}>
            <h4>About The Project</h4>
            <div style={{ padding: "0" }}>{aboutProject}</div>
          </div>

          <div
            className="flexSmall smallFlex"
            style={{ padding: "20px" }}
          >
            <div style={{ paddingLeft: "0" }}>
              <h4>What's used in this project:</h4>
              <ul>
                {props.techUsed.map((tech, index) => (
                  <li key={index}>
                    <p>{tech}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{padding:'0 20px'}}>
              <h4>Date:</h4>
              <time>{props.date.match(/^[\d-]{10}/i)[0]}</time>
            </div>
          </div>
        </div>
        <div
          className="textContainer"
          style={{ display: "block", marginTop: "0" }}
        >
          <div>
            <a className={classes.block} href={props.liveDemo}>
              Live Demo
            </a>
            <a className={classes.block} href={props.sourceLink}>
              Learn more at Github repo
            </a>
          </div>
        </div>
          <div className={classes.markdownContent}>{content}</div>
      </div>
    </>
  );
}
