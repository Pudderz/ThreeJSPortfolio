import { makeStyles } from "@material-ui/core";
import React from "react";


const useStyles = makeStyles({
  flexItems: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '50px',
  },
  visHide: {
    visibility: 'hidden',
    color: 'white',
    margin: '20px 50px 20px 0px',
    marginRight: '50px',
    fontSize: '12px',
    width: '50px',
    display:'none',
    width:'fit-content',

    '& p':{
      margin: '0',
    }
  }
})
export default function ListItem(props) {
  const classes = useStyles();
  const select = () => {
    props.select(props.number);
  };
  return (
    <div
      onPointerOver={select}
      className={classes.flexItems}
      style={{
        opacity: props.number === props.display ? "1" : "0.4",
        flex: "0 0 auto",
      }}
    >
      <div
        ref={props.addToDescriptRefs}
        className={classes.visHide}
      >
        <p style={{ whiteSpace: "nowrap" }}>{props.name}</p>
      </div>
      <div
        className="marker"
        ref={props.addToMarkerRefs}
        style={{
          background:
            props.number === props.display
              ? props.color
              : props.whiteOrBlack === "White" || props.attractMode
              ? "white"
              : "black",
          position: "absolute",
        }}
      ></div>
    </div>
  );
}
