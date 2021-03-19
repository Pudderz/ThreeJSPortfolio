import { makeStyles } from "@material-ui/core";
import React, {useContext} from "react";
import HomeContext from "../../../src/contexts/HomeContext";


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
  const { projectInViewNumber } = useContext(HomeContext);


  const select = () => {
    props.select(props.number);
  };
  return (
    <div
      onPointerOver={select}
      className={classes.flexItems}
      style={{
        opacity: props.number === projectInViewNumber? "1" : "0.4",
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
            props.number === projectInViewNumber
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
