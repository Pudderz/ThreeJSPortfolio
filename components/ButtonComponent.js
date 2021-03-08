import { Button } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    transition: "0.8s all",
    "&:hover, &$focusVisible": {
      zIndex: 1,
    },
  },
  focusVisible: {},
  //600 ideal
  buttonParent: {
    [theme.breakpoints.down("sm")]: {
      "& button": {
        height: "fit-content !important",
        width: "fit-content !important",
      },
    },
  },
}));

export function ButtonComponent(props) {
  const classes = useStyles();
  const [colour, setColour] = useState({
    primaryColour: props.primaryColour,
    secondaryColour: props.secondaryColour,
  });
  const isHovering = useRef(false);
  const PointerOver = () => {
    isHovering.current = true;
    setColour({
      primaryColour: props.secondaryColour,
      secondaryColour: props.primaryColour,
    });
  };
  const PointerLeave = () => {
    isHovering.current = false;
    setColour({
      primaryColour: props.primaryColour,
      secondaryColour: props.secondaryColour,
    });
  };
  useEffect(() => {
    if (isHovering.current) {
      setColour({
        primaryColour: props.secondaryColour,
        secondaryColour: props.primaryColour,
      });
    } else {
      setColour({
        primaryColour: props.primaryColour,
        secondaryColour: props.secondaryColour,
      });
    }
  }, [props.primaryColour, props.secondaryColour]);
  return (
    <div className={classes.buttonParent}>
      {props.link === true ? (
        <Link href={props.href}>
          <Button
            onTransitionEnd={(e) => e.stopPropagation()}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              backgroundColor: colour.secondaryColour,
              color: colour.primaryColour,
            }}
            onPointerEnter={PointerOver}
            onPointerOut={PointerLeave}
          >
            {props.children}
          </Button>
        </Link>
      ) : (
        <Button
          onTransitionEnd={(e) => e.stopPropagation()}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            backgroundColor: colour.secondaryColour,
            color: colour.primaryColour,
          }}
          onPointerEnter={PointerOver}
          onPointerLeave={PointerLeave}
        >
          {props.children}
        </Button>
      )}
    </div>
  );
}

export default ButtonComponent;
