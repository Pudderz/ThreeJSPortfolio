import { makeStyles, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../src/contexts/GlobalContext";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: '0%',
    margin: 'auto',
    zIndex: '100',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '35px',
    listStyle: 'none',
    gap: '3em',
    justifyContent: 'center',
    width: '100%',

  },
  marker:{
    backgroundColor: 'white',
      borderRadius: '4px',
      width: '16px',
      minWidth: '8px',
      height: '10px',
      margin: '20px',
      position: 'absolute',
      cursor: 'pointer',
  },
  items:{
  display: 'flex',
  justifyContent: "center",
  height: '50px',
  }
  
})



export default function SmallListVersion(props) {
  const classes= useStyles(props);
  const goToNumber = useRef(props.number);
  const {setPreviousLocation} = useContext(GlobalContext)
  const select = (number) => {
    goToNumber.current = number;
    props.goTo(goToNumber.current);
  };


  //Changes previous location but delays it in order for the change to not
  // effect animations
  useEffect(()=>{
    const setLocation = setTimeout(()=>setPreviousLocation("home"),500)
    return ()=>{
      clearTimeout(setLocation)
    }
  })
  return (
    <div className={classes.root}>
      {props.data.map((info, index) => (
        <div
          key={index}
          onClick={() => select(index)}
          className={classes.items}
          style={{
            opacity: index === props.displayNumber ? "1" : "0.4",
            
          }}
        >
          <Tooltip title={info.title}>
            <div
              className={classes.marker}
              style={{
                background:
                  index === props.displayNumber
                    ? info.primaryColour
                    : props.data[props.number].whiteOrBlackText === "White"
                    ? "white"
                    : "black",
              }}
            ></div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
